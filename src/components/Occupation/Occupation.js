import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import { getListeDates, checkLastField } from "./occupationMethods";
import Calendrier from "../Calendrier/Calendrier";
import PaperFieldOccupation from "./PaperFieldOccupation";
import { useHistory } from "react-router-dom";


// Affiche le formulaire d'occupation de la loge "id"
export default function Occupation(props) {
  const { logeBooking, setLogeBooking, id } = props;

  // Création du formulaire initialisé avec les données de la loge
  const { control, handleSubmit, register, getValues, reset } = useForm({
    defaultValues: logeBooking[id]
  });

  const {
    fields: regulierFields,
    append: regulierAppend,
    remove: regulierRemove
  } = useFieldArray({
    control,
    name: "regulier"
  });

  const {
    fields: exceptionnelFields,
    append: exceptionnelAppend,
    remove: exceptionnelRemove
  } = useFieldArray({
    control,
    name: "exceptionnel"
  });

  const {
    fields: suppressionFields,
    append: suppressionAppend,
    remove: suppressionRemove
  } = useFieldArray({
    control,
    name: "suppression"
  });

  // Liste des dates avec une réservation
  const [listeDates, setListeDates] = React.useState(
    getListeDates(logeBooking[id])
  );

  const onChangeHandler = name => {
    let values = getValues();
    // Mise à jour suite au changement
    checkLastField(
      values,
      regulierAppend,
      exceptionnelAppend,
      suppressionAppend
    );
    // Mise à jour suite au changement
    setListeDates(getListeDates(values));
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

  function commonProps(index) {
    return {
      bookingIndex: index,
      control: control,
      onChangeHandler: onChangeHandler
    };
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Typography variant="h4">Réservation</Typography>
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

        <Typography variant="h6">Réservations régulières</Typography>

        {regulierFields.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <PaperFieldOccupation
                field="regulier"
                oneLogeBooking={regulierFields}
                removeHandler={regulierRemove}
                {...commonProps(index)}
              />
            </React.Fragment>
          );
        })}

        <Typography variant="h6">Réservations exceptionnelles</Typography>

        {exceptionnelFields.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <PaperFieldOccupation
                field="exceptionnel"
                oneLogeBooking={exceptionnelFields}
                removeHandler={exceptionnelRemove}
                highlight={listeDates}
                {...commonProps(index)}
              />
            </React.Fragment>
          );
        })}

        <Typography variant="h6">
          Suppression exceptionnelle de réservation
        </Typography>

        {suppressionFields.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <PaperFieldOccupation
                index={index}
                field="suppression"
                oneLogeBooking={suppressionFields}
                removeHandler={suppressionRemove}
                limit={listeDates}
                highlight={listeDates}
                {...commonProps(index)}
              />
            </React.Fragment>
          );
        })}
        <Typography variant="h6" />
        <Button variant="contained" color="primary" type="submit">
          Valider
        </Button>
        <Typography variant="h6" />
        {calendrierMemoized}
      </form>
    </div>
  );
}
