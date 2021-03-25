import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";
import PaperFieldOccupation from "./PaperFieldOccupation";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";

// Fenetre permettant de créer une nouvelle occupation des locaux
export default function NouvelleOccupation(props) {
  const {
    logeBooking,
    date,
    setClose,
    append,
    remove,
    logesUtilisatrices
  } = props;

  const defaultValues = [
    {
      date: date.format(),
      temple: "Berteaux (ETG)",
      sallehumide: "Salle humide Cuisine",
      heure: "20h30"
    }
  ];

  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });

  const onSubmit = update => {
    // On supprime le dernier champs qui est normalement vide
    remove(logeBooking[0]["suppression"].length - 1);

    // Puis on ajoute les nouvelles données
    let shortcut = update["suppression"][0];
    append({
      date: shortcut.date,
      temple: shortcut.temple,
      sallehumide: shortcut.sallehumide,
      heure: shortcut.heure
    });

    // Fermeture de la fenêtre
    setClose(true);
  };

  // Liste des loges
  const listeLoges = logesUtilisatrices;

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Supprimer une réservation</Typography>
        <ControllerSelect
          name="Loge"
          label="Loge"
          control={control}
          defaultValue={listeLoges[0]}
          listeChoix={listeLoges}
          required
          onChangeHandler={() => {}}
        />
        <PaperFieldOccupation
          field="suppression"
          oneLogeBooking={defaultValues}
          bookingIndex={0}
          control={control}
          onChangeHandler={() => {}}
        />
        <Typography variant="h6" />
        <Button variant="contained" color="primary" type="submit">
          Valider
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setClose(true)}
        >
          Annuler
        </Button>
      </form>
    </div>
  );
}
