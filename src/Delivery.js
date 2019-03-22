class Delivery {
  constructor(
    id,
    status,
    location,
    startTime,
    endTime,
    photos,
    courierId,
    clientId
  ) {
    this.id = id;
    this.status = status;
    this.location = location;
    this.startTime = startTime;
    this.endTime = endTime;
    this.photos = photos;
    this.courierId = courierId;
    this.clientId = clientId;
  }
}

export default Delivery;
