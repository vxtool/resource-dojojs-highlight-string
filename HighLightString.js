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

         },
        replaceHtml: function( searchText, replacement, searchNode ){
            if (!searchText || typeof replacement === 'undefined') return;

            searchNode = searchNode || this.searchNode;

            if( this.cache === null ){                
                this.cache = lang.clone( searchNode );
            }

            var regex = typeof searchText === 'string' ? new RegExp(searchText, 'gi') : searchText,
                childNodes = (searchNode || document.body).childNodes,
                cnLength = childNodes.length,
                excludes = 'html,head,style,title,link,meta,script,object,iframe';

            while (cnLength--) {
                var currentNode = childNodes[cnLength];

                if (currentNode.nodeType === 1 && (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
                    this.replaceHtml(searchText, replacement, currentNode);
                }
                if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
                    continue;
                }
                var parent = currentNode.parentNode,
                    frag = (function(){
                        var html = currentNode.data.replace(regex, replacement),
                            wrap = document.createElement('div'),
                            frag = document.createDocumentFragment();

                        wrap.innerHTML = html;
                        while (wrap.firstChild){
                            frag.appendChild(wrap.firstChild);
                        }
                        return frag;
                    })();
                parent.insertBefore(frag, currentNode);
                parent.removeChild(currentNode);
            }
        },
        cssHighlight: function( searchText ){
            var me = this;

            this.replaceHtml( searchText , function(text) {
                return '<span class="'+me.cssClass+'">'+text+'</span>';
            });

        }
    });

});