import moment from "moment";

export function nthDay(dt, day, number) {
  // Retourne le nième jour du mois par rapport à la date dt
  // dt : date de référence
  // day : jour de la semaine
  // number : numero du jour = nieme
  var firstDay = dt.clone().date(1).day(day);
  // Si firstDay est le mois précédent il faut décaler firstDay d'une semaine
  if (firstDay.isBefore(dt.startOf("month"))) firstDay.add(7, "days");
  var result = firstDay.clone().add((number - 1) * 7, "days");
  if (result.isAfter(dt.endOf("month"))) result = moment.invalid();
  return result;
}

export function posDateInList(dt, liste) {
  return dt?.isValid() ? liste.findIndex((item) => dt.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).diff(item, "days") === 0) : -1;
}

export function dateInList(dt, liste) {
  return posDateInList(dt, liste) >= 0;
}

function estToussaint(dt) {
  // 3e samedi d'octobre
  var debutVacances = nthDay(moment([dt.year(), 9, 1]), 6, 3);
  var finVacances = debutVacances.clone().add(15, "days");
  return debutVacances.diff(dt, "days") <= 0 && finVacances.diff(dt, "days") >= 0;
}

function debutVacancesNoel(annee) {
  // Démarre le samedi qui précède Noël
  // sauf si Noel est un dimanche auquel cas cela démarre le samedi 8 jours avant
  var Noel = moment([annee, 11, 25]);
  return Noel.clone().day(6 - (Noel.day() === 0 ? 2 : 1) * 7);
}

function finVacancesNoel(annee) {
  var Noel = moment([annee, 11, 25]);
  return debutVacancesNoel(annee).add(15 + (Noel.day() === 0 && 1), "days");
}

function estNoel(dt) {
  // Attention le début et la fin des vacances sont sur deux années différentes
  var debutVacances = debutVacancesNoel(dt.year());
  var finVacances = finVacancesNoel(dt.year() - 1);
  return debutVacances.diff(dt, "days") <= 0 || finVacances.diff(dt, "days") >= 0;
}

function estFevrier(dt, zone) {
  // Démarre 5 semaines après la fin des vacances de Noël pour la première zone
  var Numero;

  switch (zone) {
    case "A":
      Numero = ((dt.year() - 2018) % 3) + 1;
      break;
    case "B":
      Numero = ((dt.year() - 2018) % 3) + 3;
      break;
    case "C":
      Numero = ((dt.year() - 2018) % 3) + 2;
      break;
    default:
      Numero = 0;
  }

  var debutVacances = finVacancesNoel(dt.year() - 1).day(6 + (3 + Numero) * 7);
  var finVacances = debutVacances.clone().add(15, "days");

  return debutVacances.diff(dt, "days") <= 0 && finVacances.diff(dt, "days") >= 0;
}

export function estVacances(dt, zone) {
  return estToussaint(dt) || estNoel(dt) || estFevrier(dt, zone);
}
