const cesiumAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDk0OTM5My01ZjI0LTRhNzctYWVkMi03ODQ2MjljMzgxOWUiLCJpZCI6MjU5NzA2LCJpYXQiOjE3MzMyMjY1NzR9.s8TT0O17qitRVQmhAlCaCqjwP9AwLOGi8ddYuxpThag';

const targetLocation = {
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
    }
};

export { cesiumAccessToken, targetLocation };