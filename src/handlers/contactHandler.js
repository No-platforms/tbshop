const userService = require('../services/userService');
const messageService = require('../services/messageService');

async function handleContact(bot, msg) {
  const chatId = msg.chat.id;
  const contact = msg.contact;

  try {
    if (contact.user_id !== chatId) {
      await bot.sendMessage(
        chatId,
        messageService.getMessage('invalidContact', chatId)
      );
      return;
    }

    await userService.completeRegistration(
      chatId,
      msg.from.first_name,
      msg.from.last_name || '',
      contact.phone_number
    );

    // Remove keyboard and show welcome message
    await bot.sendMessage(
      chatId,
      messageService.getMessage('registrationComplete', chatId),
      {
        reply_markup: {
          remove_keyboard: true
        }
      }
    );
  } catch (error) {
    console.error('Contact handler error:', error);
    await bot.sendMessage(
      chatId,
      messageService.getMessage('error', chatId)
    );
  }
}

module.exports = handleContact;