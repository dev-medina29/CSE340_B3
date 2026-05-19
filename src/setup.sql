create table organization (
organization_id serial primary key,
name varchar(150) not null,
description text not null,
email varchar(255) not null,
logo varchar(255) not null
);
insert into organization (name,description,email,logo)
values ('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects','info@brightfuturebuilders.org','brightfuture-logo.png'
);

select * from organization;

INSERT INTO organization (name, description, email, logo)
VALUES 
('UnityServe Volunteers',
 'A volunteer coordination group supporting local charities and service initiatives.',
 'hello@unityserve.org',
 'unityserve-logo.png');

INSERT INTO organization (name, description, email, logo)
VALUES 
('GreenHarvest Growers',
 'An urban farming collective promoting food sustainability and education in local neighborhoods.',
 'contact@greenharvest.org',
 'greenharvest-logo.png');
