import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
//import { frFR } from "@material-ui/core/locale";
import { frFR } from "@material-ui/data-grid";

export const useStyles = makeStyles(theme => ({
  root: {
    margin: "15px auto",
    padding: "15px 15px",
    maxWidth: "1500px",
    minWidth: "400px"
  },
  formControl: {
    margin: theme.spacing(1)
  },
  paper: {
    margin: theme.spacing(3) + "px 0px",
    padding: "10px",
    color: theme.palette.text.secondary
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: 240
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

export const theme = createMuiTheme({
  frFR,
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "#fff",
      default: "#e6e7e8"
    },
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  typography: {
    h4: { color: "#303f9f", textAlign: "center" },
    h6: { color: "#7986cb", padding: "10px 0px 5px 0px" },
    subtitle1 : { color: "#ff0000", padding: "10px 0px 5px 0px" },
  },
  overrides: {
    MuiInputBase: {
      root: { fontSize: "0.9rem" }
    },
    MuiBadge: { anchorOriginTopRightRectangle: { top: 7, right: 7 } }
  }
});
