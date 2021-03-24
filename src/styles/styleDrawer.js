import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

const StyleDrawer = theme => ({
  root: {
    flexGrow: 1
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
});

export default withStyles(StyleDrawer, { name: "MyDrawer" })(Drawer);
