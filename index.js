'use strict'

const auto = require('google-autocomplete');

module.exports = (pluginContext) => {
  const shell = pluginContext.shell;
  const toast = pluginContext.toast;


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
    const query_trim = query.trim();

    if (query_trim.length === 0) {
      return
    }

    //res.header("Content-Type", "application/json; charset=utf-8");

    res.add({
      id: query_trim,
      title: query_trim,
      desc: "hit enter to search on google"
    });

    auto.getQuerySuggestions(query_trim, function(err, suggestions) {
         var arrayLength = objLength(suggestions);
         for(var i=0; i<arrayLength; i++){
           res.add({
              id: suggestions[i].suggestion,
              title: suggestions[i].suggestion,
              desc: 'hit enter do search on google'
            });
         }
   });
 }

  function execute (id, payload) {

    shell.openExternal(`http://www.google.com/search?q=${id}`)
  }

  return { search, execute }
}
