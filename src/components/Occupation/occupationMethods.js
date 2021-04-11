import * as constantes from "../../data/constantes";
import moment from "moment";
import "moment/min/locales.min";
import { nthDay, posDateInList } from "../Calendrier/vacances";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Retourne l'id d'une loge
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getIdLoge = (logeBooking, loge) => {
  return logeBooking?.findIndex(item => item.loge === loge);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Retourne la réservation d'un loge pour une date donnée
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getOccupationLogeDate = (logeBooking, loge, date) => {
  // On recherche les réservations de la loge
  let foundLogeBooking = logeBooking.find(item => item.loge === loge);
  // Les dates de réservation de la loge
  let listeDates = getListeDates(foundLogeBooking);
  // On recherche la position de la date recherchée dans la liste des dates
  let index = posDateInList(date, listeDates.map(item => item.date));
  // Puis on donne la reservation correspondante
  return listeDates[index]?.reservation ?? null;
};

function giveDayNumber(dayToFind) {
  return constantes.jours.find(value => dayToFind === value.nom)?.numero;
}

// Permet de convertir une occupation en un élément de la liste de dates
// utilise une fonction de conversion d'une occupation en date au format moment
function convertDateToElement(occupation, occupationToDate) {
  var element = [];
  var maDate = occupationToDate(occupation.date);
  if (maDate.isValid())
    element.push({
      date: maDate.locale("fr-FR"),
      reservation: occupation
    });
  return element;
}

// Fonction de conversion d'une occupation régulière en date au format moment
function occupationReguliereToDate(occupation, mois) {
  return nthDay(
    moment(new Date(constantes.annee + (mois < 9 ? 1 : 0), mois - 1, 1)),
    giveDayNumber(occupation?.jours),
    occupation?.semaine[0]
  );
}

// Permet d'obtenir la liste de dates des tenues pour un field donné
export function getListeDateFromField(oneLogeBooking, field) {
  var liste = [];
  if (oneLogeBooking?.hasOwnProperty(field)) {
    oneLogeBooking[field].forEach(item => {
      // si item["temple"] est vide on n'ajoute pas la date
      if (item["temple"] || field === "suppression") {
        switch (field) {
          case "regulier":
            constantes.mois.forEach(mois => {
              liste = liste.concat(
                convertDateToElement(item, () =>
                  occupationReguliereToDate(item, mois.numero)
                )
              );
            });
            break;

          case "modification":
          case "exceptionnel":
            liste = convertDateToElement(item, date => moment(date));
            break;

          case "suppression":
          default:
            liste = convertDateToElement(item, date =>
              moment(date, moment.ISO_8601)
            );
        }
      }
    });
  }
  return liste;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Retourne la liste des dates des tenues à partir des données de réservation des loges
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getListeDates = oneLogeBooking => {
  var result = [];

  // On récupère les dates de réservations régulières et exceptionnelles
  result = getListeDateFromField(oneLogeBooking, "regulier").concat(
    getListeDateFromField(oneLogeBooking, "exceptionnel")
  );

  // On supprime les éventuels doublons
  result = result.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    []
  );

  // On liste les dates supprimées
  let dateSupprimees = getListeDateFromField(oneLogeBooking, "suppression");

  // On enlève les dates supprimées
  dateSupprimees.forEach(suppression => {
    // On cherche la position de maDate dans resultWithDelete
    let pos = posDateInList(suppression.date, result.map(item => item.date));
    // On supprime cet élément
    pos >= 0 && result.splice(pos, 1);
  });

  // Tri final
  result = result.sort((a, b) => a.date.valueOf() - b.date.valueOf());

  return result;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Permet d'obtenir un texte de description des réservations à partir des données de réservation des loges
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const texteReservations = oneLogeBooking => {
  var result = "";

  // Texte à afficher pour chaque jour, heure, temple et sallehumide
  // Permet également de générer un index par jour, heure, temple et sallehumide
  function indexGenerator(item) {
    return `${item.jours ?? ""} (${item.heure}, ${item.temple}, ${
      item.sallehumide
    })`;
  }

  if (oneLogeBooking?.hasOwnProperty("regulier")) {
    var resultObject = {};

    // Le texte indiquant les numéros de semaine est généré ici. Les réservations partageant le même index
    // sont factorisées
    oneLogeBooking.regulier.forEach(item => {
      //Si l'item n'est pas vide
      if (item.temple) {
        let before = "";
        if (resultObject[indexGenerator(item)]) {
          before =
            resultObject[indexGenerator(item)].replace(" et", ",") + " et ";
        }
        resultObject[indexGenerator(item)] = before + item.semaine;
      }
    });

    // Texte final de réservation
    Object.keys(resultObject).forEach(key => {
      let before = "";
      if (result !== "") before = result + ", ";
      result = before + resultObject[key] + " " + key;
    });
  }

  function texteModif(field, title) {
    if (oneLogeBooking?.hasOwnProperty(field)) {
      oneLogeBooking[field].forEach((item, index) => {
        if (item.temple) {
          if (index === 0) result += `\n${title} :\n`;
          if (index > 0) result += ", ";
          result +=
            moment(item.date)
              .locale("fr-FR")
              .format("DD/MM/YYYY") + indexGenerator(item);
        }
      });
    }
  }

  texteModif("modification", "Modifications de réservations");
  texteModif("exceptionnel", "Réservations exceptionnelles");
  texteModif("suppression", "Annulations exceptionnelles");

  return result;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cette fonction permet de regarder si le dernier champs est vide
// retourne un booléen
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function isEmptyLastField(
  oneLogeBooking,
  fieldName,
  exception = "",
  nullValue = ""
) {
  var result = false;

  if (oneLogeBooking.hasOwnProperty(fieldName)) {
    // lastField est le dernier champs du tableau
    let fields = oneLogeBooking[fieldName];
    let lastField = fields[fields.length - 1];
    // Le résultat est à true si tous les champs, sauf exception, sont soit égaux à "" soit undefined
    result = true;
    for (let value in lastField) {
      if (value !== exception) {
        result = result && !lastField[value];
      }
    }
  }
  return result;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cette fonction permet d'assurer que le formulaire comporte toujours une dernière entrée vide
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const checkLastField = (
  oneLogeBooking,
  regulierAppend,
  exceptionnelAppend,
  suppressionAppend
) => {
  if (!isEmptyLastField(oneLogeBooking, "regulier"))
    regulierAppend({
      semaine: "",
      jours: "",
      temple: "",
      sallehumide: "",
      heure: ""
    });

  if (!isEmptyLastField(oneLogeBooking, "exceptionnel", "date"))
    exceptionnelAppend({ date: "", temple: "", sallehumide: "", heure: "" });

  if (!isEmptyLastField(oneLogeBooking, "suppression", "", new Date()))
    suppressionAppend({ date: "" });
};
