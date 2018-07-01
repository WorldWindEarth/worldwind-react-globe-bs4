/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, {Component} from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import { 
  Nav, 
  Navbar, 
  NavbarBrand, 
  NavbarToggler, 
  NavItem, 
  NavLink, 
  Collapse } from 'reactstrap';

export default class NavBar extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    logo: PropTypes.string,
    items: PropTypes.array,
    search: PropTypes.object
  }   
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  
  componentDidMount() {
    // Auto-collapse the _mobile_ main menu when its button items are clicked
    $('.navbar-collapse a[role="button"]').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
  }
  
  /**
   * Renders a BootStrap NavBar with branding, buttons and a search box.
   * @returns {String}
   */
  render() {
    
    const logo = this.props.logo ? <img src={this.props.logo} width='32' height='32' className='d-inline-block align-top' alt=''/> : null;
    return (
      <Navbar dark color='dark' fixed='top' expand='md'>
        <NavbarBrand href={this.props.href}>
          {logo}
          {this.props.title}
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='mr-auto' navbar>
            {this.props.items}
          </Nav>
          <Nav className='ml-auto' navbar>
            {this.props.search}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
