// Para poder hacer uso del archivo .env, necesitamos una dependencia, dotenv, ahora no nos dara undefined lo de abajo

import dotenv from 'dotenv'

const enviroment = 'prod'

dotenv.config({
    path: enviroment==='prod' ? './.env.prod' : './.env.dev'
})

let a = process.env.PORT  
//asi la obtengo

console.log(a)