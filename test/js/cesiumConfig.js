const cesiumAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDk0OTM5My01ZjI0LTRhNzctYWVkMi03ODQ2MjljMzgxOWUiLCJpZCI6MjU5NzA2LCJpYXQiOjE3MzMyMjY1NzR9.s8TT0O17qitRVQmhAlCaCqjwP9AwLOGi8ddYuxpThag';

// TODO: da rimuovere
const targetLocation = {
    destination: Cesium.Cartesian3.fromDegrees(9.04409459281873, 48.833844931564137, 20),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
    }
};

const url = {
    'Carducci': './cesiumTile/Carducci/tileset.json',
    'enea': './cesiumTile/enea/tileset.json',
    'Frana': './cesiumTile/Frana/tileset.json',
    'Montebusca': './cesiumTile/Montebusca/tileset.json',
    'Ottignana': './cesiumTile/Ottignana/tileset.json',
    'Scuola': './cesiumTile/Scuola/tileset.json',
    'Piazza': './cesiumTile/Piazza/tileset.json',
    'PalazzoM': './cesiumTile/PalazzoM/tileset.json',
}

export { cesiumAccessToken, targetLocation, url };