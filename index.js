
import dotenv from 'dotenv'
import { Command } from "commander"
const program = new Command()

const enviroment = 'prod'

dotenv.config({
    path: enviroment==='prod' ? './.env.prod' : './.env.dev'
})

//excepciones no controladas, por ejemplo, un console.log mal escrito

process.on('uncaughtException', (err) => {
    console.log('error de no controlado', err)
})
//por ejemplo esto, es algo que no puede controlar el servidor, es un error de sintaxis
// console.lo('hola!')

//exit

process.on('exit', (code) => {
    //y aca podemos hacer un switch para ver el proceso que codigo devuelve
    console.log('termino el proceso ', code)
})

function suma(a,b){
    if(a + b > 10){
        process.exit()  //aca le podemos especificar el codigo de devolucion dentro, el 0 es ok, el 1 es que se termino el proceso pero por una excepcion fatal, el 5 es falla en el motor v8 y el 9 son argumentos invalidos
    }
}

// console.log(suma(2,10))

//Aca vemos como node trabaja con un proceso a la vez, al ser una operacion compleja, node se tarda en resolver el endpoint suma, pero home lo resuelve al instante, en cambio, si pongo a cargar a la vez ambos, empezando por el de suma, el de home no se va a resolver hasta que se resuelva el de suma, esto hay que evitarlo asi no se queda la pagina tildada para el usuario

import express from 'express'
const app = express()

app.listen('8080',(req,res) =>{
    console.log('corriendo el servidor 8080')
})

// app.get('/suma', (req,res) => {
//     let resp = operacionCompleja()
//     res.send('la suma es : ' + resp)
// })
// app.get('/home', (req,res) => {
//     res.send('Home')
// })

// function operacionCompleja(){
//     let result = 0

//     for(let i = 0; i<5e9; i++){
//         result = i
//     }

//     return result
// }



//FORKEAR, llevar ese proceso tan pesado, a un archivop secundario y gracias a fork hace que no se bloqueen los demas procesos mientras se ejecuta, MUY IMPORTANTE Y BUENO

import { fork } from 'child_process';

app.get('/suma', (req,res) => {
    const child = fork('./operacionCompleja')          //guardo el proceso secundario que esta en operacionCompleja.js
    child.send('Inicie el proceso')         //y aca le puedo escribir lo que quiera, por como esta configurado el proceso hijo, cuando le llegue un mensaje, se ejecutará y nos devolverá el rdo
    child.on('message', (data) => {
        res.send('el rdo es ' + data)
    })
})


app.get('/home', (req,res) => {
    res.send('Home')
})