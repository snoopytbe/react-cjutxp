import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";
import PaperFieldOccupation from "./PaperFieldOccupation";
import {
  getOccupationLogeDate,
  getIdLoge,
  isEmptyLastField
} from "./occupationMethods";

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

  // Liste des loges
  var listeLoges = [];
  // Champs de logeBooking qui est édité
  var field = "";
  // Entete affiche
  var texteEntete = "";

  switch (typeEdit) {
    case "delete":
      field = "suppression";
      listeLoges = logesUtilisatrices?.map(loge => loge.loge) ?? [];
      texteEntete = "Suppression de réservation";
      break;

    case "modify":
      field = "exceptionnel";
      listeLoges = logesUtilisatrices?.map(loge => loge.loge) ?? [];
      texteEntete = "Modification de réservation";
      break;

    case "add":
      field = "exceptionnel";
      // on ne met dans listeLoges que les loges qui ne font pas partie des logesUtilisatrices
      logeBooking?.forEach(
        loge =>
          logesUtilisatrices?.findIndex(item => item.loge === loge.loge) ===
            -1 && listeLoges.push(loge.loge)
      ) ?? [];
      texteEntete = "Ajout de réservation";
      break;

    default:
      texteEntete = "Erreur";
  }

  const onSubmit = update => {
    var newLogeBooking = logeBooking;

    // On récupère l'id de la loge modifiée
    var idModified = getIdLoge(logeBooking, update.loge);

    // On supprime le dernier champs s'il est vide
    if (isEmptyLastField(newLogeBooking[idModified], field)) {
      newLogeBooking[idModified][field].length =
        newLogeBooking[idModified][field].length - 1;
    }

    // Puis on ajoute les nouvelles données
    switch (field) {
      case "suppression":
        newLogeBooking[idModified][field].push({
          date: date
        });
        break;

      case "exceptionnel":
        // Puis on ajoute les nouvelles données
        let shortcut = update[field][0];
        newLogeBooking[idModified][field].push({
          date: shortcut.date,
          temple: shortcut.temple,
          sallehumide: shortcut.sallehumide,
          heure: shortcut.heure
        });
        break;

      default:
    }

    //Sauvegarde
    setLogeBooking(newLogeBooking);

    // Fermeture de la fenêtre
    setClose(true);
  };

  const logeChangeHandler = e => {
    if ((field = "exceptionnel")) {
      let occupation = getOccupationLogeDate(
        logeBooking,
        getValues("loge"),
        date
      );
      setValue("exceptionnel[0].temple", occupation?.temple ?? "");
      setValue("exceptionnel[0].sallehumide", occupation?.sallehumide ?? "");
      setValue("exceptionnel[0].heure", occupation?.heure ?? "");
    }
  };

  React.useEffect(() => {
    logeChangeHandler();
  }, []);

  const defaultValues = [
    {
      date: date?.format(),
      temple: "",
      sallehumide: "",
      heure: ""
    }
  ];

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: defaultValues
  });

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">{texteEntete}</Typography>
        <ControllerSelect
          name="loge"
          label="Loge"
          control={control}
          defaultValue={listeLoges[0]}
          listeChoix={listeLoges}
          required
          onChangeHandler={logeChangeHandler}
        />
        {field === "exceptionnel" && (
          <>
            <PaperFieldOccupation
              field={field}
              oneLogeBooking={defaultValues}
              bookingIndex={0}
              control={control}
              onChangeHandler={() => {}}
            />
          </>
        )}
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
