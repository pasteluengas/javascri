var sesion = new session();
sesion.copyItems();

function prestarEq(current_i) {
	if ((sesion.equipos[current_i].prestados + 1) > sesion.equipos[current_i].cantidad) {
		alert("No hay suficientes " + sesion.equipos[current_i].nombre + " para prestar.");
		return;
	}
	
	sesion.equipos[current_i].prestados += 1;
	sesion.loadItems();
	document.querySelector("#"+ sesion.equipos[current_i].codigo +" td:nth-child(3)").textContent = (sesion.equipos[current_i].cantidad - sesion.equipos[current_i].prestados);
}

function devolverEq(current_i) {
	if (sesion.equipos[current_i].prestados < 1) {
		alert("No hay " + sesion.equipos[current_i].nombre + " por devolver");
		return;
	}

	sesion.equipos[current_i].prestados -= 1;
	sesion.loadItems();
	document.querySelector("#"+ sesion.equipos[current_i].codigo +" td:nth-child(3)").textContent = (sesion.equipos[current_i].cantidad - sesion.equipos[current_i].prestados);
}


document.getElementById("que si dios").addEventListener("click", function() {
	sesion.resetStorage();
	location.reload();
}, false);


function load() {
	tabla = document.getElementById("le_table");
	
	for (let i = 0; i < sesion.equipos.length; i++) {
	
		const fila = document.createElement("tr");
		
		const celda1 = document.createElement("td");
		const celda2 = document.createElement("td");
		const celda3 = document.createElement("td");
		const celda4 = document.createElement("td");
		const celda5 = document.createElement("td");
		const prestar = document.createElement("button");
		const devolver = document.createElement("button");

		fila.id = sesion.equipos[i].codigo;
		celda1.textContent = sesion.equipos[i].codigo;
		celda2.textContent = sesion.equipos[i].nombre;
		celda3.textContent = (sesion.equipos[i].cantidad - sesion.equipos[i].prestados);
		celda4.textContent = sesion.equipos[i].cantidad;
		prestar.textContent = "Prestar";
		devolver.textContent = "Devolver";


		const current_i = i;

		prestar.addEventListener("click", function() {
			prestarEq(current_i);
		}, false);

		devolver.addEventListener("click", function() {
			devolverEq(current_i);
		}, false);
		


		fila.appendChild(celda1);
		fila.appendChild(celda2);
		fila.appendChild(celda3);
		fila.appendChild(celda4);
		fila.appendChild(celda5);
		celda5.appendChild(prestar);
		celda5.appendChild(devolver);

		tabla.appendChild(fila);
	}
};

function form1sub(){
	let code = document.getElementById("input_code").value.toUpperCase();
	let name = document.getElementById("input_name").value.toUpperCase();
	let ammo = parseInt(document.getElementById("input_ammo").value);

	if (localStorage.getItem(code) !== null) {
	    alert("Ya existe un equipo con ese codigo");
	    return;
	}


	sesion.equipos.push(new equipo(code, name, ammo, 0));
	sesion.loadItems();

	tabla = document.getElementById("le_table");
	
	const fila = document.createElement("tr");
	const celda1 = document.createElement("td");
	const celda2 = document.createElement("td");
	const celda3 = document.createElement("td");
	const celda4 = document.createElement("td");
	const celda5 = document.createElement("td");
	const prestar = document.createElement("button");
	const devolver = document.createElement("button");
	

	const i = sesion.equipos.length - 1;
	celda1.textContent = sesion.equipos[i].codigo;
	celda2.textContent = sesion.equipos[i].nombre;
	celda3.textContent = (sesion.equipos[i].cantidad - sesion.equipos[i].prestados);
	celda4.textContent = sesion.equipos[i].cantidad;
	prestar.textContent = "Prestar";
	devolver.textContent = "Devolver";


	const current_i = i;

	prestar.addEventListener("click", function() {
		prestarEq(current_i);
	}, false);

	devolver.addEventListener("click", function() {
		devolverEq(current_i);
	}, false);
	

	fila.id = sesion.equipos[i].codigo;
	fila.appendChild(celda1);
	fila.appendChild(celda2);
	fila.appendChild(celda3);
	fila.appendChild(celda4);
	fila.appendChild(celda5);
	celda5.appendChild(prestar);
	celda5.appendChild(devolver);

	tabla.appendChild(fila);

	document.getElementById("input_code").value = "";
	document.getElementById("input_name").value = "";
	document.getElementById("input_ammo").value = "";
	
}


window.onload = function() {
	load();
}
