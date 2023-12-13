CREATE DATABASE IF NOT EXISTS hub_db;
CREATE USER IF NOT EXISTS 'hub_dev'@'localhost' IDENTIFIED BY 'hub_dev12345';
GRANT ALL PRIVILEGES ON `hub_db`.* TO 'hub_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'hub_dev'@'localhost';
FLUSH PRIVILEGES;
