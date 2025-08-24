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
    revokedAt TIMESTAMP
);

CREATE TABLE shops (
    id uuid PRIMARY KEY,
    name varchar(50) NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL
);

CREATE EXTENSION IF NOT EXISTS "pgcrypto";