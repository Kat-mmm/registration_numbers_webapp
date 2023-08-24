CREATE TABLE towns (
    id SERIAL PRIMARY KEY,
    town_name VARCHAR(100) NOT NULL
);

CREATE TABLE registration_numbers (
    id SERIAL PRIMARY KEY,
    registration_number VARCHAR(10) NOT NULL UNIQUE,
    town_id INT REFERENCES towns(id)
);

INSERT INTO towns (town_name) VALUES
    ('Cape Town'),
    ('Paarl'),
    ('Kuils River'),
    ('Stellenbosch');

INSERT INTO registration_numbers (registration_number, town_id) VALUES
    ('CA 1234', 1),
    ('CA 123-456', 1),
    ('CJ 9012', 2),
    ('CL 3456', 4),
    ('CF 7890', 3); 

ALTER TABLE towns
ADD COLUMN town_prefix VARCHAR(10) NOT NULL DEFAULT 'CA';

UPDATE towns
SET town_prefix = 'CA'
WHERE town_name = 'Cape Town';

UPDATE towns
SET town_prefix = 'CJ'
WHERE town_name = 'Paarl';

UPDATE towns
SET town_prefix = 'CF'
WHERE town_name = 'Kuils River';

UPDATE towns
SET town_prefix = 'CL'
WHERE town_name = 'Stellenbosch';

ALTER TABLE registration_numbers ADD CONSTRAINT uniq_desc_constraint UNIQUE(registration_number);