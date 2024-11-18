const tareas = document.querySelector('#tareaLista');
const agregarTarea = document.querySelector('#btnTarea');
const nuevoImput = document.querySelector('#nuevaTarea');
let listaTareas = [];
const totalLista = document.querySelector('.total');
const realizadas = document.querySelector('.realizadas');

agregarTarea.addEventListener("click", () => {
    const tareaNueva = nuevoImput.value.trim();
    if (tareaNueva !== '') {
        listaTareas.push({
            id: (new Date()).valueOf(),
            descripcion: tareaNueva,
            realizada: false,
        });
        nuevoImput.value = "";
        renderizarHtml();
    } else {
        alert('Por favor ingresa tarea');
    }

});

const eliminar = (id) => {
    listaTareas = listaTareas.filter(borrar => borrar.id !== id);
    renderizarHtml();
}

const marcarRealizada = (id) => {
    const tarea = listaTareas.find((marcar) => marcar.id === id);
    tarea.realizada = !tarea.realizada;
    renderizarHtml();
}

const renderizarHtml = () => {
    let html = '';
    if (listaTareas.length > 0) {
        html = "<table><tr><th>ID</th><th>Tareas</th><th>Estado</th><th></th></tr>";
        for (let tarea of listaTareas) {
            html += `<tr>
            <td style="${tarea.realizada ? 'text-decoration: line-through' : ''}">${tarea.id}</td>
            <td style="${tarea.realizada ? 'text-decoration: line-through' : ''}" >${tarea.descripcion}</td>
            <td><input ${tarea.realizada ? 'checked' : ''} type="checkbox" onclick="marcarRealizada(${tarea.id})"/></td>
            <td><button class="boton-borrar" onclick="eliminar(${tarea.id})" >X</button> </td>
            </tr>`;
        };
        html += '</table>';
    } else { 
        html = '<h3>No hay tareas. Cuando añadas una tarea, se mostrará aquí</h3>'
    }
    tareas.innerHTML = html;
    totalLista.innerHTML = String(listaTareas.length);
    let totalRealizadas = listaTareas.filter(x => x.realizada === true);
    realizadas.innerHTML = String(totalRealizadas.length);
}   