CREATE DATABASE IF NOT EXISTS notesdb;

USE notesdb;

CREATE TABLE notes (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) DEFAULT NULL,
  text VARCHAR(4000),
  archive BOOLEAN,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

DESCRIBE notes;

INSERT INTO notes VALUES(
    1, 'ONE NOTE', 'text text text',false
);