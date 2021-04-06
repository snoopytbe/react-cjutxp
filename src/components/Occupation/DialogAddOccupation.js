import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditOccupationWindow from "../Occupation/EditOccupationWindow";

export default function DialogAddOccupation(props) {
  const {
    open,
    handleClose,
    handleRendered,
    logeBooking,
    setLogeBooking,
    date,
    logesUtilisatrices,
    typeEdit
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onRendered={handleRendered}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <EditOccupationWindow
          logeBooking={logeBooking}
          setLogeBooking={setLogeBooking}
          date={date}
          logesUtilisatrices={logesUtilisatrices}
          setClose={handleClose}
          typeEdit={typeEdit}
        />
      </DialogContent>
    </Dialog>
  );
}
