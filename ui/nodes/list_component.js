'use strict';

// var _ = require('../../basics/helpers');
var Component = require('../component');
var $$ = Component.$$;
var TextProperty = require('../text_property_component');
var List = require('../../document/nodes/list');

var ListComponent = Component.extend({

  displayName: "ListComponent",

  initialize: function() {
    this.doc = this.props.doc;
    this.doc.getEventProxy('path').add([this.props.node.id, 'items'], this, this.onItemsChanged);
  },

  dispose: function() {
    this.doc.getEventProxy('path').remove([this.props.node.id, 'items'], this);
    this.doc = null;
  },
  
  render: function() {
    var doc = this.props.doc;
    return List.static.render(this.props.node, {
      createElement: function(tagName) {
        return $$(tagName);
      },
      createAnnotatedTextNode: function(path) {
        return $$(TextProperty, { doc: doc, path: path });
      }
    });
  },

  onItemsChanged: function() {
    console.log('YAY');
    this.rerender();
  },

});

module.exports = ListComponent;
