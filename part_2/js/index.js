import { cesiumAccessToken, targetLocation, url } from "./cesiumConfig.js";
import { trees } from "./coordinate.js";
import { createModel } from "./cesiumFun.js";

// Your access token can be found at: https://ion.cesium.com/tokens.
// Replace `your_access_token` with your Cesium ion access token.

Cesium.Ion.defaultAccessToken = cesiumAccessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer');

// Creiamo i modelli (tree) mancanti
// createModel(viewer, url, lon, lat, height)
trees.features.forEach(feature => {
    createModel(viewer, url.treeGlb, feature.geometry.coordinates[0], feature.geometry.coordinates[1], 0)
});

// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo(targetLocation);
