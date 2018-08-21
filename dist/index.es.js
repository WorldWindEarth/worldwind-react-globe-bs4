import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Globe from 'worldwind-react-globe';
import { observer } from 'mobx-react';
import FontAwesome from 'react-fontawesome';
import { Alert, Button, ButtonDropdown, Card, CardBody, CardHeader, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import $ from 'jquery';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
/* global WorldWind */

/**
 * Renders a button for toggling the enabled state of a WorldWind.Layer.
 * Expects a layer={WorldWind.Layer} property assignment.
 * @type type
 */

var LayerButton = function (_Component) {
    inherits(LayerButton, _Component);

    function LayerButton(props) {
        classCallCheck(this, LayerButton);

        var _this = possibleConstructorReturn(this, (LayerButton.__proto__ || Object.getPrototypeOf(LayerButton)).call(this, props));

        _this.onClickHandler = _this.onClickHandler.bind(_this);
        return _this;
    }

    createClass(LayerButton, [{
        key: 'onClickHandler',
        value: function onClickHandler(e) {
            this.props.globe.toggleLayer(this.props.layer);
        }
    }, {
        key: 'render',
        value: function render() {
            var buttonClass = "list-group-item list-group-item-action" + (this.props.enabled ? " active" : "");

            return React.createElement(
                'button',
                {
                    type: 'button',
                    className: buttonClass,
                    onClick: this.onClickHandler },
                this.props.layer.displayName
            );
        }
    }]);
    return LayerButton;
}(Component);

LayerButton.propTypes = {
    layer: PropTypes.instanceOf(WorldWind.Layer).isRequired,
    globe: PropTypes.instanceOf(Globe).isRequired
};

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
var LayerList = function (_Component) {
    inherits(LayerList, _Component);

    function LayerList() {
        classCallCheck(this, LayerList);
        return possibleConstructorReturn(this, (LayerList.__proto__ || Object.getPrototypeOf(LayerList)).apply(this, arguments));
    }

    createClass(LayerList, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            // Create a list of items for React to render; 
            // Reverse the layers so the top-most layer is displayed first
            var layerElements = this.props.layers.map(function (layer) {
                return React.createElement(LayerButton, { key: layer.uniqueId, layer: layer, enabled: layer.enabled, globe: _this2.props.globe });
            });
            layerElements.reverse();

            var separator = this.props.separatorAfter ? React.createElement('hr', null) : null;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'list-group' },
                    layerElements
                ),
                separator
            );
        }
    }]);
    return LayerList;
}(Component);

LayerList.propTypes = {
    layers: PropTypes.array.isRequired,
    separatorAfter: PropTypes.bool,
    globe: PropTypes.instanceOf(Globe)
};

var _class;
var _temp;

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
/**
 * A collapsable Card for managing layers.
 */
var LayersCard = observer((_temp = _class = function (_Component) {
  inherits(LayersCard, _Component);

  function LayersCard(props) {
    classCallCheck(this, LayersCard);

    var _this = possibleConstructorReturn(this, (LayersCard.__proto__ || Object.getPrototypeOf(LayersCard)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    _this.state = {
      isOpen: false
    };
    return _this;
  }

  createClass(LayersCard, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var layerLists = null;

      if (this.props.globe) {
        if (this.props.categories.length === 0) {
          // Use a single list for all layers
          layerLists = React.createElement(LayerList, { layers: this.props.globe.getLayers(), globe: this.props.globe });
        } else {
          // Use an individual layer list for each category
          var i = 0;
          layerLists = this.props.categories.map(function (category) {
            return React.createElement(LayerList, {
              key: category,
              layers: _this2.props.globe.getLayers(category),
              globe: _this2.props.globe,
              separatorAfter: ++i < _this2.props.categories.length,
              lastUpdate: _this2.props.globe.getCategoryTimestamp(category).get() });
          });
        }
      }
      return React.createElement(
        Collapse,
        { isOpen: this.state.isOpen },
        React.createElement(
          Card,
          { className: 'globe-card w-100 interactive' },
          React.createElement(
            CardHeader,
            null,
            React.createElement(
              'h5',
              { className: 'card-title' },
              React.createElement(FontAwesome, { name: this.props.icon }),
              ' ',
              this.props.title,
              React.createElement(
                Button,
                { className: 'close pull-right', 'aria-label': 'Close', onClick: this.toggle },
                React.createElement(
                  'span',
                  { 'aria-hidden': 'true' },
                  '\xD7'
                )
              )
            )
          ),
          React.createElement(
            CardBody,
            null,
            layerLists
          )
        )
      );
    }
  }]);
  return LayersCard;
}(Component), _class.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  globe: PropTypes.instanceOf(Globe)
}, _class.defaultProps = {
  title: 'Layers',
  icon: 'list',
  categories: []
}, _temp));

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
/**
 * A collapsable Card for managing markers.
 */

