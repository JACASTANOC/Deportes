document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:4000/api/deportes';

    const tablaDeportes = document.getElementById('tabla-deportes');
    const formTitle = document.getElementById('form-title');
    const deporteForm = document.getElementById('deporte-form');
    const deporteInput = document.getElementById('deporte');
    const generoInput = document.getElementById('genero');

    let editId = null; 

    // Función para cargar deportes en la tabla
    async function cargarDeportes() {
        try {
            const res = await fetch(`${API_URL}/`);
            const data = await res.json();

            tablaDeportes.innerHTML = data.body.map(d => `
                <tr data-id="${d.id}">
                    <td>${d.id}</td>
                    <td>${toTitleCase(d.deporte)}</td>
                    <td>${toTitleCase(d.genero)}</td>
                    <td>
                        <button class="btn btn-edit">Editar</button>
                        <button class="btn btn-delete">Eliminar</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error cargando deportes:', error);
        }
    }

    // Función para convertir cadenas a Title Case
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
    }

    // Manejar el formulario para agregar o actualizar deportes
    deporteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const deporte = deporteInput.value.trim();
        const genero = generoInput.value;

        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `${API_URL}/${editId}` : API_URL;

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deporte, genero })
            });

            deporteForm.reset();
            formTitle.textContent = 'Agregar Deporte';
            editId = null;

            cargarDeportes();
        } catch (error) {
            console.error('Error guardando deporte:', error);
        }
    });

    // Manejo de los botones al que le de click en el formulario
    tablaDeportes.addEventListener('click', (e) => {
        const target = e.target;
        const row = target.closest('tr');
        const id = row.dataset.id;

        if (target.classList.contains('btn-edit')) {
            editarDeporte(id, row.cells[1].textContent, row.cells[2].textContent);
        } else if (target.classList.contains('btn-delete')) {
            eliminarDeporte(id);
        }
    });

    // Función para editar deporte
    function editarDeporte(id, deporte, genero) {
        editId = id;
        deporteInput.value = deporte;
        generoInput.value = genero;

        formTitle.textContent = 'Editar Deporte';
    }

    // Función para eliminar deporte
    async function eliminarDeporte(id) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            cargarDeportes();
        } catch (error) {
            console.error('Error eliminando deporte:', error);
        }
    }

    // Mostrar los deportes
    cargarDeportes();
});
