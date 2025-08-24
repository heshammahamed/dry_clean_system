CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(20) NOT NULL,
    password varchar(50) NOT NULL,
    owner boolean NOT NULL ,
    phonenumber varchar(12) NOT NULL
)

CREATE TABLE refreshtokens (
    token VARCHAR(32) PRIMARY KEY,
    expiredAt DATE NOT NULL,
    createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL,
    revokedAt DATE,
    userId INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE EXTENSION IF NOT EXISTS "pgcrypto";