var MarkersCard = function (_Component) {
    inherits(MarkersCard, _Component);

    function MarkersCard(props) {
        classCallCheck(this, MarkersCard);

        var _this = possibleConstructorReturn(this, (MarkersCard.__proto__ || Object.getPrototypeOf(MarkersCard)).call(this, props));

        _this.toggle = _this.toggle.bind(_this);
        _this.state = {
            markers: [],
            isOpen: false
        };
        return _this;
    }

    createClass(MarkersCard, [{
        key: 'toggle',
        value: function toggle() {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    }, {
        key: 'addMarker',
        value: function addMarker(marker) {
            // Ensure each marker has a unique ID
            if (!marker.uniqueId) {
                marker.uniqueId = MarkersCard.nextMarkerId++;
            }
            // Create a new array from the previous array + marker
            this.setState(function (prevState) {
                return { markers: [].concat(toConsumableArray(prevState.markers), [marker]) };
            });
        }
    }, {
        key: 'gotoMarker',
        value: function gotoMarker(marker) {
            this.props.globe.goTo(marker.position.latitude, marker.position.longitude);
        }
    }, {
        key: 'editMarker',
        value: function editMarker(marker) {
            alert("TODO: handleEditMarker");
        }
    }, {
        key: 'removeMarker',
        value: function removeMarker(marker) {
            // Find and remove the marker from the layer and the state array
            var globe = this.props.globe;
            var layerName = this.props.markersLayerName;
            var markerLayer = globe.getLayer(layerName);
            for (var i = 0, max = this.state.markers.length; i < max; i++) {
                var placemark = markerLayer.renderables[i];
                if (placemark === marker) {
                    markerLayer.renderables.splice(i, 1);
                    break;
                }
            }
            var markers = this.state.markers.filter(function (item) {
                return item !== marker;
            });
            this.setState({ markers: markers });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.props.globe) {
                return null;
            }
            var self = this;
            function GotoButton(props) {
                return React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-light', onClick: function onClick(e) {
                            return self.gotoMarker(props.marker, e);
                        } },
                    React.createElement(
                        'span',
                        null,
                        React.createElement('img', { width: '16px', height: '16px', src: props.marker.attributes.imageSource, alt: '' }),
                        '  '
                    ),
                    props.marker.label
                );
            }
            function EditButton(props) {
                return React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-light', disabled: true, onClick: self.editMarker.bind(self, props.marker) },
                    React.createElement(FontAwesome, { name: 'edit' })
                );
            }
            function RemoveButton(props) {
                return React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-light', onClick: function onClick(e) {
                            return self.removeMarker(props.marker, e);
                        } },
                    React.createElement(FontAwesome, { name: 'trash' })
                );
            }
            function MarkerItem(props) {
                return React.createElement(
                    'li',
                    { className: 'list-group-item list-group-item-action p-0' },
                    React.createElement(
                        'div',
                        { className: 'btn-group', role: 'group' },
                        React.createElement(GotoButton, { marker: props.marker }),
                        React.createElement(EditButton, { marker: props.marker }),
                        React.createElement(RemoveButton, { marker: props.marker })
                    )
                );
            }
            var markerList = this.state.markers.map(function (marker) {
                return React.createElement(MarkerItem, { key: marker.uniqueId, marker: marker });
            });
            return React.createElement(
                Collapse,
                { isOpen: this.state.isOpen },
                React.createElement(
                    Card,
                    { className: 'globe-card w-100 interactive' },
                    React.createElement(
                        CardHeader,
                        null,
                        React.createElement(
                            'h5',
                            { className: 'card-title' },
                            React.createElement(FontAwesome, { name: this.props.icon }),
                            ' ',
                            this.props.title,
                            React.createElement(
                                Button,
                                { className: 'close pull-right', 'aria-label': 'Close', onClick: this.toggle },
                                React.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '\xD7'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        CardBody,
                        null,
                        React.createElement(
                            'ul',
                            { className: 'list-group' },
                            markerList
                        )
                    )
                )
            );
        }
    }]);
    return MarkersCard;
}(Component);

