CREATE DATABASE aoe;
USE aoe;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL,
    password VARCHAR(255) NOT NULL,
    primary key (id)
);

CREATE TABLE favourites (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    civilization_id INT NOT NULL,
    primary key (id)
);

INSERT INTO users (username, password) VALUES ('test', '$2b$10$yLi60RzTa6QGzLVhXHFDeexU2bHTHtbODZ1RBOPyV3RrBcNoJOQUK');