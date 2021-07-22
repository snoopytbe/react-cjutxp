import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Grid } from "@material-ui/core";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";
import PaperFieldOccupation from "./PaperFieldOccupation";
import { getLogeBookingDate, getIdLoge } from "./occupationMethods";
import moment from "moment";

// Fenetre permettant de supprimer une occupation des locaux
export default function EditOccupation(props) {
  const { logeBooking, setLogeBooking, date, setClose, logesUtilisatrices, typeEdit, limit, highlight } = props;

  // Liste des loges
  var listeLoges = [];
  // Champs de logeBooking qui est édité
  var field = "";
  // Entete affiche
  var texteEntete = "";

  var ListeLogesUtilisatrices = logesUtilisatrices?.map((loge) => loge.loge) ?? [];

  var ListeLogesComplete = logeBooking?.map((loge) => loge.loge) ?? [];

  switch (typeEdit) {
    case "reccurent":
      field = "reccurent";
      listeLoges = ListeLogesComplete;
      texteEntete = "Ajout de réservation récurrente";
      break;

    case "modify_reccurent":
      field = "modify_reccurent";
      listeLoges = ListeLogesUtilisatrices.length > 0 ? ListeLogesUtilisatrices : ListeLogesComplete;
      texteEntete = "Modification d'une réservation récurrente";
      break;

    case "ajout":
      field = "exceptionnel";
      // on ne met dans listeLoges que les loges qui ne font pas partie des logesUtilisatrices
      logeBooking?.forEach((loge) => logesUtilisatrices?.findIndex((item) => item.loge === loge.loge) === -1 && listeLoges.push(loge.loge)) ?? [];
      texteEntete = "Ajout de réservation";
      break;

    case "modification":
      field = "exceptionnel";
      listeLoges = ListeLogesUtilisatrices;
      texteEntete = "Modification de réservation";
      break;

    case "suppression":
      field = "suppression";
      listeLoges = ListeLogesUtilisatrices.length > 0 ? ListeLogesUtilisatrices : ListeLogesComplete;
      texteEntete = "Suppression de réservation";
      break;

    default:
      texteEntete = "Erreur";
  }

  const onSubmit = (update) => {
    var newLogeBooking = logeBooking;

    // On récupère l'id de la loge modifiée
    var idModified = getIdLoge(logeBooking, update.loge);

    var shortcut = update[field][0];

    // On regarde s'il y a une erreur
    var isError = false;
    switch (field) {
      case "exceptionnel":
      case "modify_reccurent":
        let occupation = getLogeBookingDate(logeBooking, update.loge, shortcut.date);

        isError = shortcut.temple === occupation?.temple && shortcut.sallehumide === occupation?.sallehumide && shortcut.heure === occupation?.heure;

        setError("loge", {
          type: "manual",
          message: `Erreur : vous n'avez pas apporté de modification le ${moment(shortcut.date).format("DD/MM/YYYY")}`,
        });
        break;

      case "reccurent":
        // On recherche les réservations de la loge
        let foundLogeBooking = logeBooking[idModified][field].find((item) => item.jours === shortcut.jours && item.semaine === shortcut.semaine);
        isError = foundLogeBooking ? true : false;

        setError("loge", {
          type: "manual",
          message: `Erreur : il existe déjà une réservation le ${shortcut.semaine} ${shortcut.jours}`,
        });

        break;

      default:
    }

    // On ajoute les nouvelles données
    if (!isError) {
      newLogeBooking[idModified][field] = newLogeBooking[idModified][field] || [];

      switch (field) {
        case "suppression":
          newLogeBooking[idModified][field].push({
            date: date,
          });
          break;

        case "reccurent":
          newLogeBooking[idModified][field].push({
            jours: shortcut.jours,
            semaine: shortcut.semaine,
            temple: shortcut.temple,
            sallehumide: shortcut.sallehumide,
            heure: shortcut.heure,
          });
          break;

        case "exceptionnel":
        case "modify_reccurent":
        default:
          newLogeBooking[idModified][field].push({
            date: shortcut.date,
            temple: shortcut.temple,
            sallehumide: shortcut.sallehumide,
            heure: shortcut.heure,
          });
      }

      // Fermeture de la fenêtre
      setClose(true);

      //Sauvegarde
      setLogeBooking(newLogeBooking);
    }
  };

  const [bufferLoge, setBufferLoge] = React.useState("");
  const [bufferDate, setBufferDate] = React.useState("");

  const changeHandler = (e) => {
    if (getValues("loge") !== bufferLoge || getValues(`${field}[0].date`) !== bufferDate) {
      setBufferLoge(getValues("loge"));
      setBufferDate(getValues(`${field}[0].date`));

      let occupation = getLogeBookingDate(logeBooking, getValues("loge"), getValues(`${field}[0].date`));
      setValue(`${field}[0].temple`, occupation?.temple ?? "");
      setValue(`${field}[0].sallehumide`, occupation?.sallehumide ?? "");
      setValue(`${field}[0].heure`, occupation?.heure ?? "");
    }
  };

  React.useEffect(() => {
    changeHandler();
  }, []);

  const defaultValues = [
    {
      date: date?.format(),
      semaine: "",
      jour: "",
      temple: "",
      sallehumide: "",
      heure: "",
    },
  ];

  const { control, handleSubmit, getValues, setValue, setError, errors } = useForm({});

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
          onChangeHandler={changeHandler}
        />

        <PaperFieldOccupation
          field={field}
          oneLogeBooking={defaultValues}
          bookingIndex={0}
          control={control}
          onChangeHandler={changeHandler}
          limit={limit}
          highlight={highlight}
        />

        <Typography variant="h6" />
        <Grid direction="row" justify="flex-end" alignItems="center" spacing={3} container>
          <Grid item>{errors.loge && <Typography variant="subtitle1">{errors.loge.message}</Typography>}</Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Valider
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => setClose(true)}>
              Annuler
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
