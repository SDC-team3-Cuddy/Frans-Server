
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS photos;

CREATE TABLE items (
  id bigserial PRIMARY KEY NOT NULL,
  itemNum INT NOT NULL,
  POSNum INT NOT NULL,
  avgScore INT NOT NULL,
  reviewCount INT NOT NULL,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE photos (
  id bigserial PRIMARY KEY NOT NULL,
  itemID INT NOT NULL,
  photoDescription VARCHAR(255) NOT NULL,
  srcURL VARCHAR(255) NOT NULL,
  FOREIGN KEY (itemID) REFERENCES items(id)
);