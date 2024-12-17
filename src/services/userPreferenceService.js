class UserPreferenceService {
  constructor() {
    this.userPreferences = new Map();
  }

  setLanguage(userId, language) {
    this.userPreferences.set(userId, { language });
  }

  getLanguage(userId) {
    return this.userPreferences.get(userId)?.language || 'en';
  }
}

module.exports = new UserPreferenceService();