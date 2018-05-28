USE foodAPI;
INSERT INTO Icono (name, pictureStroke, pictureFill) VALUES ("Boulangerie", "", "sandwich");
INSERT INTO Icono (name, pictureStroke, pictureFill) VALUES ("Big Burger", "", "burger");
INSERT INTO Icono (name, pictureStroke, pictureFill) VALUES ("Japonais", "", "rice");
INSERT INTO Icono (name, pictureStroke, pictureFill) VALUES ("Healthy", "", "salade");

INSERT INTO Type (name, iconName, icono_id) VALUES ("Boulangerie", "baker", 1);
INSERT INTO Type (name, iconName, icono_id) VALUES ("Burger", "burger", 2);
INSERT INTO Type (name, iconName, icono_id) VALUES ("Japonais", "jap", 3);
INSERT INTO Type (name, iconName, icono_id) VALUES ("Healthy", "salad", 4);