-- Create database if not exists
CREATE DATABASE IF NOT EXISTS ${DB_NAME};
USE ${DB_NAME};

-- Enable UTF-8 support
ALTER DATABASE ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  telegramId VARCHAR(255) UNIQUE NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  phoneNumber VARCHAR(255),
  language VARCHAR(10) DEFAULT 'fa',
  inviteCode VARCHAR(255) UNIQUE,
  invitedBy INT,
  isRegistered BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (invitedBy) REFERENCES Users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Invoices table
CREATE TABLE IF NOT EXISTS Invoices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  amount INT NOT NULL,
  description TEXT,
  status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  paymentGateway VARCHAR(255),
  paymentToken VARCHAR(255),
  referenceId VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Transactions table
CREATE TABLE IF NOT EXISTS Transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  invoiceId INT NOT NULL,
  amount INT NOT NULL,
  status ENUM('success', 'failed') DEFAULT 'success',
  gateway VARCHAR(255),
  referenceId VARCHAR(255),
  rawResponse TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (invoiceId) REFERENCES Invoices(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;