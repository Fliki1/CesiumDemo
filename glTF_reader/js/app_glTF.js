import { cesiumAccessToken } from "./cesiumConfig.js";

// Configura il token Cesium Ion
Cesium.Ion.defaultAccessToken = cesiumAccessToken;

const viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: new Cesium.EllipsoidTerrainProvider()
});

try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(3000521, {
        //This tileset doesn't have a location, so we're using a modelMatrix to place it at 0, 0 instead of drawing at the center of the earth
        modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(0, 0),
        ),
    });
    viewer.scene.primitives.add(tileset);
    await viewer.zoomTo(tileset);




} catch (error) {
    console.log(error);
}

