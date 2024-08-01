import Graph from '../models/Graph.js';
import View from '../view/View.js';

class App {
    constructor() {
        this.grafo = new Graph();
        this.vista = new View();

        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('addVerticesBtn').addEventListener('click', () => this.agregarVertices());
        document.getElementById('addAristaBtn').addEventListener('click', () => this.agregarRuta());
        document.getElementById('dfsBtn').addEventListener('click', () => this.buscarDFS());
        document.getElementById('dijkstraBtn').addEventListener('click', () => this.buscarDijkstra());
    }

    agregarVertices() {
        const vertices = this.vista.obtenerVertices();
        if (vertices.length > 0) {
            this.grafo.addVertices(...vertices);
            this.vista.limpiarInputVertices();
            this.mostrarAlerta(`Zonas agregadas: ${vertices.join(', ')}`, 'success');
        } else {
            this.mostrarAlerta('Por favor, ingrese al menos un vértice.', 'error');
        }
    }

    agregarRuta() {
        const { inicio, fin, peso } = this.vista.obtenerRuta();

        if (this.grafo.addConnection(inicio, fin, peso)) {
            this.mostrarAlerta(`Ruta agregada: ${inicio} -> ${fin} (Peso: ${peso})`, 'success');
        } else {
            this.mostrarAlerta(`Error: No se pudo agregar la ruta ${inicio} -> ${fin}`, 'error');
        }

        this.vista.limpiarInputsRuta();
    }

    buscarDFS() {
        const vertices = this.grafo.vertices;

        if (vertices.length > 0) {
            let recorrido = 'Recorrido: ';
            this.grafo.dfs(vertices[0], val => {
                recorrido += `${val} `;
            });
            this.vista.mostrarSalida(recorrido);
        } else {
            this.vista.mostrarSalida('No hay vértices en el grafo.');
        }
    }

    buscarDijkstra() {
        const inicio = document.getElementById('dijkstraInicio').value;
        if (this.grafo.hasVertex(inicio)) {
            const distancias = this.grafo.dijkstra(inicio);
            let resultado = 'Distancias: ';
            for (let [vertex, distance] of distancias) {
                resultado += `${vertex}: ${distance}, `;
            }
            this.vista.mostrarSalida(resultado);
        } else {
            this.mostrarAlerta(`Error: El vértice ${inicio} no existe en el grafo.`, 'error');
        }
    }

    mostrarAlerta(mensaje, tipo) {
        Swal.fire({
            text: mensaje,
            icon: tipo,
            confirmButtonText: 'OK'
        });
    }
}

new App();
