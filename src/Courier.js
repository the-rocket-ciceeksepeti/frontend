import React from "react";
import Delivery from "./Delivery";
import Notification from "./Notification";

class Client extends React.Component {
  state = {
    id: 1,
    name: "Vasya Anaotlevich"
  };

  delivery = new Delivery();
  notifications = [new Notification()];

  render() {
    return <div>yolo from Courier</div>;
  }
}

export default Client;