MarkersCard.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    globe: PropTypes.instanceOf(Globe),
    markersLayerName: PropTypes.string.isRequired
};
MarkersCard.defaultProps = {
    title: 'Markers',
    icon: 'map-marker'
};
MarkersCard.nextMarkerId = 1;

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
var NavBar = function (_Component) {
  inherits(NavBar, _Component);

  function NavBar(props) {
    classCallCheck(this, NavBar);

    var _this = possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    _this.state = {
      isOpen: false
    };
    return _this;
  }

  createClass(NavBar, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Auto-collapse the _mobile_ main menu when its button items are clicked
      var self = this;
      $('.navbar-collapse a[role="button"]').click(function () {
        self.setState({ isOpen: false });
      });
    }

    /**
     * Renders a BootStrap NavBar with branding, buttons and a search box.
     * @returns {String}
     */

  }, {
    key: 'render',
    value: function render() {

      var logo = this.props.logo ? React.createElement('img', { src: this.props.logo, width: '32', height: '32', className: 'd-inline-block align-top', alt: '' }) : null;
      return React.createElement(
        Navbar,
        { dark: true, color: 'dark', fixed: 'top', expand: 'md' },
        React.createElement(
          NavbarBrand,
          { href: this.props.href },
          logo,
          this.props.title
        ),
        React.createElement(NavbarToggler, { onClick: this.toggle }),
        React.createElement(
          Collapse,
          { isOpen: this.state.isOpen, navbar: true },
          React.createElement(
            Nav,
            { className: 'mr-auto', navbar: true },
            this.props.items
          ),
          React.createElement(
            Nav,
            { className: 'ml-auto', navbar: true },
            this.props.search
          )
        )
      );
    }
  }]);
  return NavBar;
}(Component);

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  logo: PropTypes.string,
  items: PropTypes.array,
  search: PropTypes.object
};

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
var NavBarItem = function (_Component) {
  inherits(NavBarItem, _Component);

  function NavBarItem(props) {
    classCallCheck(this, NavBarItem);

    var _this = possibleConstructorReturn(this, (NavBarItem.__proto__ || Object.getPrototypeOf(NavBarItem)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  createClass(NavBarItem, [{
    key: 'toggle',
    value: function toggle() {
      if (this.props.collapse) {
        this.props.collapse.toggle();
      }
    }

    /**
     * Renders a 'reactstrap' NavItem for a Navbar.
     * @returns {String}
     */

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        NavItem,
        null,
        React.createElement(
          NavLink,
          { role: 'button', onClick: this.toggle },
          React.createElement(FontAwesome, { name: this.props.icon }),
          React.createElement(
            'span',
            { className: 'd-md-none d-lg-inline pl-1', 'aria-hidden': 'true' },
            this.props.title
          )
        )
      );
    }
  }]);
  return NavBarItem;
}(Component);

NavBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  collapse: PropTypes.object
};

var _class$1;
var _temp$1;

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
/**
 * A collapsible Card for managing settings.
 */
