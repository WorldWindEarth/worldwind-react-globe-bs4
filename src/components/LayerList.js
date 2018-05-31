/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Globe from 'worldwind-react-globe';

import LayerButton from './LayerButton';
import './Layers.css';

export default class LayerList extends Component {
    static propTypes = {
        layers: PropTypes.array.isRequired,
        separatorAfter: PropTypes.bool,
        globe: PropTypes.instanceOf(Globe)
    }   

    render() {
        // Create a list of items for React to render; 
        // Reverse the layers so the top-most layer is displayed first
        let layerElements = this.props.layers.map((layer) =>
            <LayerButton key={layer.uniqueId} layer={layer} enabled={layer.enabled} globe={this.props.globe} />
        );
        layerElements.reverse();

        let separator = this.props.separatorAfter ? <hr/> : null;
        
        return (
            <div>
              <div className="list-group">
                {layerElements}
              </div>
              {separator}
            </div>
            );
    }
};
