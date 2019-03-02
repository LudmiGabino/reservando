var expect = chai.expect;

describe('Testear las funciones de la Clase Restaurante', function () {
  beforeEach(function () {
    restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
  });
  describe('Testear la funcion reservarHorario', function () {
    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.', function () {
      restaurant.reservarHorario();
      var horariosRestaurant = restaurant.horarios.slice()
      expect(restaurant.horarios).to.eql(horariosRestaurant);
    });
    it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.', function () {
      restaurant.reservarHorario('14:00');
      var horariosRestaurant = restaurant.horarios.slice();
      expect(restaurant.horarios).to.eql(horariosRestaurant);
    });
    it('Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.', function () {
      restaurant.reservarHorario('13:00');
      var horariosPostReserva = restaurant.horarios.length;
      expect(horariosPostReserva).to.equal(restaurant.horarios.length);
    })
  });

  describe('Testear la funcion obtenerPuntuación', function () {
    it('Dado un restaurant con determinadas calificaciones, la puntuación que es el promedio de ellas se calcula correctamente.', function () {
      var puntuacion = restaurant.obtenerPuntuacion();
      var promedio = (6 + 7 + 9 + 10 + 5) / 5;
      expect(promedio).to.be.equal(puntuacion);
    });
    it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.', function () {
      restaurant.calificaciones = [];
      var puntuacion = restaurant.obtenerPuntuacion();
      expect(puntuacion).to.equal(0);
    })
  });

  describe('Testear la funcion calificar', function () {
    it('Si la calificación es menor a cero, no se agrega', function () {
      var menorACero = restaurant.calificar(-5);
      expect(restaurant.calificaciones).to.not.include(menorACero);
    });
    it('Si la calificacion es mayor a 10, no se agrega', function () {
      var mayorADiez = restaurant.calificar(67);
      expect(restaurant.calificaciones).to.not.include(mayorADiez);
    });
    it('Si la calificacion ingresada no es un numero, no se agrega', function () {
      var noEsNumero = restaurant.calificar('');
      expect(restaurant.calificaciones).to.not.include(noEsNumero);
    })
  })
});


describe('Testear las funciones de la Clase Listado', function () {

  describe('Testear la funcion buscarRestaurante', function () {
    it('El id ingresado no existe, no retorna un restaurante', function () {
      var idRestauranteBuscado = listado.buscarRestaurante(0)
      expect(idRestauranteBuscado).to.be.eql('No se ha encontrado ningún restaurant')
    });
    it('No se ingresa ningun id, no devuelve un restaurante', function(){
      var idRestauranteBuscado = listado.buscarRestaurante()
      expect(idRestauranteBuscado).to.be.eql('No se ha encontrado ningún restaurant')
    });
    it('Se ingresa un string como id, no devuelve un restaurante', function(){
      var idRestauranteBuscado = listado.buscarRestaurante('x')
      expect(idRestauranteBuscado).to.be.eql('No se ha encontrado ningún restaurant')
    });
    it('Se ingresa un id, devuelve el restaurante correspondiente', function(){
      var idRestauranteBuscado = listado.buscarRestaurante(1);
      expect(idRestauranteBuscado).to.include({id: 1});
    })
  });
  
  
  describe('Testear la funcion obtenerRestaurantes', function(){
    it('Dado un rubro, una ciudad y un horario, devuelve un restaurante', function(){
      var busqueda = listado.obtenerRestaurantes("Asiática", "Londres", "15:00")
      expect(busqueda[0]).to.be.eql(listadoDeRestaurantes[1]);
    });
    it('No se le pasa ningun dato a la función, no devuelve ningun resultado', function(){
      var busqueda = listado.obtenerRestaurantes('', '', '');
      expect(busqueda[0]).to.be.eql();
    });
    it('Dado un rubro, devuelve varios restaurantes', function(){
      var busqueda = listado.obtenerRestaurantes('Hamburguesa', null, null)
      var resultadoEsperado = [listadoDeRestaurantes[2], listadoDeRestaurantes[10], listadoDeRestaurantes[12], listadoDeRestaurantes[21]];
      console.log(resultadoEsperado);
      expect(busqueda).to.be.eql(resultadoEsperado);
    })
  })
  
})

