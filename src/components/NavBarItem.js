/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { 
  NavItem, 
  NavLink, 
  Collapse } from 'reactstrap';


export default class NavBarItem extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    collapse: PropTypes.object
  }    
  
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }  
  
  toggle () {
    if (this.props.collapse) {
      this.props.collapse.toggle();
    }
  }
  
  /**
   * Renders a 'reactstrap' NavItem for a Navbar.
   * @returns {String}
   */
  render() {
    return (
        <NavItem>
          <NavLink role='button' onClick={this.toggle}>
            <FontAwesome name={this.props.icon} />
            <span className="d-md-none d-lg-inline pl-1" aria-hidden="true">{this.props.title}</span>
          </NavLink>
        </NavItem>
    )
  }
}
