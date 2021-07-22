import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Calendrier from "../Calendrier/Calendrier";
import Occupation from "../Occupation/Occupation";
import TableauSynthese from "../Synthese/TableauSynthese";
import { BrowserRouter, Route, Link, Switch, useHistory } from "react-router-dom";
import { initialValuesComplete } from "../../data/initialValues";
import { useStyles } from "../../styles/styles";

export default function MyDrawer({ open, onClose, onItemClick }) {
  const classes = useStyles();
  var history = useHistory();

  // permet de stocker, partager et éditer les données des loges entre les pages
  const [logeBooking, setLogeBooking] = React.useState(initialValuesComplete);

  return (
    <BrowserRouter history={history}>
      <Drawer
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {/* Liste des menus */}
        <List>
          <ListItem button component={Link} to="/" onClick={onItemClick("TableauSynthese")}>
            <ListItemText>Tableau des loges</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/Calendrier" onClick={onItemClick("Calendrier")}>
            <ListItemText>Calendrier</ListItemText>
          </ListItem>
        </List>
      </Drawer>

      {/* Effet des menus */}
      <Switch>
        <Route exact path="/" render={() => <TableauSynthese logeBooking={logeBooking} />} />
        <Route
          path="/Occupation/:id"
          render={(props) => <Occupation logeBooking={logeBooking} setLogeBooking={setLogeBooking} id={props.match.params.id} />}
        />
        <Route path="/Calendrier" render={() => <Calendrier logeBooking={logeBooking} setLogeBooking={setLogeBooking} />} />
      </Switch>
    </BrowserRouter>
  );
}
