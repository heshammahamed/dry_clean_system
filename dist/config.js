process.loadEnvFile('.env');
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
const password = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "xx";
export const configer = {
    port: port,
    dbpassword: password
};
