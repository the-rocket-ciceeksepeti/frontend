class Notification {
  constructor(clientId, courierId, type, photo = null, read = false) {
    this.clientId = clientId;
    this.courierId = courierId;
    this.type = type;
    this.photo = photo;
    this.read = read;
  }
}

export default Notification;
