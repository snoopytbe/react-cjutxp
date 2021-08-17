import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styles/styles";
import Drawer from "./components/navigation/Drawer";
import Toolbar from "./components/navigation/Toolbar";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import {
  withAuthenticator,
  AmplifySignOut,
  graphqlOperation,
} from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

const App = () => {
  const [drawerVisibile, setDrawerVisible] = React.useState(false);
  const [title, setTitle] = React.useState("Tableau des loges");

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisibile);
  };

  const onItemClick = (title) => () => {
    setTitle(title);
    toggleDrawer();
  };

  return (
    <div>
      <AmplifySignOut />
      <ThemeProvider theme={theme}>
        <Toolbar title={title} onMenuClick={toggleDrawer} />
        <Drawer
          open={drawerVisibile}
          onClose={toggleDrawer}
          onItemClick={onItemClick}
        />
      </ThemeProvider>
    </div>
  );
};

export default withAuthenticator(App);
