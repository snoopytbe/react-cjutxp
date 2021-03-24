import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";
import PaperFieldOccupation from "./PaperFieldOccupation";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";

export default function SaisieOccupation(props) {
  const { logeBooking, setLogeBooking, date, setClose } = props;

  const defaultValues = [
    {
      date: date.format(),
      temple: "",
      sallehumide: "",
      heure: ""
    }
  ];

  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });

  const changeHandler = () => {};

  const onSubmit = update => {
    let newLogeBooking = logeBooking;
    newLogeBooking.push(update);
    //setLogeBooking(newLogeBooking);
    setClose(true);
  };

  const listeLoges = logeBooking.map(item => item.loge);

  function commonProps(index) {
    return {
      bookingIndex: index,
      control: control,
      changeHandler: changeHandler
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
          onChangeHandler={changeHandler}
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
