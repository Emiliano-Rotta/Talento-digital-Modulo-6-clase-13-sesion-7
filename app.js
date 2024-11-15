//REST  significa "Representational State Transfer" (Transferencia de Estado Representacional).

//REST permite que un servidor proporcione acceso a datos o servicios a través de endpoints (rutas en la web) que el cliente puede solicitar.

// Buenas prácticas para REST
// Utilizar nombres de rutas claros y en plural para representar recursos (/usuarios en lugar de /usuario).
// No incluir verbos en las rutas (usar /usuarios en lugar de /obtenerUsuarios).

const express = require('express')
const app = express()
const PORT = 3000
app.use(express.json()); //MUY importante para manejar los datos en las solicitudes post y put

let usuarios = [
    {id: 1, nombre: "Bernarda", edad: 25},
    {id: 2, nombre: "Carlos", edad: 20},
    {id: 3, nombre: "Erick", edad: 35},
]
// Función de validación  // es un middleware, que es un tipo de función en Express que permite interceptar y procesar las solicitudes antes de que lleguen a su destino final.

function validarUsuario(req, res, next) {
    const { nombre, edad } = req.body;
    const keys = Object.keys(req.body); //obtiene un arreglo con los nombres de todas las propiedades 
    if(keys.length !== 2 || !keys.includes('nombre') || !keys.includes('edad') ){
        return res.status(400).json({ mensaje: 'Solo se permite nombre y edad como propiedades.' });
    }
    if (typeof nombre !== 'string' || typeof edad !== 'number') {
        return res.status(400).json({ mensaje: 'El nombre debe ser un texto y el edad un número.' });
      }

    next();// Si pasa la validación, sigue al siguiente middleware o llega al final
}

app.get("/usuarios",(req, res)=>{
    res.send(usuarios)
})

app.post('/usuarios',validarUsuario, (req, res) => {
    const nuevoUsuario = { id: usuarios.length + 1, ...req.body}; //obtenemos los datos 
    usuarios.push(nuevoUsuario)
    res.status(201).json(nuevoUsuario);
    // console.log(`agregamos el usuario  ${JSON.stringify(nuevoUsuario)}`)
})

app.put("/usuarios/:id", validarUsuario, (req, res)=>{
    const id = parseInt(req.params.id)
    const index = usuarios.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], ...req.body };
      res.json(usuarios[index]);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  });

app.delete("/usuarios/:id",(req, res)=>{
    const id = parseInt(req.params.id)
    usuarios = usuarios.filter((u) => u.id !== id);
    res.json({ mensaje: `Usuario con ID ${id} eliminado` });
})


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})