
process.on('message', (data) => {  //aca escucha un mensaje, si escucha el mensaje, se ejecuta lo de adentro
    let result = 0

    for(let i = 0; i<5e9; i++){
        result = i
    }

    {process.send(result)}      //de esta manera es como se envia, como socket por ej
})