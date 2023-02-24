const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const { 
    saludo,
    getOperacionConsola,
    getProcesoActivo,
    ejecutarComando,
    escribirBatIniciarRepositorio,
    escribirBatClonarRepositorio,
    getResultadoSatisfactorio
} = require("./api.js");

const app = express();
//Configuracion del Body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Configuracion del Cors (Politicas)
app.use(cors({
    origin: '*'
}));
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

//Ruta:
// http://localhost:3000/iniciar?&remoto=cprogramasfiles&local=Cprogramita&usuario=carlitos


async function comandoMoverADirectorio(vectorCarpetas) {
    for (const stringCarpeta of vectorCarpetas) {
        console.log(stringCarpeta)
        const resp = await ejecutarComando('cd ' + stringCarpeta);
        console.log(resp);
    }
}

//GET
app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname, './client.html'))
    const operacionConsola = getOperacionConsola().toString();
    const procesoActivo = getProcesoActivo();
    const resultadoSatisfactorio = getResultadoSatisfactorio();
    console.log("* Proceso activo GET -> ", procesoActivo)
    console.log("* Ultimo mensaje GET ->", operacionConsola);
    console.log("* Ultimo mensaje GET ->", resultadoSatisfactorio);
    console.log({ 'active': procesoActivo, 'mensaje': operacionConsola, 'satisfactorio': resultadoSatisfactorio })
    res.json({ 'active': procesoActivo, 'mensaje': operacionConsola, 'satisfactorio': resultadoSatisfactorio });

})

app.get("/iniciar", (req, res) => {

    const { remoto, local, usuario } = req.query
    console.log(remoto)
    //res.json({"Hola": "Hola"})
    res.send({ "data": "Hola!" })
})

app.get("/saludo", (req, res) => {
    console.log(req.query)
})

//POST
app.post("/", async (req, res) => {

    const { nombre, remoto, ruta } = req.body;
    console.log(req.body)
    console.log("Verificando lo que llega: ", remoto, ruta)
    /*    
        const vectorCarpetas = ruta.split(String.fromCharCode(92))
        console.log(vectorCarpetas)
        comandoMoverADirectorio(vectorCarpetas) */

    //escribirBatClonarRepositorio(nombre, remoto, ruta);
    ejecutarComando('C:/DEVTOOLS/WKS-SCLM-PROJECTS/SCGit/SCG-Prototipo/exe.bat')
    const operacionConsola = getOperacionConsola().toString();
    const procesoActivo = getProcesoActivo();
    const resultadoSatisfactorio = getResultadoSatisfactorio();
    console.log("* Proceso activo GET -> ", procesoActivo)
    console.log("* Ultimo mensaje GET ->", operacionConsola);
    console.log("* Ultimo mensaje GET ->", resultadoSatisfactorio);
    console.log({ 'active': procesoActivo, 'mensaje': operacionConsola, 'satisfactorio': resultadoSatisfactorio })
    res.json({ 'active': procesoActivo, 'mensaje': operacionConsola, 'satisfactorio': resultadoSatisfactorio });

});

app.post("/hi", (req, res) => {

    console.log("POST /hi")
    console.log(req)

});

app.listen(3000);
console.log("Servidor Local de la API-Comandos Iniciado en puerto 3000");