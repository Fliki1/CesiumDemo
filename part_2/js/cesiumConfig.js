const cesiumAccessToken = 'token'

const targetLocation = {
    destination: Cesium.Cartesian3.fromDegrees(9.04409459281873, 48.833844931564137, 20),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
    }
};

const url = {
    'treeGlb': './glbData/tree.glb'
}

export { cesiumAccessToken, targetLocation, url };