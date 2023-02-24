let proceso = null;
let operacionConsola = "Ninguna Operacion Ejecuntadose";
let procesoActivo = false;
let resultadoSatisfactorio = true;

//Saludo
function saludo(mensaje){
    console.log("Hola")
    console.log(mensaje)
}

//Gets
function getOperacionConsola(){
    return operacionConsola;
};

function getProcesoActivo(){
    return procesoActivo;
};

function getResultadoSatisfactorio(){
    return resultadoSatisfactorio;
};

//Funcion ejecutar
async function ejecutarComandoAsincrono(comando) {

    const { execSync } = require("child_process");

    const valor = execSync(comando);
    console.log("done")
    console.log(valor.toString());

/*     exec(comando, (error, salida, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return error.message;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return stderr;
        }
        console.log(`Resultado Operacion: ${salida}`);
        return salida;
    }); */

}

function ejecutarComando(comando) {

    const { exec } = require("child_process");

    operacionConsola = "Operacion Iniciada";
    procesoActivo = true;
    resultadoSatisfactorio = true;

    proceso = exec(comando, async (error, salida, stderr) => {
        
        if (error) {
            console.log(`error: ${error.message}`);
            procesoActivo = false;
            operacionConsola = error.message;
            resultadoSatisfactorio = false;
            return error.message;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            procesoActivo = false;
            operacionConsola = stderr;
            resultadoSatisfactorio = true;
            return stderr;
        }
        console.log(`Resultado Operacion: ${salida}`);
        procesoActivo = false;
        operacionConsola = salida;
        resultadoSatisfactorio = true;
        return salida;

    });

    proceso.stdout.on("data", (mensajeConsola) => {
        console.log(mensajeConsola);
        operacionConsola = mensajeConsola;
        return mensajeConsola;
    });

}

async function escribirBatIniciarRepositorio(nombre, ruta) {
    const fs = require('fs');

    const texto = 'cd ' + ruta + ' \n git init';
    console.log("texto: ", texto)

    // write to a new file named 2pac.txt
        fs.writeFile('exe.bat', texto, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        ejecutarComando('C:/DEVTOOLS/WKS-SCLM-PROJECTS/Api-Comandos/exe.bat');
    });
}

function escribirBatClonarRepositorio(nombre, rutaRemoto, rutaLocal){
    const fs = require('fs');

    const texto = 'cd ' + rutaLocal + ' \n git clone ' + rutaRemoto;
    console.log("BatClonar - Escribir: ", texto)

    // write to a new file named 2pac.txt
    fs.writeFile('exe.bat', texto, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('Archivo bat modificado!');
    });
}

module.exports.ejecutarComando = ejecutarComando;
module.exports.escribirBatIniciarRepositorio = escribirBatIniciarRepositorio;
module.exports.escribirBatClonarRepositorio = escribirBatClonarRepositorio;
module.exports.getOperacionConsola = getOperacionConsola;
module.exports.getProcesoActivo = getProcesoActivo;
module.exports.getResultadoSatisfactorio = getResultadoSatisfactorio;