var SettingsCard = observer((_temp$1 = _class$1 = function (_Component) {
  inherits(SettingsCard, _Component);

  function SettingsCard(props) {
    classCallCheck(this, SettingsCard);

    var _this = possibleConstructorReturn(this, (SettingsCard.__proto__ || Object.getPrototypeOf(SettingsCard)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    _this.state = {
      isOpen: false
    };
    return _this;
  }

  createClass(SettingsCard, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var layerLists = null;

      if (this.props.globe) {
        if (this.props.categories.length === 0) {
          // Use a single list for all layers
          layerLists = React.createElement(LayerList, { layers: this.props.globe.getLayers(), globe: this.props.globe });
        } else {
          // Use an individual layer list for each category
          var i = 0;
          layerLists = this.props.categories.map(function (category) {
            return React.createElement(LayerList, {
              key: category,
              layers: _this2.props.globe.getLayers(category),
              globe: _this2.props.globe,
              separatorAfter: ++i < _this2.props.categories.length,
              lastUpdate: _this2.props.globe.getCategoryTimestamp(category).get() });
          });
        }
      }
      return React.createElement(
        Collapse,
        { isOpen: this.state.isOpen },
        React.createElement(
          Card,
          { className: 'globe-card w-100 interactive' },
          React.createElement(
            CardHeader,
            null,
            React.createElement(
              'h5',
              { className: 'card-title' },
              React.createElement(FontAwesome, { name: this.props.icon }),
              ' ',
              this.props.title,
              React.createElement(
                Button,
                { className: 'close pull-right', 'aria-label': 'Close', onClick: this.toggle },
                React.createElement(
                  'span',
                  { 'aria-hidden': 'true' },
                  '\xD7'
                )
              )
            )
          ),
          React.createElement(
            CardBody,
            null,
            layerLists
          )
        )
      );
    }
  }]);
  return SettingsCard;
}(Component), _class$1.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  globe: PropTypes.instanceOf(Globe)
}, _class$1.defaultProps = {
  title: 'Settings',
  icon: 'cog',
  categories: []
}, _temp$1));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".SearchPreview_globe__2OJMW {\n    height: 200px;\n}\n\n\n/*Sets the maximum height of the entire modal to 100% of the screen height*/\n.SearchPreview_modal__3x6dh {\n  margin: 0 auto;\n  max-height: 100vh;\n}\n\n/*Sets the maximum height of the modal body to 90% of the screen height*/\n.SearchPreview_body__2SnNt {\n  max-height: 90vh;\n}\n\n\n/*Sets the height of a modal's canvas to 60% minus the height of a footer*/\n.SearchPreview_table__1F00P {\n  max-height: calc(60vh - 71px);\n  overflow-y: auto;\n}\n\n";
var style = { "globe": "SearchPreview_globe__2OJMW", "modal": "SearchPreview_modal__3x6dh", "body": "SearchPreview_body__2SnNt", "table": "SearchPreview_table__1F00P" };
styleInject(css);

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
/* global WorldWind */

