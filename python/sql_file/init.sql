DROP TABLE IF EXISTS critiques;
DROP TABLE IF EXISTS attraction;

CREATE TABLE attraction (
    attraction_id int auto_increment,
    primary key(attraction_id),
    nom varchar(255) not null,
    description varchar(255) not null,
    difficulte int,
    visible bool default true
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    users_id int auto_increment,
    primary key(users_id),
    name varchar(255) not null,
    password varchar(255) not null
);

    
CREATE TABLE critiques (
    critiques_id INT AUTO_INCREMENT,
    attraction_id INT,
    auteur VARCHAR(255),
    texte TEXT NOT NULL,
    anonyme BOOLEAN DEFAULT TRUE,
    note INT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (critiques_id),
    CONSTRAINT fk_attraction FOREIGN KEY (attraction_id) REFERENCES attraction(attraction_id) ON DELETE CASCADE
);

