CREATE DATABASE IF NOT EXISTS buildmart CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE buildmart;
CREATE TABLE IF NOT EXISTS requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  request_type ENUM('material','vehicle','equipment') NOT NULL,
  item_name VARCHAR(500) NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(25) NOT NULL,
  address TEXT NOT NULL,
  preferred_date DATE NULL,
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  rental_period VARCHAR(100) NULL,
  cart_json JSON NULL,
  status ENUM('Pending','Processing','Dispatched','Delivered','Cancelled') NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS admins (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
