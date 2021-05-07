-- Drop and recreate Message table (Example)

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  message VARCHAR(3000) NOT NULL,
  sender_id INTEGER,
  product_id INTEGER ,
  thread_master_id INTEGER ,
  time TIMESTAMP
);

DROP TABLE IF EXISTS thread_masters CASCADE;
CREATE TABLE thread_masters (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER ,
  user1_id INTEGER ,
  user2_id INTEGER ,
  is_dealt Boolean DEFAULT true
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO labber;
