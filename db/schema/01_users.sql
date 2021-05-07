-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  phone VARCHAR(255),
  user_type_id INTEGER ,
  address_id INTEGER
);

DROP TABLE IF EXISTS user_type CASCADE;
CREATE TABLE user_type (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER,
  user_type_name TEXT
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO labber;
