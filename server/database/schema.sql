create table user (
  id int unsigned primary key auto_increment not null,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email varchar(255) not null unique,
  password varchar(255) not null,
  profile_pic VARCHAR(255) 

);

create table exercice (
  id int unsigned primary key auto_increment not null,
  exercice TEXT NOT NULL,
  pics VARCHAR(255) NOT NULL,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

create table user_exercice (
  id int unsigned primary key auto_increment not null,
  user_id int unsigned not null,
  exercice_id int unsigned not null,
  foreign key(user_id) references user(id),
  foreign key(exercice_id) references exercice(id)
);