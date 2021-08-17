import React from "react";
import { annee, mois, zone, periodesInterdites, temples, salleshumides } from "../../data/constantes";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import TableCell from "../../styles/styleTableCell";
import "moment/min/locales.min";
import { estFerie } from "./jourFeries";
import { estVacances, posDateInList } from "./vacances";
import { getListeReservationWithDate } from "../Occupation/occupationMethods";
import DialogAddOccupation from "../Occupation/DialogAddOccupation";

export default function Calendrier(props) {
  const { logeBooking, setLogeBooking } = props;
  const [lignes, setLignes] = React.useState([]);
  const [mousePos, setMousePos] = React.useState({
    mouseX: null,
    mouseY: null,
  });
  const [activeMenu, setActiveMenu] = React.useState({
    general: false,
    add: false,
    del: false,
    modify: false,
  });
  const [contextData, setContextData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [typeEdit, setTypeEdit] = React.useState(false);

  const handleDescrClose = () => {
    setActiveMenu({ general: false });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setTypeEdit("ajout");
    setOpen(true);
  };

  const handleModify = () => {
    setTypeEdit("modification");
    setOpen(true);
  };

  const handleDelete = () => {
    setTypeEdit("suppression");
    setOpen(true);
  };

  const datesLogeBooking = logeBooking.map((item) => getListeReservationWithDate(item));

  function estSansReservation(myDate) {
    let result = false;
    // Les dimanches sont sans réservation
    if (myDate.day() === 0) return result;
    // On regarde ensuite les périodes interdites
    periodesInterdites.forEach((per) => {
      if (myDate.isSameOrAfter(per.debut) && myDate.isSameOrBefore(per.fin)) result = true;
    });
    return result;
  }

  function listeLogesUtilisatricesDate(myDate) {
    let result = [];
    // On élimine les jours sans réservations
    if (estSansReservation(myDate)) return result;

    // On parcourt l'ensemble des loges
    logeBooking?.forEach((loge, index) => {
      // Si la date actuelle fait partie de la liste des dates d'occupation de la loge on l'ajoute au résultat
      var pos = posDateInList(
        myDate,
        datesLogeBooking[index].map((item) => item.date)
      );
      if (pos >= 0) {
        result.push({
          loge: loge.loge,
          acronyme: loge.acronyme,
          temple: datesLogeBooking[index][pos].reservation.temple,
          sallehumide: datesLogeBooking[index][pos].reservation.sallehumide,
        });
      }
    });
    return result;
  }

  function handleDescrClick(event, myDate) {
    event.preventDefault();
    setMousePos({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
    setActiveMenu({
      general: true,
      add: estSansReservation(myDate) ? false : (logeBooking?.length ?? 0) > (listeLogesUtilisatricesDate(myDate).length ?? 0), // on peut ajouter si il y a plus de loges au total que de loges utilisatrices du jour
      modify: estSansReservation(myDate) ? false : listeLogesUtilisatricesDate(myDate).length ?? null >= 0, // on peut modifier s'il y a au moins un loge utilisatrice ce jour
      del: estSansReservation(myDate) ? false : listeLogesUtilisatricesDate(myDate).length ?? null >= 0, // on peut effacer s'il y a au moins un loge utilisatrice ce jour
    });
    setContextData({
      date: myDate,
      logesUtilisatrices: listeLogesUtilisatricesDate(myDate),
    });
  }

  function txtCelluleOccupationTemple(myDate) {
    // On créé le texte à partir de la liste des occupations
    let result0 = listeLogesUtilisatricesDate(myDate).reduce((prev, act) => {
      return act.temple === temples[0] || act.temple === temples[2] ? prev + (prev !== "" ? ", " : "") + act.acronyme : prev;
    }, "");
    let result = result0 === "" ? "- / " : result0 + " / ";
    let result1 = listeLogesUtilisatricesDate(myDate).reduce((prev, act) => {
      return act.temple === temples[1] || act.temple === temples[2] ? prev + (prev !== "" ? ", " : "") + act.acronyme : prev;
    }, "");
    result = result + (result1 === "" ? "-" : result1);
    result = result === "- / -" ? "" : result;
    return result;
  }

  function txtCelluleOccupationSH(myDate) {
    // On créé le texte à partir de la liste des occupations
    let result0 = listeLogesUtilisatricesDate(myDate).reduce((prev, act) => {
      return act.sallehumide === salleshumides[0] || act.sallehumide === salleshumides[2] ? prev + (prev !== "" ? ", " : "") + act.acronyme : prev;
    }, "");
    let result = result0 === "" ? "- / " : result0 + " / ";
    let result1 = listeLogesUtilisatricesDate(myDate).reduce((prev, act) => {
      return act.sallehumide === salleshumides[1] || act.sallehumide === salleshumides[2] ? prev + (prev !== "" ? ", " : "") + act.acronyme : prev;
    }, "");
    result = result + (result1 === "" ? "-" : result1);
    result = result === "- / -" ? "" : result;
    return result;
  }

  function colonnes(index) {
    const result = [];

    function classDescription(jour) {
      return jour.isValid() ? (estFerie(jour) ? "ferie" : jour.day() === 0 ? "dimanche" : "jour") : "noDate";
    }

    for (let i = 0; i < 11; i++) {
      let myDate = moment([i < 4 ? annee : annee + 1, i < 4 ? i + 8 : i - 4, index + 1]);
      myDate.locale("fr-FR");
      let isValidDate = myDate.isValid();
      let className = classDescription(myDate);
      result.push(
        // Numéro du jour
        <React.Fragment key={"colonne" + index + "i" + i}>
          <TableCell className={className}>{isValidDate && myDate.format("DD")}</TableCell>
          {/* Initiale du jour */}
          <TableCell className={className}>{isValidDate && myDate.format("dd")[0].toUpperCase()}</TableCell>
          {/* Occupation du temple */}
          <TableCell className={"descriptionsallehumide " + className} onContextMenu={(event) => handleDescrClick(event, myDate)}>
            {isValidDate && txtCelluleOccupationSH(myDate)}
          </TableCell>
          <TableCell className={"descriptiontemple " + className} onContextMenu={(event) => handleDescrClick(event, myDate)}>
            {isValidDate && txtCelluleOccupationTemple(myDate)}
          </TableCell>
          {/* Vacances scolaires */}
          <TableCell className={isValidDate ? (estVacances(myDate, zone) ? "vacances" : className + " bordvacances") : "noDate"} />
        </React.Fragment>
      );
    }
    return result;
  }

  React.useEffect(() => {
    let newLigne = [];

    let ligneEntete = [];
    for (let i = 0; i < 11; i++) {
      ligneEntete = [
        ...ligneEntete,
        <>
          <TableCell colspan={2} className="numerojour">
            Jour
          </TableCell>
          <TableCell className="numerojour">SH Cuisine / SH Jardin</TableCell>
          <TableCell className="numerojour notWhiteRightBorder">Ramsay (RDC) / Berteaux (ETG)</TableCell>
          <TableCell className="numerojour notWhiteLeftBorder" />
        </>,
      ];
    }
    newLigne = [<TableRow key={'entete'}>{ligneEntete}</TableRow>];

    for (let i = 0; i < 31; i++) newLigne = [...newLigne, <TableRow key={"colonne" + i}>{colonnes(i)}</TableRow>];

    setLignes(newLigne);
  }, [logeBooking]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="annee" colSpan={20}>
                {annee}
              </TableCell>
              <TableCell className="annee" colSpan={35}>
                {annee + 1}
              </TableCell>
            </TableRow>
            <TableRow>
              {mois.map((item) => (
                <React.Fragment key={item.nom}>
                  <TableCell className="mois" colSpan={5}>
                    {item.nom}
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
            {lignes}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        keepMounted
        open={activeMenu.general}
        onClose={handleDescrClose}
        anchorReference="anchorPosition"
        anchorPosition={mousePos.mouseY !== null && mousePos.mouseX !== null ? { top: mousePos.mouseY, left: mousePos.mouseX } : undefined}
      >
        <MenuItem disabled={!activeMenu.add} onClick={handleAdd}>
          Ajouter
        </MenuItem>
        <MenuItem disabled={!activeMenu.modify} onClick={handleModify}>
          Modifier
        </MenuItem>
        <MenuItem disabled={!activeMenu.del} onClick={handleDelete}>
          Supprimer
        </MenuItem>
      </Menu>
      <DialogAddOccupation
        open={open}
        handleClose={handleClose}
        handleRendered={() => setActiveMenu({ general: false })}
        logeBooking={logeBooking}
        setLogeBooking={setLogeBooking}
        date={contextData?.date ?? null}
        logesUtilisatrices={contextData?.logesUtilisatrices ?? null}
        typeEdit={typeEdit}
      />
    </>
  );
}
