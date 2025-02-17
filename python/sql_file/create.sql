INSERT INTO attraction (nom, description, difficulte, visible) VALUES ('Silver Star', 'Montagne russe', 3, 1);
INSERT INTO attraction (nom, description, difficulte, visible) VALUES ('Montagne 8', 'Montagne russe', 4, 1);

INSERT INTO users (name, password) VALUES ('toto', 'toto');

INSERT INTO critiques (attraction_id, auteur, texte, note, anonyme) VALUES (1, 'Jean Dupont', 'Super attraction!',5, FALSE);
INSERT INTO critiques (attraction_id, auteur, texte, note, anonyme) VALUES (2, NULL, 'Vue magnifique.',4, TRUE);