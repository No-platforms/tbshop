const User = require('../database/models/User');

class UserService {
  async createUser(telegramId, invitedById = null) {
    return await User.create({
      telegramId,
      invitedBy: invitedById
    });
  }

  async completeRegistration(telegramId, firstName, lastName, phoneNumber) {
    const user = await User.findOne({ where: { telegramId } });
    if (!user) throw new Error('User not found');

    await user.update({
      firstName,
      lastName,
      phoneNumber,
      isRegistered: true
    });

    return user;
  }

  async setLanguage(telegramId, language) {
    const user = await User.findOne({ where: { telegramId } });
    if (!user) throw new Error('User not found');

    await user.update({ language });
    return user;
  }

  async isRegistered(telegramId) {
    const user = await User.findOne({ where: { telegramId } });
    return user ? user.isRegistered : false;
  }
}

module.exports = new UserService();