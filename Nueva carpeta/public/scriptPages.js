Vue.component('partido', {
  props: ['nombre', 'mes', 'dia', 'horario', 'lugar', 'url'],
  template: `
  <li class="list-group-item border-dark d-flex text-center align-items-center">
      <span class="flex-shrink text-center">{{  dia + '/' + mes + ' ' + horario }}</span><span class="w-50">{{ nombre }}
      </span>
      <span>  <a id="llevarme a maps" v-bind:href="url">{{ lugar }}</a>
              <a id="mostrar mapa" v-on:click="seleccionarEstadio(url)"></a>
      </span>
  
  </li>
  `,
})

var app = new Vue({
  el: '#app',
  data: {
    page: "gi",
    partidosSeptember: [],
    partidosOctober: [],
    partidosPorEquipo: []
  },
  methods: {
    seleccionarEstadio(url, index) {

      $("#map-seleccionado").attr("src", url);
      $(".btn-estadio-class").removeClass("unaClase");
      $("#btn-estadio" + index).addClass("unaClase");
    }
  }
})


function pages(newPage) {
  app.page = newPage;
}

function getPartidosPorEquipo(equipo){
  var partidosPorEquipo = partidos.filter(partido => partido.nombre.includes(equipo));
  return partidosPorEquipo;
}

function createVueModel(){
  app.partidosSeptember = partidos.filter(partido => partido.mes == "9");
  app.partidosOctober = partidos.filter(partido => partido.mes == "10");
  
  var partidosPorEquipo = equipos.map(function(equipo){
    return {
      equipo: equipo,
      partidos: getPartidosPorEquipo(equipo)
    }
  })

  app.partidosPorEquipo = partidosPorEquipo;
}

createVueModel();