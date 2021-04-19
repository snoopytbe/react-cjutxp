import { NouvelAn, Noel } from "../components/Calendrier/jourFeries";

export const annee = 2020;

export const zone = "A";

export const jours = [
  { nom: "lundi", numero: 1 },
  { nom: "mardi", numero: 2 },
  { nom: "mercredi", numero: 3 },
  { nom: "jeudi", numero: 4 },
  { nom: "vendredi", numero: 5 },
  { nom: "samedi", numero: 6 },
  { nom: "dimanche", numero: 0 }
];

export const joursInterdits = ["dimanche"];

export const periodesInterdites = [
  { debut: Noel(annee), fin: NouvelAn(annee + 1) },
  { debut: new Date(annee + 1, 6, 1), fin: new Date(annee + 1, 6, 31) }
];

export const mois = [
  { nom: "Septembre", numero: 9 },
  { nom: "Octobre", numero: 10 },
  { nom: "Novembre", numero: 11 },
  { nom: "Décembre", numero: 12 },
  { nom: "Janvier", numero: 1 },
  { nom: "Février", numero: 2 },
  { nom: "Mars", numero: 3 },
  { nom: "Avril", numero: 4 },
  { nom: "Mai", numero: 5 },
  { nom: "Juin", numero: 6 },
  { nom: "Juillet", numero: 7 }
];

const temples = ["Berteaux (ETG)", "Ramsay (RDC)", "Aucun temple"];

const salleshumides = [
  "Salle humide Cuisine",
  "Salle humide Jardin",
  "Les 2 salles humides",
  "Aucune salle humide"
];

const horaires = [];
for (let i = 9; i <= 23; i++)
  for (let j = 0; j < 2; j++) horaires.push(i + "h" + (j === 0 ? "00" : "30"));

const caracteristiqueChamps = {
  datePicker: { nom: "date", displayName: "Date", type: "DatePicker" },
  dateSelect: { nom: "date", displayName: "Date", type: "Select" },
  jour: {
    nom: "jours",
    displayName: "Jour",
    type: "Select",
    liste: jours.map(value => value.nom)
  },
  semaine: {
    nom: "semaine",
    displayName: "Semaine",
    type: "Select",
    liste: ["1er", "2ème", "3ème", "4ème", "5ème"]
  },
  temple: {
    nom: "temple",
    displayName: "Temple",
    type: "Select",
    liste: temples
  },
  sallehumide: {
    nom: "sallehumide",
    displayName: "Salle humide",
    type: "Select",
    liste: salleshumides
  },
  heure: {
    nom: "heure",
    displayName: "Heure",
    type: "Select",
    liste: horaires
  }
};

// Definition de la structure du formulaire
export const modeleFormulaire = {
  reccurent: [
    { ...caracteristiqueChamps["semaine"], xs: 4, sm: 2 },
    { ...caracteristiqueChamps["jour"], xs: 4, sm: 2 },
    { ...caracteristiqueChamps["temple"], xs: 4, sm: 2 },
    { ...caracteristiqueChamps["sallehumide"], xs: 4, sm: 2 },
    { ...caracteristiqueChamps["heure"], xs: 4, sm: 3 }
  ],
  modify_reccurent: [
    { ...caracteristiqueChamps["datePicker"], xs: 6, sm: 3 },
    { ...caracteristiqueChamps["temple"], xs: 6, sm: 2 },
    { ...caracteristiqueChamps["sallehumide"], xs: 6, sm: 3 },
    { ...caracteristiqueChamps["heure"], xs: 6, sm: 3 }
  ],
  exceptionnel: [
    { ...caracteristiqueChamps["datePicker"], xs: 6, sm: 3 },
    { ...caracteristiqueChamps["temple"], xs: 6, sm: 2 },
    { ...caracteristiqueChamps["sallehumide"], xs: 6, sm: 3 },
    { ...caracteristiqueChamps["heure"], xs: 6, sm: 3 }
  ],
  suppression: [{ ...caracteristiqueChamps["datePicker"], xs: 11, sm: 11 }]
};
