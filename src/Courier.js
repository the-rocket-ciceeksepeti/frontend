import React from "react";
import Delivery from "./Delivery";
import Notification from "./Notification";
import { NotificationManager } from "react-notifications";

let flag = false;
let flag2 = false;

class Client extends React.Component {
  state = {
    id: 1,
    name: "Vasya Anaotlevich"
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
    counter && console.log(value / counter);
    return counter && value / counter > threshold;
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
        NotificationManager.success("Client Approved", "", 500000);
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
    if (this.props.fileUploadRequested && !flag) {
      this.createNotification("info");
      flag = true;
    }
    if (this.props.clientApproved && !flag2) {
      this.createNotification("success");
      flag2 = true;
    }
    if (this.props.clientRejected && !flag2) {
      this.createNotification("error");
      flag2 = true;
    }
    return <div />;
  }
}

export default Client;
