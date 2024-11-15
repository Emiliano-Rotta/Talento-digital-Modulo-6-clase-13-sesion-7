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





// // ----------------------------------------------------
// Ejercicio 1: Gestión de Libros
// Consigna
// Crea una API REST que permita gestionar una lista de libros. Cada libro debe tener un id, titulo y autor. Implementa las siguientes rutas:

// POST /libros: Agregar un nuevo libro. Valida que solo se envíen titulo (de tipo string) y autor (de tipo string).
// GET /libros: Listar todos los libros.
// PUT /libros/:id: Actualizar el título o el autor de un libro según su id.
// DELETE /libros/:id: Eliminar un libro por su id.

// Ejercicio 2: Gestión de Cursos
// Consigna
// Crea una API REST para gestionar una lista de cursos. Cada curso debe tener un id, nombre, duracion (en horas). Implementa las siguientes rutas:

// POST /cursos: Agregar un nuevo curso, validando que el nombre (string) y duracion (número) sean correctos.
// GET /cursos: Obtener la lista completa de cursos.
// PUT /cursos/:id: Actualizar el nombre o la duración de un curso mediante su id.
// DELETE /cursos/:id: Eliminar un curso por su id.

// Ejercicio 3: Gestión de Empleados
// Consigna 
// Crea una API REST para gestionar una lista de empleados. Cada empleado debe tener un id, nombre y puesto. Implementa las siguientes rutas:

// POST /empleados: Agregar un nuevo empleado, validando que se envíen únicamente nombre (string) y puesto (string).
// GET /empleados: Obtener la lista completa de empleados.
// PUT /empleados/:id: Actualizar el nombre o el puesto de un empleado mediante su id.
// DELETE /empleados/:id: Eliminar un empleado por su id.