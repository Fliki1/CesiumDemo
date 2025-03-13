import { cesiumAccessToken, cameraCoordinatesTileset } from "./cesiumConfig.js";

Cesium.Ion.defaultAccessToken = cesiumAccessToken;

// Funzione asincrona per inizializzare Cesium e caricare il tileset
async function initCesium() {
    // Inizializza il viewer di Cesium
    const viewer = new Cesium.Viewer("cesiumContainer", {
        terrain: Cesium.Terrain.fromWorldTerrain({
            requestWaterMask: true,
            requestVertexNormals: true,
        }),
    });

    try {
        // Carica il 3D Tileset locale
        const tileSet = await Cesium.Cesium3DTileset.fromUrl("../cesiumTile/tileset.json");

        // Aggiungi il tileset alla scena
        viewer.scene.primitives.add(tileSet);

        // Usa le coordinate importate per posizionare la camera
        const cartographic = Cesium.Cartographic.fromDegrees(
            cameraCoordinatesTileset.longitude,
            cameraCoordinatesTileset.latitude,
            cameraCoordinatesTileset.height
        );

        const destination = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            cartographic.height
        );

        viewer.camera.setView({
            destination: destination,
            orientation: {
                heading: Cesium.Math.toRadians(cameraCoordinatesTileset.heading),
                pitch: Cesium.Math.toRadians(cameraCoordinatesTileset.pitch),
                roll: Cesium.Math.toRadians(cameraCoordinatesTileset.roll),
            },
        });

        // Attendi il caricamento del tileset prima di attivare debug e wireframe
        await tileSet.readyPromise;

        // Mostra le bounding box e attiva la modalità wireframe
        tileSet.debugShowBoundingVolume = true;
        tileSet.debugWireframe = true;

    } catch (error) {
        console.error("Errore nel caricamento del tileset:", error);
    }
}

// Avvia l'inizializzazione di Cesium
initCesium();