var SearchPreview = function (_Component) {
  inherits(SearchPreview, _Component);

  function SearchPreview(props) {
    classCallCheck(this, SearchPreview);

    var _this = possibleConstructorReturn(this, (SearchPreview.__proto__ || Object.getPrototypeOf(SearchPreview)).call(this, props));

    _this.state = {
      showWarning: _this.props.showApiWarning
    };
    _this.dismissWarning = _this.dismissWarning.bind(_this);
    _this.handleGotoClick = _this.handleGotoClick.bind(_this);
    _this.handlePreviewClick = _this.handlePreviewClick.bind(_this);
    _this.globeRef = React.createRef();

    _this.globe = null;
    _this.selection = null;
    _this.resultsLayer = null;
    _this.placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    _this.placemarkAttributes.imageSource = "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-red.png";
    _this.placemarkAttributes.imageScale = 0.5;
    _this.placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
    return _this;
  }

  createClass(SearchPreview, [{
    key: 'dismissWarning',
    value: function dismissWarning() {
      this.setState({
        showWarning: false
      });
    }
  }, {
    key: 'handlePreviewClick',
    value: function handlePreviewClick(result) {
      var latitude = parseFloat(result.lat),
          longitude = parseFloat(result.lon);
      this.globeRef.current.goTo(latitude, longitude);
      // Update the selection used for the Go To button
      this.selection = result;
    }
  }, {
    key: 'handleGotoClick',
    value: function handleGotoClick() {
      // Call the parent's handler to process the selection
      this.props.handleGotoSelection(this.selection);
    }
  }, {
    key: 'createMarker',
    value: function createMarker(result) {
      var marker = new WorldWind.Placemark(new WorldWind.Position(parseFloat(result.lat), parseFloat(result.lon), 100));
      marker.attributes = this.placemarkAttributes;
      marker.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
      marker.displayName = result.display_name;
      return marker;
    }

    /**
     * Updates the preview globe AFTER the modal is shown.
     * This cannot be done in componentDidMount because the modal is not being shown
     * at that time
     * @param {type} prevProps
     * @param {type} prevState
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.globeRef.current) {
        var globe = this.globeRef.current;
        var resultsLayer = globe.addLayer('renderables');
        this.props.results.forEach(function (result) {
          resultsLayer.addRenderable(_this2.createMarker(result));
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      this.selection = this.props.results[0];
      var tableRows = this.props.results.map(function (result) {
        return React.createElement(
          'tr',
          { key: result.place_id, onClick: function onClick() {
              return _this3.handlePreviewClick(result);
            } },
          React.createElement(
            'td',
            null,
            result.display_name
          ),
          React.createElement(
            'td',
            null,
            result.type
          )
        );
      });

      return React.createElement(
        Modal,
        { isOpen: this.props.results.length > 0, toggle: this.props.handleHideModal, className: style.modal },
        React.createElement(
          ModalHeader,
          { toggle: this.props.handleHideModal },
          this.props.title
        ),
        React.createElement(
          ModalBody,
          null,
          React.createElement(
            'div',
            { className: style.globe },
            React.createElement(Globe, { id: 'preview-globe', projection: 'Mercator', ref: this.globeRef })
          ),
          React.createElement(
            'div',
            { className: style.table },
            React.createElement(
              Alert,
              { color: 'warning', isOpen: this.state.showWarning },
              React.createElement(
                Button,
                { className: 'close pull-right', 'aria-label': 'Close', onClick: this.dismissWarning },
                React.createElement(
                  'span',
                  { 'aria-hidden': 'true' },
                  '\xD7'
                )
              ),
              'MapQuest API key missing. Get a free key at ',
              React.createElement(
                'a',
                { href: 'https://developer.globequest.com/', className: 'alert-link', rel: 'noopener noreferrer', target: '_blank' },
                'developer.globequest.com'
              ),
              ' and set the MAPQUEST_API_KEY variable to your key.'
            ),
            React.createElement(
              'table',
              { className: 'table table-hover' },
              React.createElement(
                'thead',
                null,
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'th',
                    { scope: 'col' },
                    'Name'
                  ),
                  React.createElement(
                    'th',
                    { scope: 'col' },
                    'Type'
                  )
                )
              ),
              React.createElement(
                'tbody',
                null,
                tableRows
              )
            )
          )
        ),
        React.createElement(
          ModalFooter,
          null,
          React.createElement(
            Button,
            { onClick: this.handleGotoClick },
            'Go To'
          ),
          ' ',
          React.createElement(
            Button,
            { onClick: this.props.handleHideModal },
            'Cancel'
          )
        )
      );
    }
  }]);
  return SearchPreview;
}(Component);

SearchPreview.propTypes = {
  title: PropTypes.string,
  results: PropTypes.array.isRequired,
  handleHideModal: PropTypes.func.isRequired,
  handleGotoSelection: PropTypes.func.isRequired,
  showApiWarning: PropTypes.bool
};
SearchPreview.defaultProps = {
  title: 'Search Results',
  showApiWarning: true
};

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
/* global WorldWind */

var SearchBox = function (_React$Component) {
  inherits(SearchBox, _React$Component);

  function SearchBox(props) {
    classCallCheck(this, SearchBox);

    var _this = possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call(this, props));

    _this.state = {
      value: '',
      results: []
    };
    _this.geocoder = new WorldWind.NominatimGeocoder();

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.hideModal = _this.hideModal.bind(_this);
    _this.gotoSelection = _this.gotoSelection.bind(_this);
    return _this;
  }

  createClass(SearchBox, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      this.performSearch();
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      this.performSearch();
      return false; // prevent page from refreshing
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      // Nothing to display
      this.setState({ results: [] });
    }
  }, {
    key: 'gotoSelection',
    value: function gotoSelection(selection) {
      if (selection) {
        var latitude = parseFloat(selection.lat);
        var longitude = parseFloat(selection.lon);
        // Update the globe 
        this.props.globe.goTo(latitude, longitude);
        this.hideModal();
      }
    }
  }, {
    key: 'performSearch',
    value: function performSearch() {
      var globe = this.props.globe;

      if (!this.props.mapQuestApiKey) {
        console.error("SearchViewModel: A MapQuest API key is required to use the geocoder in production. Get your API key at https://developer.mapquest.com/");
      }
      var queryString = this.state.value;
      if (queryString) {
        if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
          // Treat the text as a lat, lon pair 
          var tokens = queryString.split(",");
          var latitude = parseFloat(tokens[0]);
          var longitude = parseFloat(tokens[1]);
          // Center the globe on the lat, lon
          globe.wwd.goTo(new WorldWind.Location(latitude, longitude));
        } else {
          // Treat the text as an address or place name
          var self = this;
          this.geocoder.lookup(queryString, function (geocoder, results) {
            // Open the modal dialog to preview and select a result
            // The modal is rendered when results > 0
            self.setState({ results: results });
          }, this.props.mapQuestApiKey);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { className: 'form-inline', onSubmit: this.handleSubmit },
        React.createElement('input', { className: 'form-control mr-sm-2', type: 'text', placeholder: 'Search', 'aria-label': 'Search', value: this.state.value, onChange: this.handleChange }),
        React.createElement(
          Button,
          { color: 'success', onClick: this.handleClick },
          React.createElement(FontAwesome, { name: 'search' })
        ),
        React.createElement(SearchPreview, {
          results: this.state.results,
          handleHideModal: this.hideModal,
          handleGotoSelection: this.gotoSelection,
          showApiWarning: !this.props.mapQuestApiKey })
      );
    }
  }]);
  return SearchBox;
}(React.Component);

