const { nanoid } = require('nanoid');
const QRCode = require('qrcode');
const User = require('../database/models/User');

class InviteService {
  async generateInviteLink(adminId) {
    const inviteCode = nanoid(10);
    const admin = await User.findOne({ where: { telegramId: adminId } });
    
    if (!admin) {
      throw new Error('Admin not found');
    }

    await User.update(
      { inviteCode },
      { where: { id: admin.id } }
    );

    const inviteLink = `https://t.me/${process.env.BOT_USERNAME}?start=${inviteCode}`;
    const qrCode = await QRCode.toDataURL(inviteLink);

    return { inviteLink, qrCode, inviteCode };
  }

  async validateInvite(inviteCode) {
    const inviter = await User.findOne({ where: { inviteCode } });
    return inviter ? inviter.id : null;
  }
}

module.exports = new InviteService();