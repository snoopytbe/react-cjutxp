import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";
import PaperFieldOccupation from "./PaperFieldOccupation";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";
import {
  getOccupationLogeDate,
  getIdLoge,
  isEmptyLastField
} from "./occupationMethods";
import moment from "moment";
import "moment/min/locales.min";

// Fenetre permettant de supprimer une occupation des locaux
export default function EditOccupation(props) {
  const {
    logeBooking,
    setLogeBooking,
    date,
    setClose,
    logesUtilisatrices,
    typeEdit
  } = props;

  const { control, handleSubmit } = useForm({});

  const onSubmit = update => {
    var newLogeBooking = logeBooking;

    // On récupère l'id de la loge modifiée
    var idModified = getIdLoge(logeBooking, update.loge);

    // On supprime le dernier champs s'il est vide
    if (isEmptyLastField(newLogeBooking[idModified], "suppression")) {
      newLogeBooking[idModified]["suppression"].length =
        newLogeBooking[idModified]["suppression"].length - 1;
    }

    // Puis on ajoute les nouvelles données
    newLogeBooking[idModified]["suppression"].push({
      date: moment(date).locale("fr-FR").format("dddd DD/MM/YYYY")
    });

    //Sauvegarde
    setLogeBooking(newLogeBooking);

    // Fermeture de la fenêtre
    setClose(true);
  };

  // Liste des loges
  var listeLoges = [];
  switch (typeEdit) {
    case "delete":
    case "modify":
      listeLoges = logesUtilisatrices?.map(loge => loge.loge) ?? [];
      break;
    default:
      listeLoges = logeBooking?.map(item => item.loge) ?? [];
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Supprimer une réservation</Typography>
        <ControllerSelect
          name="loge"
          label="Loge"
          control={control}
          defaultValue={listeLoges[0]}
          listeChoix={listeLoges}
          required
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