SearchBox.propTypes = {
  globe: PropTypes.instanceOf(Globe),
  mapQuestApiKey: PropTypes.string
};

var css$1 = "\n.Tools_button__3GjWS {\n    background:rgba(255,255,255,0.35);\n    padding: 0;\n}\n\n.Tools_toggle___sQ5X {\n    background:rgba(255,255,255,0.35) !important;\n    width: 30px;\n    padding: 0;\n}\n\n.Tools_dropdown__20fz1 {\n    background:rgba(255,255,255,0.35) !important;\n    min-width: 30px !important;\n}\n\n.Tools_image__2coNL {\n    width: 30px;\n    height: 30px;\n}";
var style$1 = { "button": "Tools_button__3GjWS", "toggle": "Tools_toggle___sQ5X", "dropdown": "Tools_dropdown__20fz1", "image": "Tools_image__2coNL" };
styleInject(css$1);

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
/* global WorldWind */

var Tools = function (_Component) {
    inherits(Tools, _Component);

    function Tools(props) {
        classCallCheck(this, Tools);

        var _this = possibleConstructorReturn(this, (Tools.__proto__ || Object.getPrototypeOf(Tools)).call(this, props));

        _this.state = {
            selectedMarkerImage: Tools.pushpins[0],
            dropdownOpen: false
        };
        _this.isDropArmed = false;
        _this.dropCallback = null;

        _this.dropMarkerCallback = _this.dropMarkerCallback.bind(_this);
        _this.toggle = _this.toggle.bind(_this);
        return _this;
    }

    createClass(Tools, [{
        key: 'toggle',
        value: function toggle() {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen
            });
        }
    }, {
        key: 'selectPushpin',
        value: function selectPushpin(pushpin) {
            this.setState({ selectedMarkerImage: pushpin });
            this.armDropMarker();
        }
    }, {
        key: 'armDropMarker',
        value: function armDropMarker() {
            this.props.globe.armClickDrop(this.dropMarkerCallback);
        }
    }, {
        key: 'dropMarkerCallback',
        value: function dropMarkerCallback(position) {
            // Create a placemark using the selected marker image
            var attributes = new WorldWind.PlacemarkAttributes(null);
            attributes.imageScale = 0.8;
            attributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
            attributes.imageColor = WorldWind.Color.WHITE;
            attributes.labelAttributes.offset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);
            attributes.labelAttributes.color = WorldWind.Color.YELLOW;
            attributes.drawLeaderLine = true;
            attributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
            attributes.imageSource = this.state.selectedMarkerImage;

            var placemark = new WorldWind.Placemark(position, /*eyeDistanceScaling*/true, attributes);
            placemark.label = "Lat " + position.latitude.toPrecision(4).toString() + "\nLon " + position.longitude.toPrecision(5).toString();
            placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
            placemark.eyeDistanceScalingThreshold = 2500000;

            // Add the placemark to the layer and to the Markers component
            var globe = this.props.globe;
            var layer = globe.getLayer(this.props.markersLayerName);
            if (layer) {
                // Add the placemark to the globe
                layer.addRenderable(placemark);

                // Add the placemark to the Markers component
                this.props.markers.addMarker(placemark);
            } else {
                console.warn("Renderable layer for markers not found: " + this.props.markersLayerName);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            // Wait for the globe to be intialized before rendering this component
            if (!this.props.globe) {
                return null;
            }

            // Create a tool palette with dropdowns
            var dropdownItems = Tools.pushpins.map(function (pushpin) {
                return React.createElement(
                    DropdownItem,
                    { key: pushpin, onClick: function onClick() {
                            return _this2.selectPushpin(pushpin);
                        }, className: style$1.button },
                    React.createElement('img', { className: style$1.image, src: pushpin, alt: 'Selected Marker' })
                );
            });

            return React.createElement(
                'div',
                { className: 'btn-group interactive p-3' },
                React.createElement(
                    Button,
                    {
                        className: style$1.button + ' p-1',
                        onClick: function onClick() {
                            return _this2.armDropMarker();
                        } },
                    React.createElement(FontAwesome, { name: 'plus' }),
                    React.createElement('img', { className: style$1.image, src: this.state.selectedMarkerImage, alt: 'Marker' })
                ),
                React.createElement(
                    ButtonDropdown,
                    { isOpen: this.state.dropdownOpen, toggle: this.toggle },
                    React.createElement(DropdownToggle, { caret: true, className: style$1.toggle }),
                    React.createElement(
                        DropdownMenu,
                        { className: style$1.dropdown },
                        dropdownItems
                    )
                )
            );
        }
    }]);
    return Tools;
}(Component);

Tools.propTypes = {
    globe: PropTypes.instanceOf(Globe),
    markers: PropTypes.instanceOf(MarkersCard),
    markersLayerName: PropTypes.string
};
Tools.pushpins = ["https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-red.png", "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-green.png", "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-blue.png", "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-orange.png", "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-teal.png", "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-purple.png", "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-white.png", "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-black.png"];

/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */

export { LayerList, LayerButton, LayersCard, MarkersCard, NavBar, NavBarItem, SettingsCard, SearchBox, SearchPreview, Tools };
