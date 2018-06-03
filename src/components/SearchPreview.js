/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Globe from 'worldwind-react-globe'
import { 
  Alert,
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter } from 'reactstrap'

import style from './SearchPreview.css'

/* global WorldWind */

class SearchPreview  extends Component{
  
  static propTypes = {
    title: PropTypes.string,
    results: PropTypes.array.isRequired,
    handleHideModal: PropTypes.func.isRequired,
    handleGotoSelection: PropTypes.func.isRequired,
    showApiWarning: PropTypes.bool
  }  
  static defaultProps = {
    title: 'Search Results',
    showApiWarning: true
  }  
  
  constructor(props) {
    super(props)
    this.state = {
      showWarning: this.props.showApiWarning
    }
    this.dismissWarning = this.dismissWarning.bind(this)
    this.handleGotoClick = this.handleGotoClick.bind(this)
    this.handlePreviewClick = this.handlePreviewClick.bind(this)
    this.globeRef = React.createRef()
    
    this.globe = null;
    this.selection = null
    this.resultsLayer = null
    this.placemarkAttributes = new WorldWind.PlacemarkAttributes(null)
    this.placemarkAttributes.imageSource = "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-red.png"
    this.placemarkAttributes.imageScale = 0.5
    this.placemarkAttributes.imageOffset = new WorldWind.Offset(
          WorldWind.OFFSET_FRACTION, 0.3,
          WorldWind.OFFSET_FRACTION, 0.0)    
  }
  
  dismissWarning() {
    this.setState({
      showWarning: false
    })
  }


  handlePreviewClick(result) {
    let latitude = parseFloat(result.lat),
        longitude = parseFloat(result.lon)      
    this.globeRef.current.goTo(latitude, longitude) 
    // Update the selection used for the Go To button
    this.selection = result
  }

  handleGotoClick() {
    // Call the parent's handler to process the selection
    this.props.handleGotoSelection(this.selection)
  }
  
  createMarker(result) {
    let marker = new WorldWind.Placemark(
        new WorldWind.Position(
            parseFloat(result.lat),
            parseFloat(result.lon), 100))
    marker.attributes = this.placemarkAttributes
    marker.altitudeMode = WorldWind.RELATIVE_TO_GROUND
    marker.displayName = result.display_name  
    return marker
  }
  
  /**
   * Updates the preview globe AFTER the modal is shown.
   * This cannot be done in componentDidMount because the modal is not being shown
   * at that time
   * @param {type} prevProps
   * @param {type} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.globeRef.current) {
      const globe = this.globeRef.current
      const resultsLayer = globe.addLayer('renderables');
      this.props.results.forEach((result) => {        
        resultsLayer.addRenderable(this.createMarker(result)) 
     })  
    }
  }
  
  render() {
       
    this.selection = this.props.results[0]
    const tableRows = this.props.results.map((result) =>
        <tr key={result.place_id} onClick={()=>this.handlePreviewClick(result)}>
            <td>{result.display_name}</td>
            <td>{result.type}</td>
        </tr>  
    )
  
    return (
      <Modal isOpen={this.props.results.length > 0} toggle={this.props.handleHideModal} className={style.modal}>
        <ModalHeader toggle={this.props.handleHideModal}>{this.props.title}</ModalHeader>
        <ModalBody>
          <div className={style.globe}>
            <Globe id="preview-globe" projection="Mercator" ref={this.globeRef}/>
          </div>
          <div className={style.table}>
              <Alert color="warning" isOpen={this.state.showWarning}>
                <Button className="close pull-right" aria-label="Close" onClick={this.dismissWarning} >
                  <span aria-hidden="true">&times;</span>
                </Button>
                MapQuest API key missing. Get a free key at <a href="https://developer.globequest.com/" className="alert-link" rel="noopener noreferrer" target="_blank">developer.globequest.com</a> and set the MAPQUEST_API_KEY variable to your key.
              </Alert>                                     
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows}
                </tbody>
              </table>                                       
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.handleGotoClick}>Go To</Button>{' '}
          <Button onClick={this.props.handleHideModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
};

export default SearchPreview;
