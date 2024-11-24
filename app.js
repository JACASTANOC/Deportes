document.getElementById('deporte-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    console.log('Formulario enviado'); // Añade esta línea para verificar si se ejecuta

    const nombre = document.getElementById('deporte-nombre').value;
    const genero = document.getElementById('deporte-genero').value;
    const id = document.getElementById('deporte-id').value || 0;

    const deporteData = {
        id: id,
        nombre: nombre,
        genero: genero
    };

    try {
        if (id == 0) {
            // Crear nuevo deporte
            await axios.post('http://localhost:4000/api/deportes', deporteData);
        } else {
            // Actualizar deporte existente
            await axios.put(`http://localhost:4000/api/deportes/${id}`, deporteData);
        }
        alert('Deporte guardado exitosamente');
        cargarDeportes(); // Recargar la lista de deportes
    } catch (error) {
        console.error('Error guardando el deporte:', error);
    }
});
