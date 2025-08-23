process.loadEnvFile('.env')

const port = process.env.PORT ? Number(process.env.PORT) : 8080
type config = {
    port : number,
}

export const configer : config =  {
    port : port,
}