import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styles/styles";
import Drawer from "./components/navigation/Drawer";
import Toolbar from "./components/navigation/Toolbar";

export default function App() {
  const [drawerVisibile, setDrawerVisible] = React.useState(false);
  const [title, setTitle] = React.useState("Tableau des loges");

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisibile);
  };

  const onItemClick = title => () => {
    setTitle(title);
    toggleDrawer();
  };

  return (
    <ThemeProvider theme={theme}>
      <Toolbar title={title} onMenuClick={toggleDrawer} />
      <Drawer
        open={drawerVisibile}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
      />
    </ThemeProvider>
  );
}
