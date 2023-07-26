//Aca vemos como node trabaja con un proceso a la vez, al ser una operacion compleja, node se tarda en resolver el endpoint suma, pero home lo resuelve al instante, en cambio, si pongo a cargar a la vez ambos, empezando por el de suma, el de home no se va a resolver hasta que se resuelva el de suma, esto hay que evitarlo asi no se queda la pagina tildada para el usuario

import express from 'express'
const app = express()

app.listen('8080',(req,res) =>{
    console.log('corriendo el servidor 8080')
})

app.get('/suma', (req,res) => {
    let resp = operacionCompleja()
    res.send('la suma es : ' + resp)
})
app.get('/home', (req,res) => {
    res.send('Home')
})

function operacionCompleja(){
    let result = 0

    for(let i = 0; i<5e9; i++){
        result = i
    }

    return result
}
