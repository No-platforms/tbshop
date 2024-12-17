const userService = require('../services/userService');
const inviteService = require('../services/inviteService');
const messageService = require('../services/messageService');

async function handleStart(bot, msg, match) {
  const chatId = msg.chat.id;
  const inviteCode = match[1]; // Extract invite code from /start command

  try {
    // Check if user exists and is registered
    const isRegistered = await userService.isRegistered(chatId);
    
    if (isRegistered) {
      await bot.sendMessage(
        chatId,
        messageService.getMessage('alreadyRegistered', chatId)
      );
      return;
    }

    // Validate invite code if provided
    let inviterId = null;
    if (inviteCode) {
      inviterId = await inviteService.validateInvite(inviteCode);
      if (!inviterId) {
        await bot.sendMessage(
          chatId,
          messageService.getMessage('invalidInvite', chatId)
        );
        return;
      }
    }

    // Create new user
    await userService.createUser(chatId, inviterId);

    // Request contact information
    await bot.sendMessage(
      chatId,
      messageService.getMessage('requestContact', chatId),
      {
        reply_markup: {
          keyboard: [[{
            text: messageService.getMessage('shareContact', chatId),
            request_contact: true
          }]],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      }
    );
  } catch (error) {
    console.error('Start handler error:', error);
    await bot.sendMessage(
      chatId,
      messageService.getMessage('error', chatId)
    );
  }
}

module.exports = handleStart;