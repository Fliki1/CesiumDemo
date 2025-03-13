import { cesiumAccessToken, url } from "./cesiumConfig.js";
import { trees } from "./coordinate.js";
import { createModel } from "./cesiumFun.js";


Cesium.Ion.defaultAccessToken = cesiumAccessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain({
        requestWaterMask: true,
        requestVertexNormals: true,
    }),
});

viewer.scene.setTerrain(
    new Cesium.Terrain(
        Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
            "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
        ),
    ),
);

// Creiamo i modelli (tree) mancanti
// createModel(viewer, url, lon, lat, height)
trees.features.forEach(feature => {
    createModel(viewer, url.treeGlb, feature.geometry.coordinates[0], feature.geometry.coordinates[1], 0)
});

// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);


// Abilita il campionamento del terreno per correggere posizionamenti basati sul terreno
viewer.scene.globe.depthTestAgainstTerrain = true;

// Restante codice per caricare il tileset
try {
    const tileset1 = await Cesium.Cesium3DTileset.fromUrl(url.Cardicci);

    // Calcola il bounding sphere del tileset per posizionarlo correttamente
    const boundingSphere = tileset1.boundingSphere;
    const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);

    // Definisci l'offset del modello in altezza
    const heightOffset = 0; // Cambia questo valore se necessario
    const newHeight = cartographic.height + heightOffset;

    // Trasla il modello al livello corretto
    const surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
    const newPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, newHeight);
    const translation = Cesium.Cartesian3.subtract(newPosition, surfacePosition, new Cesium.Cartesian3());
    const modelMatrix = Cesium.Matrix4.fromTranslation(translation);

    // Applica la nuova matrice al modello
    tileset1.modelMatrix = modelMatrix;

    // Aggiungi il tileset alla scena
    viewer.scene.primitives.add(tileset1);

    // Porta la camera sul modello
    await viewer.zoomTo(tileset1);

    // Applica lo stile di default se esiste
    const extras = tileset1.asset.extras;
    if (
        Cesium.defined(extras) &&
        Cesium.defined(extras.ion) &&
        Cesium.defined(extras.ion.defaultStyle)
    ) {
        tileset1.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
    }

    // Opzionalmente, disabilita il terreno nella zona del modello
    viewer.scene.globe.depthTestAgainstTerrain = false; // Rimuove problemi di profondità
} catch (error) {
    console.log(error);
}
