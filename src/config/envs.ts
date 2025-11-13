import 'dotenv/config';
import * as joi from 'joi';

// Objeto de variables de entorno
interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}

//validadores sobre ese objeto de variables de entorno
//variables de entono necesarias para poder lanzar la aplicación de nest
//en caso contrario lanzará una excepción y no ejecutara la app
const envsSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
})
.unknown(true); //hay muchas v.e mas que en este punto no deben de validarse

const { error, value } = envsSchema.validate( process.env ); //destructurmos el process.env (todas las v.e)
console.log(value)

if ( error ) { //falta el PORT o DATABASE_URL
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
}