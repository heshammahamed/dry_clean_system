process.loadEnvFile('.env')

const port = process.env.PORT ? Number(process.env.PORT) : 8080
const password = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "xx"
const accesstoken = process.env.ACCESS_TOKEN_DURATION ? Number(process.env.ACCESS_TOKEN_DURATION) : 3600

const secretkey = process.env.SECRET_KEY_TOKEN ? process.env.SECRET_KEY_TOKEN : "xx"
const refreshtokenlength = process.env.REFRESH_TOKEN_LENGTH ? Number(process.env.REFRESH_TOKEN_LENGTH) : 16

type config = {
    port : number,
    dbpassword : string,
    accesstoekn : number,
    secretkey : string,
    refreshtokenlength : number
}

export const configer : config =  {
    port : port,
    dbpassword : password,
    accesstoekn : accesstoken,
    secretkey : secretkey,
    refreshtokenlength : refreshtokenlength
}