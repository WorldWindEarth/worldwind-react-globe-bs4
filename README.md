# worldwind-react-globe-bs4

> React Bootstrap UI components for the [worldwind-react-globe](https://github.com/emxsys/worldwind-react-globe) virtual globe componen, featuring:
> - Customizable NavBar menu with mobile support
> - Layer manager for base layers and overlays
> - Marker palette and marker manager
> - Place name search
> - Settings manager

[![NPM](https://img.shields.io/npm/v/worldwind-react-globe-bs4.svg)](https://www.npmjs.com/package/worldwind-react-globe-bs4) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save worldwind-react-globe
npm install --save worldwind-react-globe-bs4
```

## Example 

```jsx
import React, { Component } from 'react'
import Globe from 'worldwind-react-globe'
import { 
  CardColumns, 
  Collapse, 
  Container } from 'reactstrap'
import { 
  LayersCard, 
  MarkersCard, 
  NavBar, 
  NavBarItem, 
  SearchBox, 
  SettingsCard, 
  Tools } from 'worldwind-react-globe-bs4'

import './App.css'

export default class App extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      lat: 34.2,
      lon: -119.2,
      alt: 10e6,
      globe: null
    }
    this.globeRef = React.createRef()
    this.layersRef = React.createRef()
    this.markersRef = React.createRef()
    this.settingsRef = React.createRef()
  }
  
  componentDidMount() {
    // Get the component with the WorldWindow after mounting
    this.setState({globe: this.globeRef.current})
  }
  
  render() {
    const globe = this.globeRef.current
    
    const layers = [
      {layer: 'blue-marble', options: {category: 'base', enabled: false}},
      {layer: 'blue-marble-landsat', options: {category: 'base', enabled: false}},
      {layer: 'eox-sentinal2', options: {category: 'base', enabled: false}},
      {layer: 'eox-sentinal2-labels', options: {category: 'base', enabled: true}},
      {layer: 'eox-openstreetmap', options: {category: 'overlay', enabled: false, opacity: 0.8}},
      {layer: 'renderables', options: {category: 'data', enabled: true, displayName: 'Markers'}},
      {layer: 'compass', options: {category: 'setting', enabled: false}},
      {layer: 'coordinates', options: {category: 'setting', enabled: true}},
      {layer: 'view-controls', options: {category: 'setting', enabled: true}},
      {layer: 'stars', options: {category: 'setting', enabled: false}},
      {layer: 'atmosphere-day-night', options: {category: 'setting', enabled: false}}
    ]
    
    const navbarItems = [
      <NavBarItem key='lyr' title='Layers' icon='list' collapse={this.layersRef.current}/>,
      <NavBarItem key='mkr' title='Markers' icon='map-marker' collapse={this.markersRef.current}/>,
      <NavBarItem key='set' title='Settings' icon='cog' collapse={this.settingsRef.current}/>
    ]
   
    const navbarSearch = <SearchBox globe={globe}/>
    
    return (
      <div>
        <NavBar 
            logo=''
            title='worldwind-react-globe-bs4'
            href='https://github.com/emxsys/worldwind-react-globe-bs4'
            items={navbarItems}
            search={navbarSearch} />
        <Container fluid className='p-0'>
          <div className='globe'>
              <Globe 
                ref={this.globeRef} 
                layers={layers}/>
          </div>
          <div className='overlayTools noninteractive'>
              <Tools 
                globe={globe} 
                markers={this.markersRef.current}
                markersLayerName='Markers'/>
          </div>
          <div className='overlayCards noninteractive'>
            <CardColumns>
              <LayersCard
                ref={this.layersRef}
                categories={['overlay', 'base']} 
                globe={globe} />
              <MarkersCard
                ref={this.markersRef}
                globe={globe}
                markersLayerName='Markers' />
              <SettingsCard
                ref={this.settingsRef}
                categories={['setting']} 
                globe={globe} />
            </CardColumns>
          </div>
        </Container>
      </div>
    )
  }
}

```

## License

MIT © [Bruce Schubert](https://github.com/emxsys)
