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



INSERT INTO  `users` VALUES
(DEFAULT, 'Pato' ,  'patomartins@gmail.com' ,  'Alquilar' ,  '1234' , 'no_image.png', NULL, NULL );



INSERT INTO  `signs` VALUES
(DEFAULT, 'Cordona' ,  '300' ,  'Entre Rios' ,  'Jean Jaures', 'Palermo', 'Capital Federal', 'Cartel en esquina', '3','no_image_sign.png',  '2', '3', '4', '5', '2000', '1',   NULL, NULL ),
(DEFAULT, 'Avenida Alcorta' ,  '3e0' ,  'Malvinas Argentinas' ,  'Avenida Corrientes', 'Caballito', ' Capital Federal', 'Cartel en esquina', '2', 'no_image_sign.png',  '2', '3', '4', '5', '2000', '1',   NULL, NULL );

INSERT INTO `orders` VALUES
(DEFAULT, '1', 10000),
(DEFAULT, '1', 22223),
(DEFAULT, '1', 3340);


INSERT INTO `signs_orders` VALUES
(DEFAULT, '1', '1'),
(DEFAULT, '2', '2'),
(DEFAULT, '3', '1');
