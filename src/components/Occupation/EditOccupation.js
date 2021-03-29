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

// Fenetre permettant de supprimer une occupation des locaux
export default function EditOccupation(props) {
  const {
    logeBooking,
    setLogeBooking,
    id = 0,
    date,
    setClose,
    logesUtilisatrices,
    typeEdit
  } = props;

  const defaultValues = [
    {
      date: date.format(),
      temple: "",
      sallehumide: "",
      heure: ""
    }
  ];

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: defaultValues
  });

  var localLogeBooking = id === -1 ? logeBooking : [logeBooking[id]];

  const onSubmit = update => {
    var newLogeBooking = logeBooking;

    // On récupère l'id de la loge modifiée
    var idModified = getIdLoge(logeBooking, update.loge);

    // On supprime le dernier champs s'il est vide
    if (isEmptyLastField(newLogeBooking[idModified], "exceptionnel", "date")) {
      newLogeBooking[idModified]["exceptionnel"].length =
        newLogeBooking[idModified]["exceptionnel"].length - 1;
    }

    // Puis on ajoute les nouvelles données
    let shortcut = update["exceptionnel"][0];
    newLogeBooking[idModified]["exceptionnel"].push({
      date: shortcut.date,
      temple: shortcut.temple,
      sallehumide: shortcut.sallehumide,
      heure: shortcut.heure
    });

    //Sauvegarde
    setLogeBooking(newLogeBooking);

    // Fermeture de la fenêtre
    setClose(true);
  };

  // Liste des loges
  var listeLoges = [];
  switch (typeEdit) {
    case "modify":
      listeLoges = logesUtilisatrices?.map(loge => loge.loge) ?? [];
      break;
    default:
      listeLoges = localLogeBooking?.map(item => item.loge) ?? [];
  }

  const logeChangeHandler = e => {
    let occupation = getOccupationLogeDate(
      logeBooking,
      getValues("loge"),
      date
    );
    setValue("exceptionnel[0].temple", occupation?.temple ?? "");
    setValue("exceptionnel[0].sallehumide", occupation?.sallehumide ?? "");
    setValue("exceptionnel[0].heure", occupation?.heure ?? "");
  };

  React.useEffect(() => {
    logeChangeHandler();
  }, []);

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Modifier une réservation</Typography>
        <ControllerSelect
          name="loge"
          label="Loge"
          control={control}
          defaultValue={listeLoges[0]}
          listeChoix={listeLoges}
          required
          onChangeHandler={logeChangeHandler}
        />
        <PaperFieldOccupation
          field="exceptionnel"
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
