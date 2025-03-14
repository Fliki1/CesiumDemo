import { cesiumAccessToken } from "./cesiumConfig.js";

Cesium.Ion.defaultAccessToken = cesiumAccessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
    timeline: false, // Disabilita la barra temporale
    animation: false, // Facoltativo: rimuove anche il widget di animazione

    //baseLayer: false, // Disabilita i livelli base (satellite o stradali), per integrare i nostri magari (ma non facciamo questo)
    baseLayerPicker: false, // Disabilita il selettore dei livelli base (sopra)
    infoBox: false, // Disabilita la Info Box, un pannello interattivo che appare quando si clicca su un oggetto nella scena
    geocoder: false, // disabilita il tasto cerca luoghi

    terrain: Cesium.Terrain.fromWorldTerrain({
        requestWaterMask: true,
        requestVertexNormals: true,
    }),
});

// URL dei tileset
const url = {
    model1: './cesiumTile/Tiled_Cesium/Tiled_Maresa_512_Cesium1.1/tileset.json',
    model2: './cesiumTile/Tiled_Cesium/Tiled_Maresa_4096_Cesium1.1/tileset.json'
};

try {
    // Carica il tileset
    const Maresa_512 = await Cesium.Cesium3DTileset.fromUrl('./cesiumTile/Tiled_Cesium/Tiled_Maresa_512_Cesium1.1/tileset.json');

    // Applica un offset di altezza (opzionale)
    const heightOffset = 43; // Modifica questo valore se necessario
    const boundingSphere = Maresa_512.boundingSphere;
    const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
    const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    Maresa_512.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    Maresa_512.splitDirection = Cesium.SplitDirection.LEFT;

    // Aggiungi il tileset alla scena
    viewer.scene.primitives.add(Maresa_512);

} catch (error) {
    console.error(`Errore durante il caricamento del tileset:`, error);
}

try {
    // Carica il tileset
    const Maresa_4096 = await Cesium.Cesium3DTileset.fromUrl('./cesiumTile/Tiled_Cesium/Tiled_Maresa_4096_Cesium1.1/tileset.json');

    // Applica un offset di altezza (opzionale)
    const heightOffset = 43; // Modifica questo valore se necessario
    const boundingSphere = Maresa_4096.boundingSphere;
    const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
    const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    Maresa_4096.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    Maresa_4096.splitDirection = Cesium.SplitDirection.RIGHT;

    // Aggiungi il tileset alla scena
    viewer.scene.primitives.add(Maresa_4096);

    // Salva l'ultimo tileset caricato
    let lastTileset = Maresa_4096;
    await viewer.zoomTo(lastTileset);
} catch (error) {
    console.error(`Errore durante il caricamento del tileset:`, error);
}

// Seleziona gli elementi HTML
const slider = document.getElementById("slider");
const sliderHandle = document.getElementById("sliderHandle");
const textLeft = document.getElementById("textLeft");
const textRight = document.getElementById("textRight");

// Ottieni la larghezza del contenitore del slider
const sliderContainer = slider.parentElement;

// Monitoriamo gli eventi di input associati allo slider
const handler = new Cesium.ScreenSpaceEventHandler(slider);
let moveActive = false; // Status di movimento dello slider: inizialmente fermo

// Funzione di movimento dello slider
function move(movement) {
    if (!moveActive) {
        return;
    }

    // Calcoliamo la posizione orizzontale del mouse
    const relativeOffset = movement.endPosition.x;
    const splitPosition =
        (slider.offsetLeft + relativeOffset) / sliderContainer.offsetWidth; // Posizione normalizzata

    // Muoviamo lo slider
    slider.style.left = `${100.0 * splitPosition}%`;
    viewer.scene.splitPosition = splitPosition;

    // Calcoliamo la posizione attuale dello slider
    const sliderPosition = slider.offsetLeft + sliderHandle.offsetWidth / 2;

    // Otteniamo le posizioni relative dei div sinistro e destro rispetto al contenitore
    const leftEdge = sliderContainer.offsetWidth * 0.40;  // 10% a sinistra
    const rightEdge = sliderContainer.offsetWidth * 0.60; // 10% a destra

    // Nascondiamo o mostriamo i testi in base alla posizione dello slider
    if (sliderPosition < leftEdge) {
        // Nascondi il testo sinistro
        textLeft.style.opacity = 0;
    } else {
        // Mostra il testo sinistro
        textLeft.style.opacity = 1;
    }

    if (sliderPosition > rightEdge) {
        // Nascondi il testo destro
        textRight.style.opacity = 0;
    } else {
        // Mostra il testo destro
        textRight.style.opacity = 1;
    }
}

// Gestione degli eventi per il movimento del mouse e touch
handler.setInputAction(function () {
    moveActive = true; // Attiviamo il movimento
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

handler.setInputAction(function () {
    moveActive = true; // Attiviamo il movimento su touch
}, Cesium.ScreenSpaceEventType.PINCH_START);

// Aggiorniamo la posizione dello slider durante il trascinamento
handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

// Termina il movimento dello slider
handler.setInputAction(function () {
    moveActive = false; // Disattiviamo il movimento
}, Cesium.ScreenSpaceEventType.LEFT_UP);

handler.setInputAction(function () {
    moveActive = false; // Disattiviamo il movimento su touch
}, Cesium.ScreenSpaceEventType.PINCH_END);

