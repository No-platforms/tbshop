const Invoice = require('../models/Invoice');

class InvoiceService {
  constructor() {
    this.invoices = new Map();
    this.lastId = 0;
  }

  createInvoice(userId, amount, description) {
    const id = ++this.lastId;
    const invoice = new Invoice(id, userId, amount, description);
    this.invoices.set(id, invoice);
    return invoice;
  }

  getInvoice(id) {
    return this.invoices.get(id);
  }

  markAsPaid(id) {
    const invoice = this.getInvoice(id);
    if (invoice) {
      invoice.markAsPaid();
      return true;
    }
    return false;
  }
}

module.exports = new InvoiceService();