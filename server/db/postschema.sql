DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id bigserial PRIMARY KEY NOT NULL,
  itemNum INT NOT NULL,
  POSNum INT NOT NULL,
  avgScore INT NOT NULL,
  reviewCount INT NOT NULL,
  photos VARCHAR(max) NOT NUll,
  title VARCHAR(255) NOT NULL
);

-- CREATE TABLE photos (
--   id bigserial PRIMARY KEY NOT NULL,
--   itemID INT NOT NULL,
--   photoDescription VARCHAR(255) NOT NULL,
--   srcURL VARCHAR(255) NOT NULL,
--   FOREIGN KEY (itemID) REFERENCES items(id)
-- );