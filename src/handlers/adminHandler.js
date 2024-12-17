const inviteService = require('../services/inviteService');
const messageService = require('../services/messageService');

async function handleGenerateInvite(bot, msg) {
  const chatId = msg.chat.id;

  if (chatId.toString() !== process.env.ADMIN_USER_ID) {
    await bot.sendMessage(
      chatId,
      messageService.getMessage('noPermission', chatId)
    );
    return;
  }

  try {
    const { inviteLink, qrCode } = await inviteService.generateInviteLink(chatId);

    // Send QR code
    await bot.sendPhoto(chatId, Buffer.from(qrCode.split(',')[1], 'base64'), {
      caption: messageService.getMessage('inviteLinkGenerated', chatId)
    });

    // Send invite link
    await bot.sendMessage(chatId, inviteLink);
  } catch (error) {
    console.error('Generate invite error:', error);
    await bot.sendMessage(
      chatId,
      messageService.getMessage('error', chatId)
    );
  }
}

module.exports = {
  handleGenerateInvite
};