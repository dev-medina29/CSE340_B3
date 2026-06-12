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

 CREATE TABLE ServiceProjects (
    project_id INT PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    date DATE,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);
-- Add the code to make the project_id serial;


-- BrightFuture Builders Projects
INSERT INTO ServiceProjects (project_id,organization_id, title, description, location, date) VALUES
(101, 1, 'Community School Renovation', 'Renovating classrooms and facilities for local schools.', 'Brazzaville', '2026-04-10'),
(102, 1, 'Water Well Construction', 'Building sustainable wells to provide clean water.', 'Casablanca', '2026-05-15'),
(103, 1, 'Affordable Housing Pilot', 'Constructing eco-friendly housing units for low-income families.', 'Brazzaville', '2026-06-20'),
(104, 1, 'Bridge Repair Initiative', 'Repairing damaged bridges to improve rural connectivity.', 'Casablanca', '2026-07-05'),
(105, 1, 'Solar Lighting Project', 'Installing solar-powered street lights in underserved areas.', 'Brazzaville', '2026-08-12');

-- GreenHarvest Growers Projects
INSERT INTO ServiceProjects (project_id,organization_id, title, description, location, date) VALUES
(201, 2, 'Urban Garden Expansion', 'Expanding community gardens to increase local food supply.', 'Casablanca', '2026-04-18'),
(202, 2, 'Composting Workshop', 'Teaching sustainable composting practices to residents.', 'Brazzaville', '2026-05-22'),
(203, 2, 'Hydroponics Training', 'Training youth in hydroponic farming techniques.', 'Casablanca', '2026-06-30'),
(204, 2, 'Farm-to-Table Market', 'Launching a local market for fresh produce.', 'Brazzaville', '2026-07-25'),
(205, 2, 'School Nutrition Program', 'Providing fresh vegetables to school cafeterias.', 'Casablanca', '2026-08-14');

-- UnityServe Volunteers Projects
INSERT INTO ServiceProjects (project_id,organization_id, title, description, location, date) VALUES
(301, 3, 'Charity Run Event', 'Organizing a fundraising marathon for local charities.', 'Brazzaville', '2026-04-12'),
(302, 3, 'Food Distribution Drive', 'Distributing meals to homeless and vulnerable populations.', 'Casablanca', '2026-05-19'),
(303, 3, 'Blood Donation Campaign', 'Coordinating blood donation events with hospitals.', 'Brazzaville', '2026-06-28'),
(304, 3, 'Youth Mentorship Program', 'Pairing volunteers with students for mentorship.', 'Casablanca', '2026-07-15'),
(305, 3, 'Senior Care Visits', 'Providing companionship and support to elderly residents.', 'Brazzaville', '2026-08-09');


create table categories(
	category_id serial primary key,
	name varchar(150) not null
 );
 
CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    primary key(project_id,category_id),
	foreign key (category_id) references categories(category_id),
	foreign key (project_id) references ServiceProjects(project_id)
);

INSERT INTO categories (name) VALUES ('Education');
INSERT INTO categories (name) VALUES ('Infrastructure');
INSERT INTO categories (name) VALUES ('Health and Wellness');
INSERT INTO categories (name) VALUES ('Environment');
INSERT INTO categories (name) VALUES ('Community Support');

-- Community School Renovation → Education, Infrastructure
INSERT INTO project_categories (project_id, category_id) VALUES (101, 1);
INSERT INTO project_categories (project_id, category_id) VALUES (101, 2);

-- Water Well Construction → Health, Infrastructure
INSERT INTO project_categories (project_id, category_id) VALUES (102, 3);
INSERT INTO project_categories (project_id, category_id) VALUES (102, 2);

-- Affordable Housing Pilot → Infrastructure, Community Support
INSERT INTO project_categories (project_id, category_id) VALUES (103, 2);
INSERT INTO project_categories (project_id, category_id) VALUES (103, 5);

-- Bridge Repair Initiative → Infrastructure
INSERT INTO project_categories (project_id, category_id) VALUES (104, 2);

-- Solar Lighting Project → Infrastructure, Environment
INSERT INTO project_categories (project_id, category_id) VALUES (105, 2);
INSERT INTO project_categories (project_id, category_id) VALUES (105, 4);

-- Urban Garden Expansion → Environment, Community Support
INSERT INTO project_categories (project_id, category_id) VALUES (201, 4);
INSERT INTO project_categories (project_id, category_id) VALUES (201, 5);

-- Composting Workshop → Environment
INSERT INTO project_categories (project_id, category_id) VALUES (202, 4);

-- Hydroponics Training → Education, Environment
INSERT INTO project_categories (project_id, category_id) VALUES (203, 1);
INSERT INTO project_categories (project_id, category_id) VALUES (203, 4);

-- Farm-to-Table Market → Community Support
INSERT INTO project_categories (project_id, category_id) VALUES (204, 5);

-- School Nutrition Program → Education, Health
INSERT INTO project_categories (project_id, category_id) VALUES (205, 1);
INSERT INTO project_categories (project_id, category_id) VALUES (205, 3);

-- Charity Run Event → Community Support
INSERT INTO project_categories (project_id, category_id) VALUES (301, 5);

-- Food Distribution Drive → Community Support
INSERT INTO project_categories (project_id, category_id) VALUES (302, 5);

-- Blood Donation Campaign → Health
INSERT INTO project_categories (project_id, category_id) VALUES (303, 3);

-- Youth Mentorship Program → Education, Community Support
INSERT INTO project_categories (project_id, category_id) VALUES (304, 1);
INSERT INTO project_categories (project_id, category_id) VALUES (304, 5);

-- Senior Care Visits → Community Support
INSERT INTO project_categories (project_id, category_id) VALUES (305, 5);