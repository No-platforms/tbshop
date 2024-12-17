class Invoice {
  constructor(id, userId, amount, description, status = 'pending') {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.description = description;
    this.status = status; // pending, paid, failed
    this.createdAt = new Date();
    this.paidAt = null;
  }

  markAsPaid() {
    this.status = 'paid';
    this.paidAt = new Date();
  }
}

module.exports = Invoice;