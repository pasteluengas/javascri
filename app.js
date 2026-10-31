var sesion = new session();
sesion.copyItems();


window.onload = function() {
	tabla = document.getElementById("le_table");
	
	for (let i = 0; i < sesion.equipos.length; i++) {
	
		const fila = document.createElement("tr");
		
		const celda1 = document.createElement("td");
		const celda2 = document.createElement("td");
		const celda3 = document.createElement("td");
		const celda4 = document.createElement("td");
		const celda5 = document.createElement("td");

		fila.id = sesion.equipos[i].codigo;
		celda1.textContent = sesion.equipos[i].codigo;
		celda2.textContent = sesion.equipos[i].nombre;
		celda3.textContent = (sesion.equipos[i].cantidad - sesion.equipos[i].prestados);
		celda4.textContent = sesion.equipos[i].cantidad;
		celda5.textContent = "Prestar / Devolver";

		fila.appendChild(celda1);
		fila.appendChild(celda2);
		fila.appendChild(celda3);
		fila.appendChild(celda4);
		fila.appendChild(celda5);

		tabla.appendChild(fila);
	}
};

function form1sub(){
	let code = document.getElementById("input_code").value.toUpperCase();
	let name = document.getElementById("input_name").value.toUpperCase();
	let ammo = parseInt(document.getElementById("input_ammo").value);

	sesion.equipos.push(new equipo(code, name, ammo));
	sesion.loadItems();

	tabla = document.getElementById("le_table");
	
	const fila = document.createElement("tr");
	const celda1 = document.createElement("td");
	const celda2 = document.createElement("td");
	const celda3 = document.createElement("td");
	const celda4 = document.createElement("td");
	const celda5 = document.createElement("td");

	const i = sesion.equipos.length - 1;
	celda1.textContent = sesion.equipos[i].codigo;
	celda2.textContent = sesion.equipos[i].nombre;
	celda3.textContent = (sesion.equipos[i].cantidad - sesion.equipos[i].prestados);
	celda4.textContent = sesion.equipos[i].cantidad;
	celda5.textContent = "Prestar / Devolver";

	fila.id = sesion.equipos[i].codigo;
	fila.appendChild(celda1);
	fila.appendChild(celda2);
	fila.appendChild(celda3);
	fila.appendChild(celda4);
	fila.appendChild(celda5);

	tabla.appendChild(fila);

	document.getElementById("input_code").value = "";
	document.getElementById("input_name").value = "";
	document.getElementById("input_ammo").value = "";
	
}
