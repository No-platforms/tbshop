# Telegram Shop Bot

A feature-rich Telegram bot for managing a shop with invoice generation, payment processing, and user management capabilities. Built with Node.js and MySQL.

![TBShop](https://github.com/No-platforms/tbshop/blob/main/.github/images/tbshop.png "TBShop")

## Features

### Multi-language Support
- Supports both English and Persian languages
- Users can select their preferred language
- All messages and notifications are available in both languages

### User Management
- QR code-based user registration system
- Admin can generate unique invitation links and QR codes
- Secure user registration with phone number verification
- User information storage in MySQL database
- Language preference tracking

### Invoice Management
- Admin can create invoices for users
- Support for multiple payment gateways
- Real-time payment status tracking
- Automatic payment verification
- Transaction history logging

### Payment Processing
- Integration with Zarinpal payment gateway
- Extensible payment gateway architecture
- Secure payment verification
- Automatic status updates
- Payment callback handling

### Admin Features
- Generate invitation QR codes and links
- Create and manage invoices
- Monitor payment status
- Receive payment notifications
- View transaction history

### Security
- Phone number verification
- Secure payment processing
- Admin-only protected commands
- Data validation and sanitization

## Technical Stack

- **Backend**: Node.js
- **Database**: MySQL 8.0
- **Container**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: CapRover
- **Dependencies**:
  - node-telegram-bot-api
  - Sequelize ORM
  - QRCode generator
  - Zarinpal payment gateway

## Setup Instructions

1. **Clone the Repository**
```bash
git clone <repository-url>
cd telegram-shop-bot
```

2. **Environment Configuration**
```bash
cp .env.example .env
```
Edit `.env` file with your configurations:
- `BOT_TOKEN`: Your Telegram bot token from @BotFather
- `ADMIN_USER_ID`: Your Telegram user ID
- `BOT_USERNAME`: Your bot's username
- `ZARINPAL_MERCHANT_ID`: Your Zarinpal merchant ID
- Database credentials and other settings

3. **Using Docker Compose**
```bash
docker-compose up -d
```

4. **Manual Setup (Without Docker)**
- Install Node.js 18 or higher
- Install MySQL 8.0
- Configure database
- Install dependencies:
```bash
npm install
```
- Start the bot:
```bash
npm start
```

## Bot Commands

### User Commands
- `/start` - Start the bot and register
- `/language` - Change language preference
- `/help` - Show help message
- `/pay` - View pending invoices

### Admin Commands
- `/invite` - Generate new invitation QR code and link
- `/createinvoice <amount> <description>` - Create new invoice
- `/stats` - View bot statistics
- `/broadcast` - Send message to all users

## Database Schema

### Users Table
- User information
- Registration status
- Language preference
- Invitation tracking

### Invoices Table
- Invoice details
- Payment status
- Transaction references

### Transactions Table
- Payment records
- Gateway information
- Transaction status

## Development

### Project Structure
```
src/
├── config/         # Configuration files
├── database/       # Database models and migrations
├── handlers/       # Command handlers
├── payment/        # Payment gateway integrations
├── services/       # Business logic
└── index.js        # Entry point
```

### Adding New Features
1. Create new handlers in `src/handlers/`
2. Add services in `src/services/`
3. Update language files in `src/config/languages.js`
4. Add new commands in `src/index.js`

### Adding Payment Gateways
1. Create new gateway class in `src/payment/gateways/`
2. Implement required methods
3. Register in `PaymentService`

## Deployment

### Using GitHub Actions
1. Set repository secrets:
   - `CAPROVER_SERVER`
   - `CAPROVER_APP`
   - `CAPROVER_TOKEN`
2. Push to main branch
3. GitHub Actions will automatically:
   - Build Docker image
   - Push to GitHub Container Registry
   - Deploy to CapRover

### Manual Deployment
1. Build Docker image:
```bash
docker build -t telegram-shop-bot .
```
2. Push to registry
3. Deploy on your server

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - feel free to use and modify for your own projects.

## Support

For support and questions, please open an issue in the GitHub repository.