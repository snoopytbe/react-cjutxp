import React from "react";
import { annee, mois, zone } from "../../data/constantes";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import TableCell from "../../styles/styleTableCell";
import "moment/min/locales.min";
import estFerie from "./jourFeries";
import { estVacances, dateInList } from "./vacances";
import { getListeDates } from "../Occupation/occupationMethods";
import EditOccupation from "../Occupation/EditOccupationWindow";

export default function Calendrier(props) {
  const { logeBooking, setLogeBooking } = props;
  const [lignes, setLignes] = React.useState([]);
  const [mousePos, setMousePos] = React.useState({
    mouseX: null,
    mouseY: null
  });
  const [activeMenu, setActiveMenu] = React.useState({
    general: false,
    add: false,
    del: false,
    modify: false
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
    setTypeEdit("add");
    setOpen(true);
  };

  const handleModify = () => {
    setTypeEdit("modify");
    setOpen(true);
  };

  const handleDelete = () => {
    setTypeEdit("delete");
    setOpen(true);
  };

  const datesLogeBooking = logeBooking.map(item => getListeDates(item));

  function listeLogesUtilisatricesDate(myDate) {
    let result = [];
    // On parcourt l'ensemble des loges
    logeBooking?.forEach(
      (loge, index) =>
        // Si la date actuelle fait partie de la liste des dates d'occupation de la loge on l'ajoute au résultat
        dateInList(myDate, datesLogeBooking[index].map(item => item.date)) &&
        result.push({ acronyme: loge.acronyme, loge: loge.loge })
    );
    return result;
  }

  function handleDescrClick(event, myDate) {
    event.preventDefault();
    setMousePos({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
    setActiveMenu({
      general: true,
      add:
        (logeBooking?.length ?? 0) >
        (listeLogesUtilisatricesDate(myDate).length ?? 0), // on peut ajouter si il y a plus de loges au total que de loges utilisatrices du jour
      modify: listeLogesUtilisatricesDate(myDate).length ?? null >= 0, // on peut modifier s'il y a au moins un loge utilisatrice ce jour
      del: listeLogesUtilisatricesDate(myDate).length ?? null >= 0 // on peut effacer s'il y a au moins un loge utilisatrice ce jour
    });
    setContextData({
      date: myDate,
      logesUtilisatrices: listeLogesUtilisatricesDate(myDate)
    });
  }

  function txtCelluleOccupation(myDate) {
    // On créé le texte à partir de la liste des occupations
    return listeLogesUtilisatricesDate(myDate).reduce((prev, act) => {
      return prev + (prev !== "" ? " / " : "") + act.acronyme;
    }, "");
  }

  function colonnes(index) {
    const result = [];

    function classDescription(jour) {
      return jour.isValid()
        ? estFerie(jour)
          ? "ferie"
          : jour.day() === 0
          ? "dimanche"
          : "jour"
        : "noDate";
    }

    for (let i = 0; i < 11; i++) {
      let myDate = moment(
        `${index + 1}/${i < 4 ? i + 9 : i - 3}/${i < 4 ? annee : annee + 1}`,
        "DD/MM/YYYY"
      );
      myDate.locale("fr-FR");
      let isValidDate = myDate.isValid();
      let className = classDescription(myDate);
      result.push(
        // Numéro du jour
        <React.Fragment key={"colonne" + index + "i" + i}>
          <TableCell className={className}>
            {isValidDate && myDate.format("DD")}
          </TableCell>
          {/* Initiale du jour */}
          <TableCell className={className}>
            {isValidDate && myDate.format("dd")[0].toUpperCase()}
          </TableCell>
          {/* Occupation du temple */}
          <TableCell
            className={"description " + className}
            onContextMenu={event => handleDescrClick(event, myDate)}
          >
            {isValidDate && txtCelluleOccupation(myDate)}
          </TableCell>
          {/* Vacances scolaires */}
          <TableCell
            className={
              isValidDate
                ? estVacances(myDate, zone)
                  ? "vacances"
                  : className + " bordvacances"
                : "noDate"
            }
          />
        </React.Fragment>
      );
    }
    return result;
  }

  React.useEffect(() => {
    let newLigne = [];

    for (let i = 0; i < 31; i++)
      newLigne = [
        ...newLigne,
        <TableRow key={"colonne" + i}>{colonnes(i)}</TableRow>
      ];

    setLignes(newLigne);
  }, [logeBooking]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="annee" colSpan={16}>
                {annee}
              </TableCell>
              <TableCell className="annee" colSpan={28}>
                {annee + 1}
              </TableCell>
            </TableRow>
            <TableRow>
              {mois.map(item => (
                <React.Fragment key={item.nom}>
                  <TableCell className="mois" colSpan={4}>
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
        anchorPosition={
          mousePos.mouseY !== null && mousePos.mouseX !== null
            ? { top: mousePos.mouseY, left: mousePos.mouseX }
            : undefined
        }
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
      <Dialog
        open={open}
        onClose={handleClose}
        onRendered={() => setActiveMenu({ general: false })}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <EditOccupation
            logeBooking={logeBooking}
            setLogeBooking={setLogeBooking}
            date={contextData?.date ?? null}
            logesUtilisatrices={contextData?.logesUtilisatrices ?? null}
            setClose={handleClose}
            typeEdit={typeEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
