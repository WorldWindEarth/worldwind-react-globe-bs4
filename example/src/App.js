/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, { Component } from 'react'
import Globe from 'worldwind-react-globe'
import { Layers, Markers, NavBar, NavItem, SearchBox, Settings, Tools } from 'worldwind-react-globe-bs4'
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
    this.markersRef = React.createRef()
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
    
    const styleNoPointer = {
      pointerEvents: 'none'
    }
    
    const navbarItems = [
      <NavItem key='lyr' title='Layers' icon='list' href='#layers'/>,
      <NavItem key='mkr' title='Markers' icon='map-marker' href='#markers'/>,
      <NavItem key='set' title='Settings' icon='cog' href='#settings'/>
    ]
   
    const navbarSearch = <SearchBox globe={globe}/>
    
    return (
      <div>
        <NavBar 
            title='worldwind-react-globe-bs4'
            logo=''
            href='https://github.com/emxsys/worldwind-react-globe-bs4'
            items={navbarItems}
            search={navbarSearch} />
        <div className='container-fluid p-0'>
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
                <div className='card-columns'>
                    <div id='layers' className='collapse interactive'>
                      <Layers
                        categories={['overlay', 'base']} 
                        globe={globe} />
                    </div>
                    <div id='markers' className='collapse interactive'>
                        <Markers 
                          ref={this.markersRef}
                          globe={globe}
                          markersLayerName='Markers' />
                    </div>
                    <div id='settings' className='collapse interactive'>
                      <Layers
                          title='Settings'
                          icon='cog'
                          categories={['setting']} 
                          globe={globe} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
