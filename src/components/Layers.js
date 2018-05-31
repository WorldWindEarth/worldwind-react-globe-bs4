/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Globe from 'worldwind-react-globe';
import LayerList  from './LayerList';
import './Layers.css';

export default class Layers extends Component {

  static propTypes = {
      layerLists: PropTypes.array.isRequired,
      globe: PropTypes.instanceOf(Globe)
  }   

  render() {
    // TODO: process layer lists by category.
    let key = 1
    let cardBody = this.props.layerLists.map((layerList) =>
      <LayerList key={key++} layers={layerList} globe={this.props.globe} />
    )
    return (
        <div className="card globe-card w-100">
            <div className="card-header">
                <h5 className="card-title">
                    <span className="fas fa-list" aria-hidden="true"></span> Layers
                    <button type="button" className="close pull-right" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </h5>
            </div>
            <div className="card-body">
              {cardBody}
            </div>
        </div>
    );
  }
};
