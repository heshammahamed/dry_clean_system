process.loadEnvFile('.env');
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
export const configer = {
    port: port
};
