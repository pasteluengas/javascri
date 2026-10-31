//borrar luego
//localStorage.clear();



// 1. Revisar si hay contenido en local
if (localStorage.length === 0) {
	// crea algun objeto para testeo
	let testeo = {
	  "codigo": "MUL-01",
	  "nombre": "MULTIMETRO DIGITAL",
	  "prestados": 0,
	  "cantidad": 5
	}

	localStorage.setItem(testeo["codigo"], JSON.stringify(testeo));
	
}


// array global donde estaran todos los objetos
objs = [];

class equipo {
	constructor(codigo, nombre, cantidad, prestados) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.cantidad = cantidad;
		this.prestados = prestados;
	};

	getjson() {
		let tojson = {
			"codigo": this.codigo,
			"nombre": this.nombre,
			"prestados": this.prestados,
			"cantidad": this.cantidad
		};
		console.log(tojson);
		return tojson;
	};
}

class session {
	constructor() {
		this.equipos = [];
	}

	copyItems() {
		this.equipos = []
		Object.keys(localStorage).forEach(clave => {
		let jsonobj = JSON.parse(localStorage.getItem(clave));
		this.equipos.push(new equipo(jsonobj["codigo"], jsonobj["nombre"], jsonobj["cantidad"], jsonobj["prestados"]));
		 // 	console.log(`Clave: ${clave} | Valor: ${localStorage.getItem(clave)}`);
	});
	console.log(this.equipos);
	}

	loadItems() {
		localStorage.clear();
		for (const obj of this.equipos) {
			const toStorage = JSON.stringify(obj.getjson());
			localStorage.setItem(obj.codigo, toStorage);
		}
	}

	resetStorage() {
		localStorage.clear();
	}

}

/*
aro = [];
let sesion = new session(aro);
sesion.copyItems();
*/
