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
import estVacances from "./vacances";
import { getListeDates } from "../Occupation/occupationMethods";
import NouvelleOccupation from "../Occupation/NouvelleOccupation";

export default function Calendrier(props) {
  const { logeBooking, setLogeBooking, changeHandler, append, remove } = props;
  const [lignes, setLignes] = React.useState([]);
  const [mousePos, setMousePos] = React.useState({
    mouseX: null,
    mouseY: null
  });
  const [activeMenu, setActiveMenu] = React.useState(false);
  const [contextData, setContextData] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDescrClose = () => {
    setActiveMenu(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAjout = () => {
    setOpen(true);
  };

  function handleDescrClick(event, myDate) {
    event.preventDefault();
    setMousePos({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
    setActiveMenu(true);
    setContextData({ date: myDate });
  }

  function colonnes(index) {
    const result = [];

    const dateslogeBooking = [];
    logeBooking.map(item => dateslogeBooking.push(getListeDates(item)));

    function classDescription(jour) {
      return jour.isValid()
        ? estFerie(jour)
          ? "ferie"
          : jour.day() === 0
          ? "dimanche"
          : "jour"
        : "noDate";
    }

    function txtCelluleOccupation(myDate) {
      return logeBooking.reduce((prev, act, index) => {
        let ajout = dateslogeBooking[index].reduce((bef, now) => {
          return bef || now.date.diff(myDate, "days") === 0;
        }, false)
          ? act.acronyme
          : "";
        let result;
        if (prev !== "" && ajout !== "") {
          result = prev + " / " + ajout;
        } else {
          result = prev + ajout;
        }
        return result;
      }, "");
    }

    for (let i = 0; i < 11; i++) {
      let myDate = moment(
        `${index + 1}/${i < 4 ? i + 9 : i - 3}/${i < 4 ? annee : annee + 1}`,
        "DD/MM/YYYY"
      );
      myDate.locale("fr-FR");
      result.push(
        // Numéro du jour
        <React.Fragment>
          <TableCell
            className={
              myDate.isValid()
                ? estFerie(myDate)
                  ? "ferie"
                  : "numerojour"
                : "noDate"
            }
          >
            {myDate.isValid() && myDate.format("DD")}
          </TableCell>
          {/* Initiale du jour */}
          <TableCell className={classDescription(myDate)}>
            {myDate.isValid() && myDate.format("dd")[0].toUpperCase()}
          </TableCell>

          {/* Occupation du temple */}
          <TableCell
            className={"description " + classDescription(myDate)}
            onContextMenu={event => handleDescrClick(event, myDate)}
          >
            {myDate.isValid() && txtCelluleOccupation(myDate)}
          </TableCell>

          {/* Vacances scolaires */}
          <TableCell
            className={
              myDate.isValid()
                ? estVacances(myDate, zone)
                  ? "vacances"
                  : classDescription(myDate) + " bordvacances"
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
      newLigne = [...newLigne, <TableRow>{colonnes(i)}</TableRow>];

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
              {mois.map((item, index) => (
                <React.Fragment key={item.id}>
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
        open={activeMenu}
        onClose={handleDescrClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mousePos.mouseY !== null && mousePos.mouseX !== null
            ? { top: mousePos.mouseY, left: mousePos.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleAjout}>Ajouter</MenuItem>
        <MenuItem disabled onClick={handleDescrClose}>
          Modifier
        </MenuItem>
        <MenuItem disabled onClick={handleDescrClose}>
          Supprimer
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleClose}
        onRendered={() => setActiveMenu(false)}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <NouvelleOccupation
            logeBooking={logeBooking}
            setLogeBooking={setLogeBooking}
            date={contextData?.date ?? null}
            setClose={handleClose}
            changeHandler={changeHandler}
            append={append}
            remove={remove}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
