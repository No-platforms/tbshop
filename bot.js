require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token from BotFather
const token = process.env.BOT_TOKEN;
const adminUserId = process.env.ADMIN_USER_ID;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Store subscribers
let subscribers = new Set();

// Command to start the bot
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'به ربات خوش آمدید! 👋\nبرای دریافت محتوا، لطفاً منتظر تأیید ادمین باشید.');
  
  // Notify admin about new subscriber
  if (adminUserId) {
    bot.sendMessage(adminUserId, `کاربر جدید با آیدی ${chatId} درخواست عضویت داده است.`);
  }
});

// Admin command to send content to all subscribers
bot.onText(/\/send (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  
  // Check if sender is admin
  if (chatId.toString() !== adminUserId) {
    bot.sendMessage(chatId, 'شما دسترسی به این دستور را ندارید.');
    return;
  }

  const content = match[1];
  
  // Send content to all subscribers
  subscribers.forEach((subscriberId) => {
    bot.sendMessage(subscriberId, content)
      .catch((error) => {
        console.error(`Error sending message to ${subscriberId}:`, error);
      });
  });
  
  bot.sendMessage(chatId, `پیام به ${subscribers.size} مشترک ارسال شد.`);
});

// Admin command to approve a subscriber
bot.onText(/\/approve (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  
  // Check if sender is admin
  if (chatId.toString() !== adminUserId) {
    bot.sendMessage(chatId, 'شما دسترسی به این دستور را ندارید.');
    return;
  }

  const subscriberId = match[1];
  subscribers.add(subscriberId);
  
  bot.sendMessage(subscriberId, 'درخواست شما تأیید شد. از این پس محتوا را دریافت خواهید کرد. 🎉');
  bot.sendMessage(chatId, `کاربر ${subscriberId} با موفقیت تأیید شد.`);
});

console.log('Bot is running...');