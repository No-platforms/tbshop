const ZarinpalGateway = require('./gateways/ZarinpalGateway');

class PaymentService {
  constructor() {
    this.gateways = new Map();
    this.setupGateways();
  }

  setupGateways() {
    this.gateways.set('zarinpal', new ZarinpalGateway(process.env.ZARINPAL_MERCHANT_ID));
  }

  async createPayment(gateway, amount, callbackUrl) {
    const paymentGateway = this.gateways.get(gateway);
    if (!paymentGateway) {
      throw new Error('Payment gateway not found');
    }
    return await paymentGateway.createPayment(amount, callbackUrl);
  }

  async verifyPayment(gateway, token) {
    const paymentGateway = this.gateways.get(gateway);
    if (!paymentGateway) {
      throw new Error('Payment gateway not found');
    }
    return await paymentGateway.verifyPayment(token);
  }
}

module.exports = new PaymentService();