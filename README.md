# Cesium Test & Demo Repository

Questo repository contiene una serie di preliminary test e demo utilizzando Cesium, una piattaforma open-source per la visualizzazione di dati 3D geospaziali. Il progetto include esempi pratici per l'importazione di diversi tipi di dati geospaziali, tra cui:

* Modelli 3D
* Bing/Google/Cesium World Terrain
* Sistemi OSM (OpenStreetMap)
* Strutture KML e GeoJSON

Gran parte degli esperimenti sono presenti nella cartella [text](test) con la seguente struttura: 

```
test/
├── cesiumTile/     # 3D Tile models
│   └── tileset_folders/
├── css/         
├── data/           # free geospatial data formats
├── glbData/        # free samples models
├── js/
│   ├── cesimConfig.js      # cesiumAccessToken and tileset urls
│   ├── cesiumFun.js        # export function to load tileset  
│   ├── index.js            # main 3D tileset upload
│   └── debugBoundingBox.js # set bounding box tile glb and wireframe model
└── index.html      # main html
```

Inoltre, il repository fornisce una GUI che permette di applicare o rimuovere effetti visivi sui modelli e sulle strutture, come la visualizzazione di texture, illuminazione e altro.

## Note d'uso
Per facilitare l'utilizzo di un server locale è possibile utilizare una Extension di Visual Studio: Live Server (ritwickdey.LiveServer) il quale riesce a simulare un server sul file index.html delle singole demo. Una volta importata l'estensione, tasto destro sul file html per avviare e stoppare il server locale.

<center><img src="img/image.png" width="200" align="center"></center>

Si verrà reindirizzati su un indirizzo simile http://127.0.0.1:1234/index.html

---

Un altro metodo è scaricare e installare Node.js e npm da https://nodejs.org/en/download/

Nella riga di comando, eseguire:
```
npm install http-server -g
```
Questo installerà l'app http-server da https://github.com/http-party/http-server su visibilità globale.

Nella directory che contiene i dati di esempio (test), eseguire:
```
http-server -a localhost -p 8003 --cors=http://localhost:8080/
```
Questo avvierà il server all'indirizzo `localhost`, utilizzando la porta `8003`. Il parametro `cors` permetterà a Cesium di accedere ai dati da questo server eseguito localmente.

In questa casistica è richiesto che un tileset debba essere referato impostando l'URL caricato dal server locale:

```
const tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url : 'http://localhost:8003/example/tileset.json'
}));
```

## Main results

<center><img src="img/test.png" width="600" align="center"></center>

Da immagine è possibile vedere un set di modelli tiled importati correttamente e visualizzati sopra una mappa geospaziale di Cesium, insieme a modelli forniti da OpenStreetMap. 

A seguito della naturale conformità delle frane è stato necessario in corrispondenza di questi modelli eseguire un'operazione di sottrazione sulla superficie del terreno, che ha rimosso la parte di suolo che sovrastava la frana. Senza questo i modelli in questione sarebbero stati visibili solo in parte, poiché coperti dal terreno circostante.

<center><img src="img/tile resolution.png" width="500" align="center"></center>

Diverse prove sono state effettuate dimostrando come la qualità dei modelli tiled è alta, con una visualizzazione chiara dei dettagli architettonici grazie alla loro intrinseca struttura di suddivisione in piccoli tiles che rappresentano sezioni geografiche del modello. Ogni tile può avere diversi livelli di dettaglio (LOD) che vengono renderizzati sequenzialmente in base alla distanza dalla camera.

<center><img src="img/bounding box.png" width="600" align="center"></center>

Nell'immagine sono visibili le bounding box dei tile che costutuiscono l'edificio. Grazie alla modalità wireframe, è possibile osservare il progressivo aumento dei dettagli che vengono caricati man mano che la camera si avvicina, seguendo le caratteristiche tipiche dei modelli tileset.

Questa differenza si nota maggiormente nei modelli in formato obj i quali, oltre alla necessità di essere convertiti in CesiumION in quanto non direttamente importabili su CesiumJS, riportano solamente un unico livello di dettaglio.

<center><img src="img/obj.png" width="600" align="center"></center>

Nei modelli Tiled, abbiamo integrato strutture KML e GeoJSON, rendendole interattive e cliccabili per visualizzare informazioni sulle zone di interesse.

<center><img src="img/gif.gif" width="600" align="center"></center>
<center><img src="img/infobox.png" width="300" align="center"></center>

Gli esperimenti sono stati condotti sui modelli ottenuti dalle survey realizzate per l'Innovation Grant HaMMon nel comune di Tredozio.

## Acknowledgements

This work is supported by Italian Research Center on High Performance Computing Big Data and Quantum Computing (ICSC), project funded by European Union - NextGenerationEU - and National Recovery and Resilience Plan (NRRP) - Mission 4 Component 2 within the activities of Spoke 3 (Astrophysics and Cosmos Observations