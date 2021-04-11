import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";
import PaperFieldOccupation from "./PaperFieldOccupation";
import { getOccupationLogeDate, getIdLoge } from "./occupationMethods";
import moment from "moment";

// Fenetre permettant de supprimer une occupation des locaux
export default function EditOccupation(props) {
  const {
    logeBooking,
    setLogeBooking,
    date,
    setClose,
    logesUtilisatrices,
    typeEdit,
    limit,
    highlight
  } = props;

  // Liste des loges
  var listeLoges = [];
  // Champs de logeBooking qui est édité
  var field = "";
  // Entete affiche
  var texteEntete = "";

  var ListeLogesUtilisatrices =
    logesUtilisatrices?.map(loge => loge.loge) ?? [];
  var ListeLogesComplete = logeBooking?.map(loge => loge.loge) ?? [];

  switch (typeEdit) {
    case "delete":
      field = "suppression";
      listeLoges = ListeLogesUtilisatrices;
      texteEntete = "Suppression de réservation";
      break;

    case "add_regulier":
      field = "regulier";
      listeLoges = ListeLogesComplete;
      texteEntete = "Ajout de réservation";
      break;

    case "modify_regulier":
      field = "modification";
      listeLoges =
        ListeLogesUtilisatrices.length > 0
          ? ListeLogesUtilisatrices
          : ListeLogesComplete;
      texteEntete = "Modification d'une réservation récurrente";
      break;

    case "modify":
      field = "exceptionnel";
      listeLoges = ListeLogesUtilisatrices;
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

    var shortcut = update[field][0];

    // On ajoute les nouvelles données
    switch (field) {
      case "suppression":
        newLogeBooking[idModified][field].push({
          date: date
        });
        break;

      case "regulier":
        newLogeBooking[idModified][field].push({
          jours: shortcut.jours,
          semaine: shortcut.semaine,
          temple: shortcut.temple,
          sallehumide: shortcut.sallehumide,
          heure: shortcut.heure
        });
        break;

      default:
        // = "exceptionnel"
        newLogeBooking[idModified][field].push({
          date: shortcut.date,
          temple: shortcut.temple,
          sallehumide: shortcut.sallehumide,
          heure: shortcut.heure
        });
    }

    // Fermeture de la fenêtre
    setClose(true);

    //Sauvegarde
    setLogeBooking(newLogeBooking);
  };

  const logeChangeHandler = e => {
    if (field === "exceptionnel") {
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

  const [formDate, setFormDate] = React.useState(date);

  const paperFieldChangeHandler = e => {
    if (field === "modification") {
      if (!moment(formDate).isSame(moment(getValues("modification[0].date")))) {
        setFormDate(getValues("modification[0].date"));
        let occupation = getOccupationLogeDate(
          logeBooking,
          getValues("loge"),
          moment(getValues("modification[0].date"))
        );
        setValue("modification[0].temple", occupation?.temple ?? "");
        setValue("modification[0].sallehumide", occupation?.sallehumide ?? "");
        setValue("modification[0].heure", occupation?.heure ?? "");
      }
    }
  };

  React.useEffect(() => {
    logeChangeHandler();
  }, []);

  const defaultValues = [
    {
      date: date?.format(),
      semaine: "",
      jour: "",
      temple: "",
      sallehumide: "",
      heure: ""
    }
  ];

  const { control, handleSubmit, getValues, setValue } = useForm({});

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
        {typeEdit !== "delete" && (
          <>
            <PaperFieldOccupation
              field={field}
              oneLogeBooking={defaultValues}
              bookingIndex={0}
              control={control}
              onChangeHandler={paperFieldChangeHandler}
              limit={limit}
              highlight={highlight}
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
