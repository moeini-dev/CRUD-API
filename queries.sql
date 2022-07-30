#CREATE DATABASE test;
#DROP TABLE registeration;
CREATE TABLE registeration (
	id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45),
    lastName VARCHAR(50),
    gender VARCHAR(1),
    email VARCHAR(100),
    password VARCHAR(100),
    number VARCHAR(11),
    PRIMARY KEY (id)
);



    
/*insert into registeration (firstName, lastname, gender, email, password, number)
    values ('Ali', 'Moeini', 'm', 'example@gmail.com', '123456', '09131111111');*/
    
#SELECT * FROM registeration;
#show databases