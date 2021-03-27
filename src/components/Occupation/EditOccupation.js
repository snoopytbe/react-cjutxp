import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";
import PaperFieldOccupation from "./PaperFieldOccupation";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";
import { getOccupationLogeDate } from "./occupationMethods";

// Fenetre permettant de supprimer une occupation des locaux
export default function EditOccupation(props) {
  const {
    logeBooking,
    date,
    setClose,
    append,
    remove,
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

  const onSubmit = update => {
    // On supprime le dernier champs qui est normalement vide
    remove(logeBooking[0]["exceptionnel"].length - 1);

    // Puis on ajoute les nouvelles données
    let shortcut = update["exceptionnel"][0];
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
  var listeLoges = [];
  switch (typeEdit) {
    case "modification":
      listeLoges = logesUtilisatrices?.map(loge => loge.loge) ?? [];
      break;
    default:
      listeLoges = logeBooking?.map(item => item.loge) ?? [];
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
