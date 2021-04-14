import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Delete(props) {
  const { maxIndex, removeHandler, index } = props;

  return (
    <div>
      <DeleteIcon
        color="primary"
        onClick={() => {
          removeHandler(index);
        }}
        style={{ fontSize: "1.8em" }}
      />
    </div>
  );
}
