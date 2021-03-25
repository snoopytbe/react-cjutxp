import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";
import PaperFieldOccupation from "./PaperFieldOccupation";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";

export default function NouvelleOccupation(props) {
  const {
    logeBooking,
    setLogeBooking,
    date,
    setClose,
    changeHandler,
    append,
    remove
  } = props;

  const defaultValues = [
    {
      date: date.format(),
      temple: "Berteaux (ETG)",
      sallehumide: "Salle humide Cuisine",
      heure: "20h00"
    }
  ];

  const indexToRemove = () => {
    let result = null;
    if (logeBooking.hasOwnProperty("exceptionnel"))
      result = logeBooking["exceptionnel"].length - 1;
    return result;
  };

  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });

  const onSubmit = update => {
    remove(logeBooking[0]["exceptionnel"].length - 1);

    let shortcut = update["exceptionnel"][0];
    append({
      date: shortcut.date,
      temple: shortcut.temple,
      sallehumide: shortcut.sallehumide,
      heure: shortcut.heure
    });
    setClose(true);
    changeHandler();
  };

  const listeLoges = logeBooking.map(item => item.loge);

  function commonProps(index) {
    return {
      bookingIndex: index,
      control: control,
      changeHandler: () => {}
    };
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Nouvelle réservation</Typography>
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
          field="exceptionnel"
          oneLogeBooking={defaultValues}
          {...commonProps(0)}
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
