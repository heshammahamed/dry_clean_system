CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(20) NOT NULL,
    password varchar(61) NOT NULL,
    owner boolean NOT NULL ,
    phonenumber varchar(12) NOT NULL,
    shopId uuid NOT NULL REFERENCES shops(id) ON DELETE CASCADE;
)

CREATE TABLE refreshtokens (
    token varchar(64) PRIMARY KEY DEFAULT gen_random_uuid(),
    userId uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expiredAt TIMESTAMP NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    revokedAt TIMESTAMP SET DEFAULT NULL 
);

CREATE TABLE shops (
    id uuid PRIMARY KEY,
    name varchar(50) NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL
);

-- the phone number will not be the primary cause not all customers will have phones
-- but it because it is very important to me for future projects 
-- so i think i will make it not null and tell the owners to add any number if the customer dont have one

CREATE TABLE customers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    shopId uuid NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    name varchar(50) NOT NULL,
    phonenumber varchar(12),
)

CREATE TABLE orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    price_total NUMERIC(10,2),
    prepaid NUMERIC(10,2),
    done boolean DEFAULT false,
    day_receive DATE,
    hour_receive TIME,
    shopId uuid NOT NULL REFERENCES shops(id),
    customerId uuid NOT NULL REFERENCES customers(id),
    delevired boolean DEFAULT false
) 

CREATE EXTENSION IF NOT EXISTS "pgcrypto";