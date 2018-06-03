/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React from 'react';
import PropTypes from 'prop-types';
import Globe from 'worldwind-react-globe';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';
import SearchPreview from './SearchPreview';

/* global WorldWind */

export default class SearchBox extends React.Component {
    
    static propTypes = {
      globe: PropTypes.instanceOf(Globe),
      mapQuestApiKey: PropTypes.string
    }  
    
    constructor(props) {
      super(props)
      this.state = {
          value: '', 
          results: []
      }
      this.geocoder = new WorldWind.NominatimGeocoder()

      this.handleChange = this.handleChange.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.hideModal = this.hideModal.bind(this)
      this.gotoSelection = this.gotoSelection.bind(this)
    }
    
    handleChange(event) {
      this.setState({value: event.target.value})
    }

    handleClick(event) {
      event.preventDefault();
      this.performSearch();
    }
    
    handleSubmit(event) {
      event.preventDefault()
      this.performSearch()
      return false   // prevent page from refreshing
    }

    hideModal() {
      // Nothing to display
      this.setState({results: []})
    }
    
    gotoSelection(selection) {
      if (selection) {
        const latitude = parseFloat(selection.lat)
        const longitude = parseFloat(selection.lon)
        // Update the globe 
        this.props.globe.goTo(latitude, longitude)
        this.hideModal();
      }
    }
  
    performSearch () {
      const globe = this.props.globe

      if (!this.props.mapQuestApiKey) {
          console.error("SearchViewModel: A MapQuest API key is required to use the geocoder in production. Get your API key at https://developer.mapquest.com/")
      }
      const queryString = this.state.value
      if (queryString) {
        if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
            // Treat the text as a lat, lon pair 
            let tokens = queryString.split(",")
            let latitude = parseFloat(tokens[0])
            let longitude = parseFloat(tokens[1])
            // Center the globe on the lat, lon
            globe.wwd.goTo(new WorldWind.Location(latitude, longitude))
        } else {
            // Treat the text as an address or place name
            let self = this
            this.geocoder.lookup(queryString, function (geocoder, results) {
                // Open the modal dialog to preview and select a result
                // The modal is rendered when results > 0
                self.setState({results: results})
            }, this.props.mapQuestApiKey)
        }
      }
    }
    
    render() {
      return (
          <form className="form-inline" onSubmit={this.handleSubmit}>
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" value={this.state.value} onChange={this.handleChange}/>
              <Button color="success" onClick={this.handleClick}>
                  <FontAwesome name='search'/> 
              </Button>
              <SearchPreview 
                results={this.state.results}
                handleHideModal={this.hideModal}
                handleGotoSelection={this.gotoSelection}
                showApiWarning={!this.props.mapQuestApiKey}/>
          </form>
      );
    }
};
