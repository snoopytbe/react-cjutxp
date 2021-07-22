import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const couleurAnnee = "#070722ff";
const couleurMois = "#131347ff";
const couleurPolice = "#f8f4ffff";
const couleurDimanche = "#aad5f4";
const couleurNumeroJour = "D1C7CF";
const couleurJourFerie = "#33cc66";
const couleurVacances = "#e60000";
const couleurBord = "#3F3F6E";
const white = "#ffffff";
const black = "#000000";

export const StyleTableCell = (theme) => ({
  root: {
    textAlign: "center",
    border: `1px solid ${white}`,
    padding: "5px",
    color: couleurPolice,

    "&.header": { backgroundColor: couleurAnnee },

    "&.row": {
      backgroundColor: couleurNumeroJour,
      color: black,
      border: `1px solid ${couleurBord}`,
    },

    "&.annee": {
      backgroundColor: couleurAnnee,
      fontSize: "1.5em",
    },
    "&.mois": {
      backgroundColor: couleurMois,
      fontSize: "1.1em",
    },
    "&.numerojour": {
      color: black,
      backgroundColor: couleurNumeroJour,
      borderColor: white,
    },
    "&.notWhiteRightBorder": {
      borderRightColor: couleurNumeroJour,
    },
    "&.notWhiteLeftBorder": {
      borderLeftColor: couleurNumeroJour,
    },
    "&.jour": {
      backgroundColor: white,
      borderColor: "D2D2D2",
      color: black,
    },
    "&.descriptionsallehumide": {
      backgroundColor: white,
      borderColor: "D2D2D2",
      color: black,
      textAlign: "left",
      minWidth: "100px",
    },
    "&.descriptiontemple": {
      backgroundColor: white,
      borderColor: "D2D2D2",
      borderRightColor: white,
      color: black,
      textAlign: "left",
      minWidth: "100px",
    },
    "&.dimanche": {
      backgroundColor: couleurDimanche,
      borderColor: couleurDimanche,
      color: black,
    },
    "&.ferie": {
      backgroundColor: couleurJourFerie,
      borderColor: couleurJourFerie,
      color: black,
    },
    "&.noDate": {
      backgroundColor: white,
    },
    "&.vacances": {
      maxWidth: "1px",
      minWidth: "1px",
      backgroundColor: couleurVacances,
      borderBottomColor: couleurVacances,
      borderTopColor: couleurVacances,
      borderRightColor: couleurNumeroJour,
    },
    "&.bordvacances": {
      borderRightColor: couleurNumeroJour,
    },
  },
});

export default withStyles(StyleTableCell, { name: "MyTableCell" })(TableCell);
