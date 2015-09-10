define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-construct',
    'dojo/NodeList-manipulate'
], function( declare , lang, query , domConstruct ){        

    return declare(null, {

        cssClass: 'highlight',

        searchNode: null,

        cache: null,

        constructor: function( opcoes ){
            lang.mixin( this, opcoes );

         }
    });

});