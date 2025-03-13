import { Ion, Terrain, createOsmBuildingsAsync, Viewer, Cesium3DTileset, Cesium3DTile } from "cesium";
import { locations } from "./js/Location.js";
import { accessToken } from "./js/CesiumConfig.js";

Ion.defaultAccessToken = accessToken

// Inizializza il viewer Cesium
const viewer = new Viewer("cesiumContainer", {
    terrain: Terrain.fromWorldTerrain(),
});

// Funzione per aggiungere un tileset alla scena
async function addTilesetToScene(location, index) {
    try {
        const tileset = await Cesium3DTileset.fromUrl(location.url); // Carica il tileset dal percorso specificato

        // Aggiunge il tileset alla scena
        viewer.scene.primitives.add(tileset);

        // Se è il primo tileset, teletrasporta la camera su di esso
        if (index === 0) {
            await viewer.zoomTo(tileset);
        }
    } catch (error) {
        console.error(`Errore nel caricamento del tileset ${location.name}:`, error);
    }
}

// Aggiungi tutti i tileset elencati in Location.js
locations.forEach((location, index) => {
    addTilesetToScene(location, index);
});
