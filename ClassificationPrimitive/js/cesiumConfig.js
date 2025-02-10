const cesiumAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDk0OTM5My01ZjI0LTRhNzctYWVkMi03ODQ2MjljMzgxOWUiLCJpZCI6MjU5NzA2LCJpYXQiOjE3MzMyMjY1NzR9.s8TT0O17qitRVQmhAlCaCqjwP9AwLOGi8ddYuxpThag';

// TODO: da rimuovere
const targetLocation = {
    destination: Cesium.Cartesian3.fromDegrees(9.04409459281873, 48.833844931564137, 20),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
    }
};
//'Ottignana': './cesiumTile/Ottignana/tileset.json'
const url = {
    'Municipio': './cesiumTile/municipio370/tileset.json'
}

// Definisci le coordinate nel file di configurazione
const cameraCoordinatesOttignana = {
    latitude: 44.05979646643537,
    longitude: 11.721677463822934,
    height: 595.5303071202632,
    heading: 247.2792183999494,
    pitch: -51.41269938618037,
    roll: 0.0007996815697433825
};

const cameraCoordinatesMunicipio = {
    latitude: 44.07904353732693,
    longitude: 11.744023141861556,
    height: 416.64665446397925,
    heading: 318.06315301233343,
    pitch: -50.94584504019729,
    roll: 0.00002099152950258421
};


export { cesiumAccessToken, targetLocation, url, cameraCoordinatesOttignana, cameraCoordinatesMunicipio };