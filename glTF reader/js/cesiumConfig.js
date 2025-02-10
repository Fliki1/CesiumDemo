const cesiumAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDk0OTM5My01ZjI0LTRhNzctYWVkMi03ODQ2MjljMzgxOWUiLCJpZCI6MjU5NzA2LCJpYXQiOjE3MzMyMjY1NzR9.s8TT0O17qitRVQmhAlCaCqjwP9AwLOGi8ddYuxpThag';

// TODO: da rimuovere
const targetLocation = {
    destination: Cesium.Cartesian3.fromDegrees(9.04409459281873, 48.833844931564137, 20),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
    }
};

// scegline una sola se stessa struttura
/*
'Maresa_512': './cesiumTile/Tiled_Cesium/Tiled_Maresa_512_Cesium1.1/tileset.json',
'Maresa_4096': './cesiumTile/Tiled_Cesium/Tiled_Maresa_4096_Cesium1.1/tileset.json'
*/
const url = {
    'Maresa_512': './cesiumTile/Tiled_Cesium/Tiled_Maresa_512_Cesium1.1/tileset.json',
    'Maresa_4096': './cesiumTile/Tiled_Cesium/Tiled_Maresa_4096_Cesium1.1/tileset.json'
}

export { cesiumAccessToken, targetLocation, url };