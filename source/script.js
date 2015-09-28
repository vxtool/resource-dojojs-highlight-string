require([
  'dojo/dom',
  'dojo/query',
  'dojo/on',
  'dojo/keys',
  'dojo/dom-attr',
  './source/HighLightString.js',
  'dojo/NodeList-manipulate'
], function( dom, query, on, keys, domAttr, HighLightString ){

  var _replace = new HighLightString({
    // definindo a classe do elemento que envolverá a String
    cssClass: 'result',
    // DOM onde será buscado a String
    searchNode: dom.byId('box')
  });


  query('#button-search').on("click", function(){
    // No evento de clique ele chama a função clear da classe HighLightString para limpar o cache e caso tenha feito alguma busca anteriormente
    _replace.clear();

    // Pega o valor do input onde foi iserido a string que será buscada
    var _searchValue = domAttr.get( dom.byId("inp-search") , "value" );

    // cria o elemento que destaca a String e faz a busca
    _replace.cssHighlight( _searchValue );
  });

  // Evento caso o usuário não clique no botão e aperte a tecla Enter
  query('#inp-search').on("keypress", function(evt){
    // Pega o code da tecla pressionada
    var charOrCode = evt.charCode || evt.keyCode;

    if(keys.ENTER === charOrCode || keys.NUMPAD_ENTER === charOrCode){
      evt.preventDefault();
      // No evento de clique ele chama a função clear da classe HighLightString para limpar o cache e caso tenha feito alguma busca anteriormente
      _replace.clear();
      // Pega o valor do input onde foi iserido a string que será buscada
      var _searchValue = domAttr.get( dom.byId("inp-search") , "value" );

      // cria o elemento que destaca a String e faz a busca
      _replace.cssHighlight( _searchValue );
    }
  });
});
