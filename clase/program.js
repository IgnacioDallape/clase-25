

// // console.log(process.cwd() + '/index.js') //me muestra la ruta actual de la carpeta

// // console.log(process.pid) //id del proceso que esta corriendo

// // console.log(process.argv) //dos argumentos, el primero es donde esta instalado node, y el segundo la ruta absoluta de mi proyecto  , aca pódemos pasar argumentos a través de la terminal, por ejempo con node index.js 3 nacho hola, eso se adjunta a este array, por ej, este es el encargado de hacer funcionar los '-y' por ej. un ejemplo es npm init -y


// PORT = process.argv.slice([2])[1] //con slice me reconoce desde el espacio dos en adelante
// //asi se deberia pasar el puerto, desplazo los 2 primeros argumentos que no me interesan, y le dgo q busque la posicion uno, que es la q esta el puerto en 'node index.js -p 8080'

// console.log(PORT)

//COMANDER

import { Command } from "commander"

const program = new Command()

program
        .option('-d', 'Variable para hacer debug', false) //el primer argumento es lo que quiero capturar, cuando se pase esto, el programa va a entender que se refiere a la variable para hacer debug, el segundo una descripcion, y el tercero un valor por defecto
        .option('-p <port>', 'puerto del server', 8080) //lo mismo con el puerto, cuando hagan node index.js -p 8080, toma el valor que le sige a la -p, ademas dentro de esto <> le paso lo que significa si quiero
        .option('--mode', 'modo de trabajo', 'produccion') //cuando se pone solo un guion toma la primer letra, cuando se pone 2, se toma toda la palabra completa
        //si quiero que una sea obligatoria, por ejemplo si quiero que siempre haya un usuario cuando alguien use la app, no la dejo usarla anonimamente
        .requiredOption('-u <user>', 'usuario que esta usando la app', 'no se declaró un usuario')
        //quiero guardar unas letras pasadas desde la consola:
        .option('-l, --letters [letters...]', 'array de letras', '') //necesario hacer el [letters...] para que se guarden todos los datos en un array

program.parse() //y aca termino la configuracion, super IMPORTANTE  


console.log(program.opts()) //y con esta funcion, puedo ver todas las configuraciones de program, lo q hicimos con todos los option
//PROBARLO CON ESTO: node index.js -d -p 3000 --mode dev -u root --letters w f s a

//COMO ATRAPO LOS ELEMENTOS QUE NO ESTAN CONFIGURADOS, POR EJ, PASO EN --mode dev 2 54 s ... y ahi sigo con lo otro, dev esta bien pero los num no, bueno los agarro con program.args, recoje los sobrantes

console.log(program.args)