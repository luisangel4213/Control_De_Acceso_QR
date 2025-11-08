-- Esquema inicial para MySQL

CREATE DATABASE IF NOT EXISTS qr_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE qr_app;

-- Usuarios del sistema (administradores, guardas, aprendices, invitados)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(150) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  role ENUM('admin','guard','apprentice','guest') NOT NULL DEFAULT 'apprentice',
  password_hash VARCHAR(255) NOT NULL,
  qr_payload TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Visitas / registros de ingreso y salida
CREATE TABLE IF NOT EXISTS visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('in','out') NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  note VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de items de ejemplo (mantener para retrocompatibilidad)
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO items (title, description) VALUES
("Example item 1", "Descripción de ejemplo 1"),
("Example item 2", "Descripción de ejemplo 2");

