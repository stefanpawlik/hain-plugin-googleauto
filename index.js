'use strict'

const auto = require('./node_modules/google-autocomplete');

module.exports = (pluginContext) => {
  const shell = pluginContext.shell;
  const toast = pluginContext.toast;
  const logger = pluginContext.logger;


  function objLength(obj){
  var i=0;
  for (var x in obj){
    if(obj.hasOwnProperty(x)){
      i++;
    }
  }
  return i;
  }

  function search (query, res) {
    const query_trim = query.trim()

    if (query_trim.length === 0) {
      return
    }

    auto.getQuerySuggestions(query_trim, function(err, suggestions) {
	       //logger.log(objLength(suggestions));
         var arrayLength = objLength(suggestions);
         for(var i=0; i<arrayLength; i++){
           logger.log(suggestions[i].suggestion);
           res.add({
              id: encodeURI(suggestions[i].suggestion),
              title: suggestions[i].suggestion,
              desc: 'Please wait a second'
  });
         }
   });
 }

  function execute (id, payload) {

    shell.openExternal(`http://www.google.com/search?q=${id}`)
  }

  return { search, execute }
}
