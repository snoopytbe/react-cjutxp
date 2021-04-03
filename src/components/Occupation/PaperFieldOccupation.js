import React from "react";
import { Grid, Paper } from "@material-ui/core";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";
import ControllerDatePicker from "../ReactHookedForm/ControllerDatePicker";
import Delete from "../ReactHookedForm/Delete";
import { modeleFormulaire } from "../../data/constantes";
import { useStyles } from "../../styles/styles";

// Permet de choisir le controller à appliquer en fonction  de son type et de fixer la valeur par défaut
function ControllerSwitch(props) {
  const { type, ...controllerProperties } = props;

  switch (type) {
    case "Select":
      return (
        <ControllerSelect
          {...controllerProperties}
        />
      );
      break;
    case "DatePicker":
      return (
        <ControllerDatePicker
          {...controllerProperties}
        />
      );
      break;
    default:
      "";
  }
}

export default function PaperFieldOccupation(props) {
  const {
    bookingIndex,
    field, // nom du champs apparaissant dans le PaperField
    control,
    onChangeHandler,
    removeHandler,
    oneLogeBooking, // objet décrivant la réservation de la loge
    noDelete,
    highlight,
    limit,
    ...others
  } = props;

  const GridContainerProp = {
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
    spacing: 2
  };

  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid {...GridContainerProp} container>
        {modeleFormulaire[field].map(item => {
          return (
            <React.Fragment key={item.id}>
              <Grid item xs={item.xs} sm={item.sm}>
                <ControllerSwitch
                  name={`${field}[${bookingIndex}].${item.nom}`}
                  dataName={item.nom}
                  control={control}
                  onChangeHandler={onChangeHandler}
                  required={bookingIndex + 1 !== oneLogeBooking.length} // seul le dernier champs n'est pas obligatoire
                  label={item.displayName}
                  listeChoix={item.liste ?? ""}
                  highlight={highlight}
                  limit={limit}
                  defaultValue={oneLogeBooking[bookingIndex]?.[item.nom] ?? ""}
                  type={item.type}
                />
              </Grid>
            </React.Fragment>
          );
        })}

        {!noDelete && (
          <Grid item xs={1} sm={1}>
            <Delete
              maxIndex={oneLogeBooking.length}
              removeHandler={removeHandler}
              index={bookingIndex}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
