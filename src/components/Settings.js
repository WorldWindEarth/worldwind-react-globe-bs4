/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome'
import Globe from 'worldwind-react-globe';
import LayerList  from './LayerList';

export default class Settings extends Component {
        
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    globe: PropTypes.instanceOf(Globe)
  }   
  static defaultProps = {
    title: 'Settings',
    icon: 'cog',
    categories: []
  }
  render() {
    
    // Define the .card-body contents
    let layerLists = null
    if (this.props.globe) {
      
      if (this.props.categories.length === 0) {
        // Use a single list for all layers
        layerLists = <LayerList layers={this.props.globe.getLayers()} globe={this.props.globe} />
        
      } else {
        // Use an individual layer list for each category
        let i = 0
        layerLists = this.props.categories.map((category) => 
          <LayerList 
            key={category} 
            layers={this.props.globe.getLayers(category)} 
            globe={this.props.globe}
            separatorAfter={++i < this.props.categories.length}/>
        )
      }
    }
    return (
        <div className="card globe-card w-100">
            <div className="card-header">
                <h5 className="card-title">
                    <FontAwesome name={this.props.icon}/> {this.props.title}
                    <button type="button" className="close pull-right" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </h5>
            </div>
            <div className="card-body">
              {layerLists}
            </div>
        </div>
    )
  }
}
