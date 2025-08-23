CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(20) NOT NULL,
    password varchar(50) NOT NULL,
    owner boolean NOT NULL 
)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";