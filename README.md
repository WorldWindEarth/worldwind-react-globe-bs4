# worldwind-react-globe-bs4

> React Globe UI components using Bootstrap and the [Web WorldWind](https://github.com/NASAWorldWind/WebWorldWind) virtual globe SDK from [NASA & ESA](https://worldwind.arc.nasa.gov/web/)).

[![NPM](https://img.shields.io/npm/v/worldwind-react-globe-bs4.svg)](https://www.npmjs.com/package/worldwind-react-globe-bs4) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save worldwind-react-globe-bs4
```

## Usage

```jsx

import React, { Component } from 'react'
import Globe from 'worldwind-react-globe'
import { Layers, Markers, Settings, Tools } from 'worldwind-react-globe-bs4'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 34.2,
      lon: -119.2,
      alt: 10e6
    }
    this.globeRef = React.createRef()
    this.markersRef = React.createRef()
    this.globe = null
  }
  
  componentDidMount() {
    // Get the component with the WorldWindow after mounting
    this.globe = this.globeRef.current
  }
  
  render() {
    const layers = [
      "eox-sentinal2-labels",
      "compass",
      "coordinates",
      "view-controls",
      "stars"
    ]
    const styleNoPointer = {
      pointerEvents: 'none'
    }
    let baseLayers = (this.globe ? this.globe.getLayers('base') : []);
    let overlayLayers = (this.globe ? this.globe.getLayers('overlay') : []);
    let settingLayers = (this.globe ? this.globe.getLayers('settings') : []);
    return (
      <div className='App container-fluid p-0'>
          <div className='globe'>
              <Globe 
                  ref={this.globeRef} 
                  layers={layers}/>
          </div>
          <div className='globe-overlay noninteractive'>
              <Tools 
                  globe={this.globeRef.current} 
                  markers={this.markersRef.current}
                  markersLayerName='Markers'/>
          </div>
          <div className='globe-overlay noninteractive'>
              <div className='card-columns'>
                  <div id='layers' className='collapse interactive'>
                      <Layers
                          layerLists={[baseLayers, overlayLayers]} 
                          globe={this.globe} />
                  </div>
                  <div id='markers' className='collapse interactive'>
                      <Markers 
                          ref={this.markersRef}
                          globe={this.globeRef.current}
                          markersLayerName='Markers' />
                  </div>
                  <div id='settings' className='collapse interactive'>
                      <Settings
                          layerLists={[settingLayers]} 
                          globe={this.globe} />
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

```

## License

MIT © [Bruce Schubert](https://github.com/emxsys)
