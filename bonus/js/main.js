// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.

$(document).ready( function() {

  // inizializzazione handlebars
  var source = $("#album-template").html();
  var template = Handlebars.compile(source);

  // CHIAMATA AJAX--------------------------------------------------------------
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/array/music",
    method: "GET",
    success: function riuscito(data, stato) {
      var listaAlbum = data.response;

      // ciclo l'array che mi restituisce l'api ed estraggo le informazioni
      // che mi interessano
      for (var i = 0; i < listaAlbum.length; i++) {
        // creo oggetto che conterrà i dati da passare al template
        var context = {
          cover: listaAlbum[i].poster,
          titolo: listaAlbum[i].title.toUpperCase(),
          artista: listaAlbum[i].author,
          anno: listaAlbum[i].year,
          genre: listaAlbum[i].genre
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

  // CODICE --------------------------------------------------------------------

  // al cambiamento del valore del filtro "genere" eseguo la funzione "filtra"
  $(".genere").change(filtra);


  // DICHIARAZIONE FUNZIONI-----------------------------------------------------
  function filtra() {
    // memorizzo in delle variabili la lista dei div con classe album
    // e il valore della selezione che fungerà da filtro
    var albums = $(".album");
    var filtro = $(this).val();

    // se il filtro vale "all" mostro tutti gli elementi in pagina
    if(filtro == "all") {
      albums.each(function() {
        $(this).show();
      }
      // altrimenti confronto il filtro con il data attr "genere"
      // che ho assegnato dinamicamente, se corrisponde mostro l'elemento
      // altrimenti lo nascondo
    )} else {
      albums.each(function() {
        if($(this).data("genre") == filtro) {
          $(this).show();
        } else {
          $(this).hide();
        }
      })
    }
  }

});
