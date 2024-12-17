class PaymentGateway {
  async createPayment(amount, callbackUrl) {
    throw new Error('Method not implemented');
  }

  async verifyPayment(token) {
    throw new Error('Method not implemented');
  }
}

module.exports = PaymentGateway;