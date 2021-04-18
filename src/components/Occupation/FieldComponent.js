import React from "react";
import { Button, Typography } from "@material-ui/core";
import TableOccupation from "./TableOccupation";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

export default function FieldComponent(props) {
  const { fieldArrays, field, onChangeHandler, onClickAdd, control } = props;

  return (
    <>
      <Typography variant="h6">{fieldArrays[field].title}</Typography>
      {fieldArrays[field].fields.map((item, index) => {
        return (
          <React.Fragment key={item.id}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TableOccupation
                        field={field}
                        oneLogeBooking={fieldArrays[field].fields}
                        removeHandler={fieldArrays[field].remove}
                        limit={fieldArrays[field].limit}
                        highlight={fieldArrays[field].highlight}
                        bookingIndex={index}
                        control={control}
                        onChangeHandler={onChangeHandler}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </React.Fragment>
        );
      })}
      <Button
        variant="contained"
        color="primary"
        onClick={() => onClickAdd(field)}
      >
        Ajouter
      </Button>
    </>
  );
}
