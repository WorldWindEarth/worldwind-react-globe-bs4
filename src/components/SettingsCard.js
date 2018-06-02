/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, {Component} from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import Globe from 'worldwind-react-globe'
import { 
  Button, 
  Card, 
  CardHeader, 
  CardBody, 
  Collapse } from 'reactstrap'
import LayerList  from './LayerList'

/**
 * A collapsible Card for managing settings.
 */
const SettingsCard = observer(class SettingsCard extends Component {
        
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
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
    
  render() {
    
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
            separatorAfter={++i < this.props.categories.length}
            lastUpdate={this.props.globe.getCategoryTimestamp(category).get()} />
        )
      }
    }
    return (
      <Collapse isOpen={this.state.isOpen}>
        <Card className="globe-card w-100 interactive">
            <CardHeader>
                <h5 className="card-title">
                    <FontAwesome name={this.props.icon}/> {this.props.title}
                    <Button className="close pull-right" aria-label="Close" onClick={this.toggle} >
                        <span aria-hidden="true">&times;</span>
                    </Button>
                </h5>
            </CardHeader>
            <CardBody>
              {layerLists}
            </CardBody>
        </Card>
      </Collapse>
    )
  }
})
export default SettingsCard
