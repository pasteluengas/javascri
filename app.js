var sesion = new session();
sesion.copyItems();

function prestarEq(current_i) {
	let continuer = true;
	if ((sesion.equipos[current_i].prestados-1) < 5) {
		continuer = confirm("Quedan pocos equipos, desea continuar?");
	}

	if(!continuer) return false;
 	
	if ((sesion.equipos[current_i].prestados + 1) > sesion.equipos[current_i].cantidad) {
		alert("No hay suficientes " + sesion.equipos[current_i].nombre + " para prestar.");
		return false;
	}
	
	sesion.equipos[current_i].prestados += 1;
	sesion.loadItems();
	document.querySelector("#CODE_"+ sesion.equipos[current_i].codigo +" td:nth-child(3)").textContent = (sesion.equipos[current_i].cantidad - sesion.equipos[current_i].prestados);

	return true;
}

function devolverEq(current_i) {
	if (sesion.equipos[current_i].prestados < 1) {
		alert("No hay " + sesion.equipos[current_i].nombre + " por devolver");
		return;
	}

	sesion.equipos[current_i].prestados -= 1;
	sesion.loadItems();
	document.querySelector("#CODE_"+ sesion.equipos[current_i].codigo +" td:nth-child(3)").textContent = (sesion.equipos[current_i].cantidad - sesion.equipos[current_i].prestados);
}


function show(codigo="all") {
	const tabla = document.getElementById("le_table");
	// Recorrer todas las filas de la tabla
	for (let i = 0; i < tabla.rows.length; i++) {
	    let fila = tabla.rows[i];
	    //alert(fil1a.id + "==CODE_" + codigo);
	    if (codigo != "all") fila.style.visibility = (fila.id == "not-hide" || fila.id == "CODE_" + codigo) ? "visible" : "collapse";
		if (codigo == "all") fila.style.visibility = "visible";
	}

	document.getElementById("input_search").value = "";
	document.getElementById("submit_search").value = "Mostrar todo";
}

document.getElementById("que si dios").addEventListener("click", function() {
	sesion.resetStorage();
	location.reload();
}, false);

document.getElementById("search").addEventListener("submit", function () {
	let searchterm = document.getElementById("input_search").value;
	console.log(searchterm);

	if (document.getElementById("submit_search").value == "Mostrar todo" || document.getElementById("input_search").value == "") {
		show();
		document.getElementById("submit_search").value = "Buscar";
		return;
	}
	
	
	// busqueda
	// 1. covertirla a mayusculas
	searchterm = searchterm.toUpperCase();
	// 2. buscar por exactitud en solo el codigo
	for(const i in sesion.equipos) {
		if (sesion.equipos[i].codigo == searchterm) {
			//alert("Encontrado: " + sesion.equipos[i].codigo);
			show(sesion.equipos[i].codigo);
			return;
		} else if (sesion.equipos[i].nombre == searchterm) {
			//alert("encontrado: " + sesion.equipos[i].codigo);
			show(sesion.equipos[i].codigo);
			return;
		} else if (searchterm.indexOf(" ") == -1) {
			let splitshit = sesion.equipos[i].nombre.split(" ");
			for (palabra in splitshit) {
				if (splitshit[palabra] == searchterm) {
					//alert("Encontrado: " + sesion.equipos[i].codigo)
					show(sesion.equipos[i].codigo);
					return;
				}
			}
		}// 3. buscar exactitud solo en nombre	
	}
	alert("No se encontraron coincidencias");
	// 4. si es una sola palabra buscar si algun nombre tiene esa palaba
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

		fila.id = "CODE_" + sesion.equipos[i].codigo;
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
