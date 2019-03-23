import React from "react";
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
import Courier from "./Courier";
import Client from "./Client";
import { DropzoneDialog } from "material-ui-dropzone";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import MapContainer from "./MapContainer";

const drawerWidth = 240;

let initialTimestamp = 0;

const styles = theme => ({
  root2: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: 20,
    alignItems: "center",
    display: "flex",
    backgroundColor: "orange"
  },
  root: {
    display: "flex",
    backgroundColor: "#cbcdcc",
    height: "100%"
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
    overflow: "scroll"
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

class Dashboard extends React.Component {
  state = {
    open: true,
    onDashboard: true,
    onClient: false,
    onCourier: false,
    photoUpload: false,
    photos: [],
    data: [],
    fileUploadRequested: false,
    photoUploaded: false,
    clientApproved: false,
    clientRejected: false,
    initialDate: new Date(),
    date: new Date(),
    status: false
  };

  async tick() {
    try {
      const res = await axios("http://cicek-sepeti.herokuapp.com/sensor");
      if (initialTimestamp === 0) initialTimestamp = res.data.timestamp;
      this.setState(prevState => ({
        data: [...prevState.data, res.data],
        date: new Date()
      }));
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onDashboard = () => {
    this.setState({ onDashboard: true, onClient: false, onCourier: false });
  };

  onClient = () => {
    this.setState({ onDashboard: false, onClient: true, onCourier: false });
  };

  onCourier = () => {
    this.setState({ onDashboard: false, onClient: false, onCourier: true });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onFileUploadRequested = () => {
    this.setState({ fileUploadRequested: true });
  };

  onClientApproved = () => {
    this.setState({ clientApproved: true });
  };

  onClientRejected = () => {
    this.setState({ clientRejected: true });
  };

  handleSave = files => {
    //Saving files to state for further use and closing Modal.
    this.setState({
      photos: files,
      photoUpload: false,
      photoUploaded: true
    });
  };
  handleClose = () => {
    this.setState({
      photoUpload: false
    });
  };

  onDelivered = () => {
    this.setState({
      status: true
    });
    clearInterval(this.interval);
    this.createNotification("success");
  };

  createNotification = type => {
    switch (type) {
      case "info":
        NotificationManager.info(
          "Client Requested to Open and Check the Package",
          "",
          500000
        );
        break;
      case "success":
        NotificationManager.success("Package Delivered!", "", 500000);
        break;
      case "warning":
        NotificationManager.warning(
          "Client Requested to Open and Check the Package",
          "",
          500000
        );
        break;
      case "error":
        NotificationManager.error("Client Rejected", "", 500000);
        break;
      default:
        break;
    }
  };

  render() {
    const { classes } = this.props;
    const { onClient, onDashboard, onCourier, photoUpload } = this.state;

    let content = null;
    let title = "Dashboard";
    const data =
      this.state.data.length &&
      this.state.data.slice(Math.max(this.state.data.length - 10, 1));

    if (data.length && data[data.length - 1].timestamp - initialTimestamp > 123)
      data[data.length - 1].timestamp -= initialTimestamp;

    let probOfDamage = 0;
    let tempMean = 0;
    let humMean = 0;
    try {
      for (let i = 0; i < data.length; i++) {
        tempMean += data[i].temperature;
        humMean += data[i].humidity;
      }
      tempMean /= data.length;
      humMean /= data.length;
      probOfDamage = (tempMean + humMean) / 5;
    } catch (e) {}

    if (onClient) {
      content = (
        <div className={classes.appBarSpacer}>
          <Client
            onFileUploadRequested={this.onFileUploadRequested}
            data={this.state.data}
            photoUploaded={this.state.photoUploaded}
            photos={this.state.photos}
          />
        </div>
      );
      title = "Client";
    } else if (onCourier) {
      content = (
        <div className={classes.appBarSpacer}>
          <Courier
            fileUploadRequested={this.state.fileUploadRequested}
            data={this.state.data}
            clientApproved={this.state.clientApproved}
            clientRejected={this.state.clientRejected}
          />
        </div>
      );
      title = "Courier";
    } else {
      title = "Dashboard";
    }

    const buttons = onClient ? (
      <div />
    ) : (
      <IconButton
        color="inherit"
        onClick={() =>
          this.setState({
            photoUpload: true
          })
        }
      >
        Upload
      </IconButton>
    );

    const timeDiff = this.state.date - this.state.initialDate;
    const mins = parseInt(timeDiff / 60000) % 24;
    const secs = parseInt(timeDiff / 1000) % 60;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {title}
            </Typography>
            {this.state.onClient && (
              <IconButton color="inherit" onClick={this.onClientApproved}>
                Approve
              </IconButton>
            )}
            {this.state.onClient && (
              <IconButton color="inherit" onClick={this.onClientRejected}>
                Reject
              </IconButton>
            )}
            {this.state.onCourier && (
              <IconButton
                color="inherit"
                onClick={() =>
                  this.setState({
                    photoUpload: true
                  })
                }
              >
                Upload
              </IconButton>
            )}
            <DropzoneDialog
              open={photoUpload}
              onSave={this.handleSave}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              showPreviews={true}
              maxFileSize={5000000}
              onClose={this.handleClose}
            />
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            Collapse
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainListItems
              onDashboard={this.onDashboard}
              onClient={this.onClient}
              onCourier={this.onCourier}
            />
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Paper className={classes.root2} elevation={1}>
            <Typography style={{ marginRight: 5 }} variant="h6" component="h4">
              Probability of Damage
            </Typography>
            <Typography style={{ marginRight: 50 }} variant="h5" component="h3">
              {(probOfDamage || 0) + "%"}
            </Typography>
            <Typography style={{ marginRight: 5 }} variant="h6" component="h4">
              Delivery Time
            </Typography>
            <Typography style={{ marginRight: 50 }} variant="h5" component="h3">
              {mins + ":" + secs + "s"}
            </Typography>
            <Typography style={{ marginRight: 5 }} variant="h6" component="h4">
              Status
            </Typography>
            <Typography style={{ marginRight: 50 }} variant="h5" component="h3">
              {this.state.status ? "Delivered" : "On the way"}
            </Typography>
          </Paper>
          <Typography variant="h4" gutterBottom component="h2">
            Temperature / Humidity
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart data={data} />
          </Typography>
          {content}
          <Typography
            style={{ marginTop: 20 }}
            variant="h4"
            gutterBottom
            component="h2"
          >
            Track Package
          </Typography>
          <Typography component="div">
            <MapContainer
              data={this.state.data}
              style={{ margin: 20, height: 100 }}
              onDelivered={this.onDelivered}
              status={this.state.status}
            />
          </Typography>
        </main>
        <NotificationContainer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
