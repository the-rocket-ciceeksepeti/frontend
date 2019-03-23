import React from "react";
import Delivery from "./Delivery";
import Notification from "./Notification";
import { NotificationManager } from "react-notifications";
import image from "../src/images/WhatsApp Image 2019-03-23 at 9.50.11 AM (1).jpeg";
import image1 from "../src/images/WhatsApp Image 2019-03-23 at 9.50.11 AM (2).jpeg";
import image2 from "../src/images/WhatsApp Image 2019-03-23 at 9.50.11 AM (3).jpeg";
import image3 from "../src/images/WhatsApp Image 2019-03-23 at 9.50.11 AM.jpeg";
import image4 from "../src/images/WhatsApp Image 2019-03-23 at 9.50.12 AM (1).jpeg";
import image5 from "../src/images/WhatsApp Image 2019-03-23 at 9.50.12 AM (2).jpeg";
import image6 from "../src/images/WhatsApp Image 2019-03-23 at 9.50.12 AM.jpeg";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { MainListItems } from "./listItems";
import SimpleLineChart from "./SimpleLineChart";
import SimpleTable from "./SimpleTable";

import "./App.css";

let flag = false;
let flag2 = false;
let flag3 = false;
const drawerWidth = 240;
let photos = null;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Client extends React.Component {
  state = {
    id: 1,
    name: "Ksyusha Ihhaaaayevna",
    location: { lat: 0, lang: 0 }
  };

  delivery = new Delivery();
  notifications = [new Notification()];

  mightBeDamaged = data => {
    const threshold = 20;
    let value = 0;
    let counter = 0;
    for (let i = data.length - 1; i >= Math.max(0, data.length - 10); i--) {
      value += data[i].temperature;
      counter++;
    }
    return counter && value / counter > threshold;
  };

  createNotification = type => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success(
          this.props.photoUploaded
            ? "The courier sent the photo"
            : "The request was sent to courier",
          "Success"
        );
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          500000
        );
        break;
      case "error":
        NotificationManager.error(
          "Your delivery might be potentially damaged",
          "OPEN THE PACKAGE",
          500000,
          () => {
            this.props.onFileUploadRequested();
            this.createNotification("success");
          }
        );
        break;
      default:
        break;
    }
  };

  render() {
    if (this.mightBeDamaged(this.props.data) && !flag) {
      this.createNotification("error");
      flag = true;
    }
    if (this.props.photoUploaded && !flag2) {
      this.createNotification("success");
      flag2 = true;
      console.log(this.props.photos);
      /*photos = this.props.photos.map(file => (
        <img alt="Preview" key={file.name} src={"./images/" + file.name} />
      ));*/
      const classes = this.props.classes;
      photos = (
        <div>
          <Typography variant="h4" gutterBottom component="h2">
            Photos
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <img
              style={{ padding: 10 }}
              src={image}
              alt={"check the pic"}
              width={300}
              height={200}
            />
            <img
              style={{ padding: 10 }}
              src={image1}
              alt={"check the pic"}
              width={300}
              height={200}
            />
            <img
              style={{ padding: 10 }}
              src={image2}
              alt={"check the pic"}
              width={300}
              height={200}
            />
            <img
              style={{ padding: 10 }}
              src={image3}
              alt={"check the pic"}
              width={300}
              height={200}
            />
            <img
              style={{ padding: 10 }}
              src={image4}
              alt={"check the pic"}
              width={300}
              height={200}
            />
            <img
              style={{ padding: 10 }}
              src={image5}
              alt={"check the pic"}
              width={300}
              height={200}
            />
            <img
              style={{ padding: 10 }}
              src={image6}
              alt={"check the pic"}
              width={300}
              height={200}
            />
          </Typography>
        </div>
      );
    }

    return <div>{photos}</div>;
  }
}

export default withStyles(styles)(Client);
