// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.

$(document).ready( function() {

  // inizializzazione handlebars
  var source = $("#album-template").html();
  var template = Handlebars.compile(source);

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/array/music",
    method: "GET",
    success: function (data, stato) {
      var listaAlbum = data.response;

      for (var i = 0; i < listaAlbum.length; i++) {
        // creo oggetto che conterrà i dati da passare al template
        var context = {
          cover: listaAlbum[i].poster,
          titolo: listaAlbum[i].title,
          artista: listaAlbum[i].author,
          anno: listaAlbum[i].year
        };
        // passo l'oggetto al template e stampo in pagina
        var html = template(context);
        $(".container").append(html);
      }
    },
    error: function (richiesta, stato, errore) {
      // fai qualcosa in caso di errore
    },
  });




});
