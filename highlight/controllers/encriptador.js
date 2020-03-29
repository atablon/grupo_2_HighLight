const bcrypt = require('bcrypt');

(DEFAULT, 'Ezequiel Cortez' ,  'ecortez@gmail.com' ,  'Publicar' ,  '$2b$10$mAhccrBqSZ5ehkKmePoCWOVzrjd8NLn5jJblMrNHlDhswf/NFqQSq' , '1-eze.jpg', NULL, NULL ),
(DEFAULT, 'Javier Herrera' ,  'j.herrera@gmail.com' ,  'Publicar' ,  '$2b$10$9YmJ0MapJZrV5arg.aDmYOENl3c6hUmCc5DUqDS1.QFzcnL0x/8jW' , '2-javi.jpg', NULL, NULL ),
(DEFAULT, 'Patricia Martins' ,  'pmartins@gmail.com' ,  'Publicar' ,  '$2b$10$Lw3vByh8YljefFMLaz4gVeFDK5r22VJzalEZE9w7P24iNxZvbYa/m' , '3-pato.jpg', NULL, NULL ),
(DEFAULT, 'Alberto Tablon' ,  'a.jtablon@gmail.com' ,  'Alquilar' ,  '$2b$10$toGrqAVAtPVNz8U83vIm4u1afSG0MNHOtVXTKAWJUkJxtsFrgc7I.' , '4-beto.jpg', NULL, NULL ),
(DEFAULT, 'Rey Pepinito' ,  'r.pepinito@gmail.com' ,  'Alquilar' ,  '$2b$10$p8TtVxKkDtmS1Uc3uXRK..eCOjN7T2J7sjZJpKiO4TpWpNG0vmhRq' , '5-pepinito.jpg', NULL, NULL );

let passwords = ['cortez123','herrera123','martins123','tablon123','pepinito123'];


passwords_cripted = passwords.map(passw=>{

    return(bcrypt.hashSync(passw, 10));
})
console.log(passwords_cripted);
