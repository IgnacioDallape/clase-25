//FORKEAR, llevar ese proceso tan pesado, a un archivop secundario y gracias a fork hace que no se bloqueen los demas procesos mientras se ejecuta, MUY IMPORTANTE Y BUENO

import { fork } from 'child_process';

import express from 'express'
const app = express()

app.listen('8080',(req,res) =>{
    console.log('corriendo el servidor 8080')
})

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