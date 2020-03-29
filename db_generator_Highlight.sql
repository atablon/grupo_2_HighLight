DROP DATABASE IF EXISTS highlight_db;
CREATE DATABASE highlight_db;
USE highlight_db;


CREATE TABLE users(
	id int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    user_type varchar(30) NOT NULL,
    user_password varchar(255) NOT NULL,
    profile_picture VARCHAR(255) NOT NULL DEFAULT 'no_image.png',
    createdAt TIMESTAMP NULL DEFAULT NULL,
    updatedAt TIMESTAMP NULL DEFAULT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE sign_techs(
id int(5) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
sign_tech varchar(50) NOT NULL,
createdAt TIMESTAMP NULL DEFAULT NULL,
updatedAt TIMESTAMP NULL DEFAULT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE sign_types(
id int(5) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
sign_type varchar(100) NOT NULL,
createdAt TIMESTAMP NULL DEFAULT NULL,
updatedAt TIMESTAMP NULL DEFAULT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE signs (
  id int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  address varchar(255) NOT NULL,
  street_number int(10) unsigned NOT NULL,
  street_1 varchar(255) NOT NULL,
  street_2 varchar(255) NOT NULL,
  city	varchar(255) NOT NULL,
  state	varchar(255) NOT NULL,
  reference varchar(255) NOT NULL,
  star int(10) unsigned NOT NULL,
  picture_filename char(255) NOT NULL,
  tech_id int(5) UNSIGNED NOT NULL,
  type_id int(5) UNSIGNED NOT NULL,
  heigth decimal(10) NOT NULL,
  width decimal(10) NOT NULL,
  monthly_cost decimal(10) NOT NULL,
  user_id int(10) UNSIGNED NOT NULL,
  createdAt timestamp NULL DEFAULT NULL,
  updatedAt timestamp NULL DEFAULT NULL,
  FOREIGN KEY (tech_id) REFERENCES sign_techs (id),
  FOREIGN KEY (type_id) REFERENCES sign_types (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE orders(
id int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id int(10) unsigned NOT NULL,
total_cost decimal(10),
FOREIGN KEY (user_id) REFERENCES users (id)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE signs_orders(
id int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
order_id int(10) unsigned NOT NULL,
sign_id int(10) unsigned NOT NULL,
FOREIGN KEY (order_id) REFERENCES orders (id),
FOREIGN KEY (sign_id) REFERENCES signs (id)
)DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO  `sign_techs` VALUES
(DEFAULT, 'Cartel Led' , NULL, NULL ),
(DEFAULT, 'Cartel de Pantalla Led' , NULL, NULL ),
(DEFAULT, 'Cartel de Ploteo' , NULL, NULL );


INSERT INTO  `sign_types` VALUES
(DEFAULT, 'Cartel de Kioscos, Diarios y Florerias' , NULL, NULL ),
(DEFAULT, 'Cartel de Vallas' , NULL, NULL ),
(DEFAULT, 'Cartel Frontlights y Backlights' , NULL, NULL ),
(DEFAULT, 'Cartel de Medianera' , NULL, NULL );


-- DATOS DE PRUEBA DE USUARIOS --
INSERT INTO  `users` VALUES
(DEFAULT, 'Ezequiel Cortez' ,  'ecortez@gmail.com' ,  'Publicar' ,  '$2b$10$mAhccrBqSZ5ehkKmePoCWOVzrjd8NLn5jJblMrNHlDhswf/NFqQSq' , '1-eze.jpg', NULL, NULL ),
(DEFAULT, 'Javier Herrera' ,  'j.herrera@gmail.com' ,  'Publicar' ,  '$2b$10$9YmJ0MapJZrV5arg.aDmYOENl3c6hUmCc5DUqDS1.QFzcnL0x/8jW' , '2-javi.jpg', NULL, NULL ),
(DEFAULT, 'Patricia Martins' ,  'pmartins@gmail.com' ,  'Publicar' ,  '$2b$10$Lw3vByh8YljefFMLaz4gVeFDK5r22VJzalEZE9w7P24iNxZvbYa/m' , '3-pato.jpg', NULL, NULL ),
(DEFAULT, 'Alberto Tablon' ,  'a.jtablon@gmail.com' ,  'Alquilar' ,  '$2b$10$toGrqAVAtPVNz8U83vIm4u1afSG0MNHOtVXTKAWJUkJxtsFrgc7I.' , '4-beto.jpg', NULL, NULL ),
(DEFAULT, 'Rey Pepinito' ,  'r.pepinito@gmail.com' ,  'Alquilar' ,  '$2b$10$p8TtVxKkDtmS1Uc3uXRK..eCOjN7T2J7sjZJpKiO4TpWpNG0vmhRq' , '5-pepinito.jpg', NULL, NULL );

-- Datos de prueba de carteles
INSERT INTO  `signs` VALUES
(DEFAULT, 'Luis Viale' ,  '537' ,  'Galicia' ,  'Apolinario Figueroa', 'Villa Crespo', 'Ciudad de Buenos Aires', 'Tranquilo', '3','imagen-1578197875414.jpg',  '2', '2', '3', '4', '2500', '1',   NULL, NULL ),
(DEFAULT, 'Av. Martin Garcia' ,  '346' ,  'Almirante Brown' ,  'Brasil', 'La Boca', ' Ciudad de Buenos Aires', 'Bastante transitado, la cancha de boca cerca y parque lezama', '4', 'imagen-1578365353948.jpg',  '1', '1', '4', '4', '15229', '1',   NULL, NULL ),

(DEFAULT, 'Av. Córdoba' ,  '1290' ,  'Fitz Roy' ,  'Cabrera', 'Palermo', 'Ciudad de Buenos Aires', 'Llegando al cruce de Juan B. Justo', '3','imagen-1578365861291.jpg',  '2', '2', '3', '4', '2500', '1',   NULL, NULL ),
(DEFAULT, 'Pacífico Rodriguez' ,  '3200' ,  'Intendente Alvear' ,  'Pueyrredon', 'Villa Ballester', 'Gran Buenos Aires', 'Pleno centro comercial de Villa Ballester', '4', 'imagen-1578721246038.jpg',  '2', '1', '6', '3', '8484', '1',   NULL, NULL ),
(DEFAULT, 'Av. Coronel Diaz' ,  '2343' ,  'French' ,  'Peña', 'Palermo', 'Ciudad de Buenos Aires', 'Parque las heras en las cercanias', '4','imagen-1579210172887.jpg',  '1', '1', '6', '4', '8299', '1',   NULL, NULL ),
(DEFAULT, 'Rivadavia' ,  '2899' ,  'Almancio Alcorta' ,  'Bahía Blanca', 'Flores', ' Ciudad de Buenos Aires', 'Centro comercial de venta mayorísta. Acceso a mucha publico del interior.', '4', 'imagen-1579214165960.jpg',  '2', '2', '1', '7', '6230', '2',   NULL, NULL ),

(DEFAULT, 'Av. Santa Fe' ,  '4389' ,  'Fray Justo' ,  'Maria Oro', 'Palermo', 'Ciudad de Buenos Aires', 'Muy transitado, plena Av. Santa Fe', '5','imagen-1579214606898.jpg',  '2', '3', '5', '3', '272', '2',   NULL, NULL ),
(DEFAULT, 'Gorriti' ,  '783' ,  'Juan B. Justo' ,  'Honduras', 'Palermo', ' Ciudad de Buenos Aires', 'Cartel en esquina de paradas de colectivo sobre la calle más transitada	', '4', 'imagen-1579214883758.jpg',  '3', '1', '2', '10', '2737', '2',   NULL, NULL ),
(DEFAULT, 'Au. General Paz' ,  '6000' ,  'Pacheco' ,  'Av. Libertador', 'Vicente Lopez', 'Gran Buenos Aires', 'Sobre colectora cartel luminoso.', '5','imagen-1579215020453.jpg',  '2', '1', '9', '9', '6481', '2',   NULL, NULL ),
(DEFAULT, 'Av. Udaondo' ,  '1186' ,  'Au. Lugones' ,  'Av. Figueroa Alcorta', 'Nuñez', ' Ciudad de Buenos Aires', 'Cerca de La cancha de River. Super transitado.', '5', 'imagen-1579215138238.jpg',  '3', '3', '3', '8', '6765', '3',   NULL, NULL ),

(DEFAULT, 'Av. Luro' ,  '783' ,  'Catamarca' ,  'La Rioja', 'Mar del Plata', 'Buenos Aires', 'Parada de colectivo, carteles luminosos de gran calidad ', '4','imagen-1579215336602.jpg',  '1', '1', '7', '3', '7992', '3',   NULL, NULL ),
(DEFAULT, 'Av. Corrientes' ,  '7782' ,  'Esmeralda' ,  'Suipacha', 'Centro', ' Ciudad de Buenos Aires', 'Zona de teatros', '5', 'imagen-1579215490256.jpg',  '3', '3', '2', '4', '7385', '3',   NULL, NULL ),
(DEFAULT, 'Av. Libertador' ,  '8383' ,  'Colombia' ,  'Juan Manuel de Rosas', 'Centro', 'Ciudad de Buenos Aires', 'Cartel frente a Retiro con luz, alto potencial', '4','imagen-1579215643041.jpg',  '2', '1', '8', '10', '9081', '3',   NULL, NULL ),
(DEFAULT, 'Av. Edison' ,  '2664' ,  'Habana' ,  'Río de Janeiro', 'Martinez', 'Gran Buenos Aires', 'Mucho transito entrada al Unicenter', '4', 'imagen-1579215736451.jpg',  '3', '1', '5', '1', '3858', '3',   NULL, NULL ),
(DEFAULT, 'Velez Sarfield' ,  '831' ,  'Mitre' ,  'Marengo', 'Munro', 'Gran Buenos Aires', 'Zona comercial de Munro', '3', 'imagen-1579216051843.jpg',  '3', '2', '6', '10', '6905', '3',   NULL, NULL );




INSERT INTO `orders` VALUES
(DEFAULT, '1', 10000),
(DEFAULT, '1', 22223),
(DEFAULT, '1', 3340);


INSERT INTO `signs_orders` VALUES
(DEFAULT, '1', '1'),
(DEFAULT, '2', '2'),
(DEFAULT, '3', '1');
