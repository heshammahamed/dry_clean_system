CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(20) NOT NULL,
    password varchar(50) NOT NULL,
    owner boolean NOT NULL ,
    phonenumber varchar(12) NOT NULL
)

CREATE TABLE refreshtokens (
    token varchar(32) PRIMARY KEY,
    userId uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expiredAt TIMESTAMP NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    revokedAt TIMESTAMP
);

CREATE EXTENSION IF NOT EXISTS "pgcrypto";