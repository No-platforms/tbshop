const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');
const messageService = require('./messageService');
const invoiceService = require('./invoiceService');
const paymentService = require('../payment/PaymentService');

class BotService {
  constructor() {
    this.bot = new TelegramBot(config.BOT_TOKEN, { polling: true });
    this.initializeCommands();
  }

  initializeCommands() {
    // ... existing commands ...
    this.bot.onText(/\/createinvoice (\d+) (.+)/, this.handleCreateInvoice.bind(this));
    this.bot.on('callback_query', this.handleCallbackQuery.bind(this));
  }

  async handleCreateInvoice(msg, match) {
    const chatId = msg.chat.id;
    
    if (chatId.toString() !== config.ADMIN_USER_ID) {
      await this.bot.sendMessage(
        chatId,
        messageService.getMessage('noPermission', chatId)
      );
      return;
    }

    const [, amount, description] = match;
    const userId = msg.reply_to_message?.from.id;
    
    if (!userId) {
      await this.bot.sendMessage(chatId, 'Please reply to a user message to create an invoice.');
      return;
    }

    const invoice = invoiceService.createInvoice(userId, parseInt(amount), description);
    
    const message = messageService.getMessage('invoice.new', userId)
      .replace('%amount%', amount)
      .replace('%description%', description);

    await this.bot.sendMessage(userId, message, {
      reply_markup: {
        inline_keyboard: [[{
          text: messageService.getMessage('invoice.payButton', userId),
          callback_data: `pay_${invoice.id}`
        }]]
      }
    });
  }

  async handleCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const userId = callbackQuery.from.id;

    if (action.startsWith('pay_')) {
      const invoiceId = parseInt(action.split('_')[1]);
      const invoice = invoiceService.getInvoice(invoiceId);

      if (!invoice) {
        await this.bot.answerCallbackQuery(callbackQuery.id, {
          text: messageService.getMessage('invoice.notFound', userId)
        });
        return;
      }

      if (invoice.status === 'paid') {
        await this.bot.answerCallbackQuery(callbackQuery.id, {
          text: messageService.getMessage('invoice.alreadyPaid', userId)
        });
        return;
      }

      try {
        const callbackUrl = `${config.BASE_URL}/callback?invoice_id=${invoice.id}`;
        const payment = await paymentService.createPayment('zarinpal', invoice.amount, callbackUrl);
        
        await this.bot.answerCallbackQuery(callbackQuery.id, {
          url: payment.paymentUrl
        });
      } catch (error) {
        console.error('Payment creation error:', error);
        await this.bot.answerCallbackQuery(callbackQuery.id, {
          text: messageService.getMessage('invoice.failed', userId)
        });
      }
    }
  }

  async handlePaymentCallback(invoiceId, status, refId) {
    const invoice = invoiceService.getInvoice(invoiceId);
    if (!invoice || invoice.status === 'paid') return;

    if (status === 'success') {
      invoice.markAsPaid();
      
      // Notify user
      const successMessage = messageService.getMessage('invoice.success', invoice.userId)
        .replace('%refId%', refId);
      await this.bot.sendMessage(invoice.userId, successMessage);

      // Notify admin
      const adminMessage = messageService.getMessage('invoice.adminNotification', config.ADMIN_USER_ID)
        .replace('%userId%', invoice.userId)
        .replace('%amount%', invoice.amount)
        .replace('%invoiceId%', invoice.id);
      await this.bot.sendMessage(config.ADMIN_USER_ID, adminMessage);
    }
  }
}

module.exports = new BotService();