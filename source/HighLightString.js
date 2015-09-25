define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-construct',
    'dojo/NodeList-manipulate'
], function( declare , lang, query , domConstruct ){        
        /**
     * @class HighLightString
     * Destaca a string passada como parametro
     *
     * @param {Object} dom Elemento que será validado
     *
     * Para utilizar a validação em formato de função é necessário que a
     * função atenda alguns pre-requisitos.
     *
     *     @example Metodo de validação por metodo
     *     var substituir = new HighLightString({
     *          cssClass: '[classe_do_elemento]',
     *          searchNode: dom.byId('[id_do_elemento]')
     *     });
     *
     *     new validaCampo(query('input#nome'), new validaNome() );
     */
    return declare(null, {
        /**
         * CLASS css
         *
         * @property cssClass
         * @type {String}
        **/
        cssClass: 'highlight',
        /**
         * The DOM element
         *
         * @property searchNode
         * @type {HTMLElement}
         * @example 
         *     // usando o id
         *     dom.byId('nome_do_id');
        **/
        searchNode: null,
        /**
         * The DOM element
         *
         * @property cache
         * @static
         * @type {HTMLElement}
        **/
        cache: null,
        /**
         * constructor
         *
         * @method constructor
         * @param cssClass
         * @param searchNode
         *
        **/
        constructor: function( opcoes ){
            lang.mixin( this, opcoes );

         },
        /**
         * Método para replicar o html
         *
         * @param searchText
         * @param replacement
         * @param searchNode
         * @chainable
        **/
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
        /**
         * Limpa o cache do DOM consultado
         *
         *      var a = new HighLightString();
         *      a.clear();
         *
        **/
        clear: function(){
            if(this.cache){
                domConstruct.place( this.cache , this.searchNode, "after");
                domConstruct.destroy(this.searchNode);

                this.searchNode = this.cache;
                this.cache = null; 
            }
        },
        /**
         * Passa como parâmetro a string e aciona a funcao replaceHtml 
         *
         *      var a = new HighLightString();
         *      a.cssHighlight( valor_de_busca );
         *
         * @param searchText      
         *
         * @return {String} <span class=[classe_elemento]>[string_da_busca]</span>
        **/
        cssHighlight: function( searchText ){
            var me = this;

            this.replaceHtml( searchText , function(text) {
                return '<span class="'+me.cssClass+'">'+text+'</span>';
            });

        }
    });

});