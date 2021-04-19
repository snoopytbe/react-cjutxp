import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import { getListeDates, getListeDateFromField } from "./occupationMethods";
import Calendrier from "../Calendrier/Calendrier";
import { useHistory } from "react-router-dom";
import DialogAddOccupation from "./DialogAddOccupation";
import FieldComponent from "./FieldComponent";

// Affiche le formulaire d'occupation de la loge "id"
export default function Occupation(props) {
  const { logeBooking, setLogeBooking, id } = props;

  const [open, setOpen] = React.useState(false);
  const [typeEdit, setTypeEdit] = React.useState("");
  const [highlight, setHighlight] = React.useState([]);
  const [limit, setLimit] = React.useState([]);

  // Liste des dates avec une réservation
  const [listeDates, setListeDates] = React.useState(
    getListeDates(logeBooking[id])
  );

  // Création du formulaire initialisé avec les données de la loge
  const { control, handleSubmit, register, getValues, reset } = useForm({
    defaultValues: logeBooking[id]
  });

  const onChangeHandler = () => {
    // Mise à jour suite au changement
    setListeDates(getListeDates(getValues()));
  };

  // Initialisation lors du chargement
  React.useEffect(() => {
    onChangeHandler();
  }, []);

  // Lors de la validation du formulaire mise à jour de LogeBooking
  const onSubmit = update => {
    let newLogeBooking = logeBooking;
    newLogeBooking[id] = update;
    setLogeBooking(newLogeBooking);
  };

  // Mise à jour lors du changement de listeDates
  const calendrierMemoized = React.useMemo(
    () => (
      <Calendrier
        logeBooking={[getValues()]}
        setLogeBooking={value => {
          reset(value[0]);
          onChangeHandler();
        }}
      />
    ),
    [listeDates]
  );

  var history = useHistory();

  const fieldArrays = {
    reccurent: {
      title: "Réservations régulières",
      typeEdit: "reccurent",
      limit: [],
      highlight: []
    },
    modify_reccurent: {
      title: "Modifications exceptionnelles",
      typeEdit: "modify_reccurent",
      limit: getListeDateFromField(getValues(), "reccurent"),
      highlight: listeDates
    },
    exceptionnel: {
      title: "Réservations exceptionnelles",
      typeEdit: "ajout",
      limit: getListeDates(getValues(), true),
      highlight: listeDates
    },
    suppression: {
      title: "Suppression exceptionnelle de réservation",
      typeEdit: "suppression",
      limit: listeDates,
      highlight: listeDates
    }
  };

  Object.keys(fieldArrays)?.map(
    field =>
      ({
        fields: fieldArrays[field].fields,
        remove: fieldArrays[field].remove
      } = useFieldArray({
        control,
        name: field
      }))
  );

  function onClickAdd(field) {
    setTypeEdit(fieldArrays[field].typeEdit);
    setLimit(fieldArrays[field].limit);
    setHighlight(fieldArrays[field].highlight);
    setOpen(true);
  }

  const commonFieldComponentProps = {
    fieldArrays: fieldArrays,
    onChangeHandler: onChangeHandler,
    onClickAdd: onClickAdd,
    control: control
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Typography variant="h4">Réservations</Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => history.push("/")}
      >
        Retour au tableau de synthèse
      </Button>
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="loge"
          required
          defaultValue=""
          label="Nom de la loge"
          fullWidth
          inputRef={register}
        />

        <TextField
          name="acronyme"
          required
          defaultValue=""
          label="Trigramme"
          fullWidth
          inputRef={register}
        />

        {Object.keys(fieldArrays)?.map(field => {
          return (
            <FieldComponent {...commonFieldComponentProps} field={field} />
          );
        })}

        <Typography variant="h6" />
        {calendrierMemoized}
      </form>

      <DialogAddOccupation
        open={open}
        handleClose={() => setOpen(false)}
        handleRendered={() => {}}
        logeBooking={[getValues()]}
        setLogeBooking={value => {
          reset(value[0]);
          onChangeHandler();
        }}
        logesUtilisatrices={[]}
        typeEdit={typeEdit}
        limit={limit}
        highlight={highlight}
      />
    </div>
  );
}
