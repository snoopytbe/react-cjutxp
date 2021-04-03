import React from "react";
import { Controller } from "react-hook-form";
import "date-fns";
import frLocale from "date-fns/locale/fr";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Badge } from "@material-ui/core";
import moment from "moment";
import "moment/min/locales.min";

export default function ControllerDatePicker(props) {
  const {
    name,
    defaultValue,
    label,
    control,
    required,
    onChangeHandler,
    highlight,
    limit,
    ...other
  } = props;

  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, "d MMM yyyy", { locale: this.locale });
    }
  }

  // Retourne true quand la date doit être désactivée dans le calendrier
  function disableAllButHighlight(date) {
    let result = false;
    if (limit) {
      // si date fait partie des dates de "limit"
      limit.forEach(
        item => (result = result || item.date.diff(date, "days") === 0)
      );
      // alors le résultat doit être à false
      result = !result;
      // DefaultValue fait partie des dates activées
      if (moment(defaultValue).diff(date, "days") === 0) result = false;
    }
    return result;
  }

  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
      <Controller
        {...other}
        name={name}
        control={control}
        defaultValue={defaultValue === "" ? null : defaultValue} // utiliser la valeur null permet d'avoir le "empty label" du DatePicker
        rules={{ required: { required } }}
        render={({ value, onChange }) => (
          <KeyboardDatePicker
            id={"date-picker-dialog" + name}
            label={label}
            format="dd/MM/yyyy"
            value={value}
            onChange={date => {
              onChange(date);
              onChangeHandler(name);
            }}
            KeyboardButtonProps={{
              "aria-label": "Changer la date"
            }}
            okLabel="Valider"
            cancelLabel="Annuler"
            shouldDisableDate={disableAllButHighlight}
            renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
              // ne pas supprimer selectedDate !!!
              let isSelected =
                isInCurrentMonth &&
                highlight &&
                highlight.reduce((bef, now) => {
                  return bef || now.date.diff(day, "days") === 0;
                }, false);
              return (
                <Badge color="secondary" variant="dot" invisible={!isSelected}>
                  {dayComponent}
                </Badge>
              );
            }}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
}
