import React from "react";
import Delivery from "./Delivery";
import Notification from "./Notification";

class Client extends React.Component {
  state = {
    id: 1,
    name: "Ksyusha Ihhaaaayevna",
    location: { lat: 0, lang: 0 }
  };

  delivery = new Delivery();
  notifications = [new Notification()];

  render() {
    return <div>yolo from Client</div>;
  }
}

export default Client;
