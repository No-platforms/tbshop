class SubscriberService {
  constructor() {
    this.subscribers = new Set();
  }

  addSubscriber(subscriberId) {
    this.subscribers.add(subscriberId);
  }

  removeSubscriber(subscriberId) {
    this.subscribers.delete(subscriberId);
  }

  getAllSubscribers() {
    return this.subscribers;
  }
}

module.exports = new SubscriberService();