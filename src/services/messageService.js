const languages = require('../config/languages');
const userPreferenceService = require('./userPreferenceService');

class MessageService {
  getMessage(key, userId, ...params) {
    const language = userPreferenceService.getLanguage(userId);
    const message = languages[language][key];
    
    return typeof message === 'function' ? message(...params) : message;
  }
}

module.exports = new MessageService();