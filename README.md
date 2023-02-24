# README

1. [Running locally](#locally)
2. [Structure](#structure)

<br>
<br>
<br>

<br>

## 1. Running locally <a id="locally"></a>

Run the below commands from the root of the folder

```bash
yarn install # Only needed the 1st time the app is ran, to install all dependencies
yarn srart # This runs the application
yarn build # This builds the application
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see view the application

<br>
<br>

## 2. Project structure <a id="structure"></a>

```shell
├── public
│   └── assets
│
└── src
    ├── components
    │   ├── drawer
    │   │   ├── drawer
    │   │   └── tabs
    │   │
    │   ├── map
    │   │   ├── get-json-layer
    │   │   └── map
    │   │
    │   └── widgets
    │       ├── notifications
    │       ├── popup
    │       └── spinner
    │
    ├── contexts
    │   └── bbox.context
    │ 
    ├── hooks
    │   └── getGeoData
    │ 
    ├── lib
    │   └── service
    │ 
    ├── App
    │ 
    └── index

```

<br>
