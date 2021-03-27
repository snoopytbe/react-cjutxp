import * as constantes from "../../data/constantes";
import moment from "moment";
import "moment/min/locales.min";
import { nthDay, posDateInList } from "../Calendrier/vacances";

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Retourne la liste des dates des tenues à partir des données de réservation des loges
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getListeDates = oneLogeBooking => {
  const result = [];

  function giveDayNumber(dayToFind) {
    return constantes.jours.find(value => dayToFind === value.nom)?.numero;
  }

  var maDate = moment();

  if (oneLogeBooking?.hasOwnProperty("regulier")) {
    oneLogeBooking.regulier.forEach(reservation => {
      // on s'assure que les données sont bien remplies
      if (reservation.semaine) {
        //on parcourt tous les mois de l'année
        constantes.mois.forEach(mois => {
          //il y a une tenue le nieme jour du mois
          // ou nieme  est la premiere lettre de reservation.semaine
          // le jour est reservation.jours
          maDate = nthDay(
            new Date(
              constantes.annee + (mois.numero < 9 ? 1 : 0),
              mois.numero - 1,
              1
            ),
            giveDayNumber(reservation.jours),
            reservation.semaine[0]
          );
          maDate.isValid() &&
            result.push({
              date: maDate.locale("fr-FR"),
              reservation: reservation
            });
        });
      }
    });
  }

  // Pour les réservations exceptionnelles on ajoute simplement chacune des dates
  if (oneLogeBooking?.hasOwnProperty("exceptionnel")) {
    oneLogeBooking.exceptionnel.forEach(exceptionnel => {
      //
      if (exceptionnel.temple) {
        maDate = moment(exceptionnel.date);
        maDate.isValid() &&
          result.push({
            date: maDate.locale("fr-FR"),
            reservation: exceptionnel
          });
      }
    });
  }

  // On supprime les éventuels doublons
  let resultSansDoublon = result.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    []
  );

  // On enlève les dates supprimées
  let resultWithDelete = resultSansDoublon;

  if (oneLogeBooking?.hasOwnProperty("suppression")) {
    oneLogeBooking.suppression.forEach(suppression => {
      // Conversion de la date stockée en moment
      let dateSansJour = suppression.date.slice(
        suppression.date.indexOf(" ") + 1
      );
      maDate = moment(dateSansJour, "DD/MM/YYYY").locale("fr-FR");

      if (maDate.isValid()) {
        // On cherche la position de maDate dans resultWithDelete
        let pos = posDateInList(
          maDate,
          resultWithDelete.map(item => item.date)
        );
        // On supprime cet élément
        pos >= 0 && resultWithDelete.splice(pos, 1);
      }
    });
  }

  // Tri final
  let resultTrie = resultWithDelete.sort(
    (a, b) => a.date.valueOf() - b.date.valueOf()
  );

  return resultTrie;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Permet d'obtenir un texte de description des réservations à partir des données de réservation des loges
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const texteReservations = oneLogeBooking => {
  var result = "";

  // Texte à afficher pour chaque jour, heure, temple et sallehumide
  // Permet également de générer un index par jour, heure, temple et sallehumide
  function indexGenerator(item) {
    return (
      item.jours +
      " (" +
      item.heure +
      ", " +
      item.temple +
      ", " +
      item.sallehumide +
      ")"
    );
  }

  if (oneLogeBooking.hasOwnProperty("regulier")) {
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
  return result;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cette fonction permet d'assurer que le formulaire comporte toujours une dernière entrée vide
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const checkLastField = (
  oneLogeBooking,
  regulierAppend,
  exceptionnelAppend,
  suppressionAppend
) => {
  // Cette fonction permet de regarder si le dernier champs est vide
  // retourne un booléen
  function isEmptyLastField(fieldName, exception) {
    var result = false;

    if (oneLogeBooking.hasOwnProperty(fieldName)) {
      // lastField est le dernier champs du tableau
      let fields = oneLogeBooking[fieldName];
      let lastField = fields[fields.length - 1];
      // Le résultat est à true si tous les champs, sauf exception, sont soit égaux à "" soit undefined
      result = true;
      for (let value in lastField) {
        if (value !== exception)
          result =
            result &&
            (lastField[value] === "" ||
              typeof lastField[value] === "undefined");
      }
    }
    return result;
  }

  if (!isEmptyLastField("regulier"))
    regulierAppend({
      semaine: "",
      jours: "",
      temple: "",
      sallehumide: "",
      heure: ""
    });

  if (!isEmptyLastField("exceptionnel", "date"))
    exceptionnelAppend({ date: "", temple: "", sallehumide: "", heure: "" });

  if (!isEmptyLastField("suppression")) suppressionAppend({ date: "" });
};
