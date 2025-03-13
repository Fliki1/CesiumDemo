import { cesiumAccessToken, url } from "./cesiumConfig.js";

Cesium.Ion.defaultAccessToken = cesiumAccessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain({
        requestWaterMask: false,
        requestVertexNormals: true,
        navigationHelpButton: false,  // Disabilita il pulsante di aiuto navigazione
    }),
});
viewer.animation.container.style.visibility = 'hidden';  // Nasconde il controllo di animazione
viewer.timeline.container.style.visibility = 'hidden';  // Nasconde la timeline


// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);


// Funzione per caricare e gestire ciascun tileset
async function loadTilesets(urls) {
    let lastTileset; // Variable to keep track of the last loaded tileset
    const fixedTile = ["Scuola", "Piazza", "PalazzoM"];

    for (const name of urls) {
        try {
            const tilesetUrl = url[name];
            if (!tilesetUrl) {
                console.error(`URL not found for ${name}`);
                continue;
            }

            if (fixedTile.includes(name)) {

                // Carica il tileset
                const tileset = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl);
                // Aggiungi il tileset alla scena
                viewer.scene.primitives.add(tileset);

                // Salva l'ultimo tileset caricato
                lastTileset = tileset;
                continue;
            }

            // Carica il tileset
            const tileset = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl);

            // Calcola il bounding sphere del tileset per posizionarlo correttamente
            const boundingSphere = tileset.boundingSphere;
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
            tileset.modelMatrix = modelMatrix;

            // Aggiungi il tileset alla scena
            viewer.scene.primitives.add(tileset);

            // Salva l'ultimo tileset caricato
            lastTileset = tileset;

            // Opzionalmente, disabilita il terreno nella zona del modello
            viewer.scene.globe.depthTestAgainstTerrain = false; // vedi attraverso il terreno

        } catch (error) {
            console.log(error);
        }
    }

    // Effettua lo zoom sull'ultimo tileset caricato
    if (lastTileset) {
        await viewer.zoomTo(lastTileset);
    }
}

// Esegui il caricamento dei tileset
loadTilesets(Object.keys(url));




/* Gestione altezza
try {
    const tileset1 = await Cesium.Cesium3DTileset.fromUrl(url.Cardicci);

    // Calcola la trasformazione per spostare il modello lungo l'asse Z
    const cartographic = Cesium.Cartographic.fromCartesian(tileset1.boundingSphere.center);
    const heightOffset = 40; // Altezza in metri da aggiungere
    const updatedHeight = cartographic.height + heightOffset;

    const surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
    const updatedPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, updatedHeight);

    const translation = Cesium.Cartesian3.subtract(updatedPosition, surfacePosition, new Cesium.Cartesian3());
    const matrix = Cesium.Matrix4.fromTranslation(translation);

    // Applica la trasformazione
    tileset1.modelMatrix = Cesium.Matrix4.multiply(tileset1.modelMatrix, matrix, new Cesium.Matrix4());

    // Aggiungi il tileset al viewer
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
} catch (error) {
    console.log(error);
}

*/

// Caricamento del GeoJSON
const geoJsonResource = await Cesium.IonResource.fromAssetId(2920938);
const geoJsonDataSource = await Cesium.GeoJsonDataSource.load(geoJsonResource);
viewer.dataSources.add(geoJsonDataSource);

// Flag per tenere traccia della visibilità
let isGeoJsonVisible = true;
document.getElementById("toggleGeoJson").addEventListener("change", function () {
    if (geoJsonDataSource) {
        isGeoJsonVisible = this.checked;
        geoJsonDataSource.show = isGeoJsonVisible;
    }
});



// Caricamento del KML
/* const kmlResource = await Cesium.IonResource.fromAssetId(2920934);
const kmlDataSource = await Cesium.KmlDataSource.load(kmlResource, {
    camera: viewer.scene.camera,
    canvas: viewer.scene.canvas,
});
viewer.dataSources.add(kmlDataSource); */

// Funzione per mostrare informazioni quando si clicca su un'entità
viewer.screenSpaceEventHandler.setInputAction((click) => {
    const pickedObject = viewer.scene.pick(click.position);
    if (Cesium.defined(pickedObject)) {
        const entity = pickedObject.id; // Recupera l'entità cliccata
        if (Cesium.defined(entity)) {
            // Mostra una finestra modale o un popup con le informazioni
            const name = entity.name || "Sconosciuto";
            const description = entity.description?.getValue() || "Nessuna descrizione disponibile";

            alert(`Nome: ${name}\nDescrizione: ${description}`);
        }
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

