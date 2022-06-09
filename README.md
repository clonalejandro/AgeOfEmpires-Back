# AgeOfEmpires-Back
## Install
### Project instalation guide
Run the following commands:
- `yarn` for install the project dependencies 
- `yarn start` for start the backend project

### Creating a .env file
I left this .env file as an example
```.env
MYSQL_HOST='localhost'
MYSQL_DATABASE='aoe'
MYSQL_USER='root'
MYSQL_PASSWORD='root'
SESSION='keyboard cat'
JWT_SECRET='cats'
```

### Pushing the SQL Dump into database
You can import sql dump with the following command: `mysql -u username -p password db_name < file.sql`
```sql
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
```

### The testing user credentials
- username: test
- password: test

## Backend Documentation
* [Postman](https://documenter.getpostman.com/view/7840894/Uz5GmaoK)
