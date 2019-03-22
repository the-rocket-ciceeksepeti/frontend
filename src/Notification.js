class Notification {
  constructor(clientId, courierId, type, photo = null) {
    this.clientId = clientId;
    this.courierId = courierId;
    this.type = type;
    this.photo = photo;
  }
}

export default Notification;
