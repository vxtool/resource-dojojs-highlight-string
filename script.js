require([
  'dojo/dom',
  'dojo/query',
  'dojo/on',
  'dojo/keys',
  'dojo/dom-attr',
  './HighLightString',
  'dojo/NodeList-manipulate'
], function( dom, query, on, keys, domAttr, HighLightString ){

  var substituir = new HighLightString({
    cssClass: 'resultado_caracteristicas',
    searchNode: dom.byId('box_prod_info')
  });

  
  query('#botao_pesquisar_caracteristicas').on("click", function(){
    substituir.clear();
    
    var valor_busca = domAttr.get( dom.byId("inp_text_caracteristica") , "value" );
    
    substituir.cssHighlight( valor_busca );
  });

  query('#inp_text_caracteristica').on("keypress", function(evt){
    var charOrCode = evt.charCode || evt.keyCode;

    if(keys.ENTER === charOrCode || keys.NUMPAD_ENTER === charOrCode){
      evt.preventDefault();
      substituir.clear();
      var valor_busca = domAttr.get( dom.byId("inp_text_caracteristica") , "value" );

      substituir.cssHighlight( valor_busca ); 
    }
  });
});