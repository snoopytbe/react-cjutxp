import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "../../styles/styles";
import { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";

async function getUserInfo() {
  const user = await Auth.currentAuthenticatedUser();
  console.log("attributes:", user.attributes);
}

// Toolbar
export default function MyToolbar({ title, onMenuClick }) {
  const classes = useStyles();
  getUserInfo();

  return (
    <>
      <AppBar className={classes.aboveDrawer}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            {title}
          </Typography>
          <AmplifySignOut buttonText="Déconnexion"></AmplifySignOut>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
}
