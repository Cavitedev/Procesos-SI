function ClienteRest() {
  var ultimaPartidaCreada;
  var nick;

  this.agregarUsuario = function (nick) {
    var cli = this;
    $.getJSON("/agregarUsuario/" + nick, function (data) {
      console.log(data);
      if (data.nick == -1) {
        console.log(`El usuario ${nick} ya está en uso`);
        iu.mostrarAgregarUsuario();
        //iu.mostrarModal("El nick ya está en uso");
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${nick} se ha registrado`);
      cli.nick = nick;
      iu.mostrarHome();
      iu.mostrarListaDePartidas();
      iu.mostrarCrearPartida();
      //   ws.nick = data.nick;
      //$.cookie("nick",ws.nick);
      //iu.mostrarHome(data);
    });
  };

  this.eliminarUsuario = function (nick) {
    var cli = this;
    $.getJSON("/eliminarUsuario/" + nick, function (data) {
      console.log(data);
      if (!data.eliminado) {
        console.log(`El usuario ${data.nick} no existía o no se pudo eliminar`);
        //iu.mostrarModal("El nick ya está en uso");
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${data.nick} se ha eliminado`);
      //   ws.nick = data.nick;
      //$.cookie("nick",ws.nick);
      //iu.mostrarHome(data);
    });
  };

  this.crearPartida = function (nick) {
    var cli = this;
    $.getJSON("/crearPartida/" + nick, function (data) {
      console.log(data);
      if (data.partida == -1) {
        console.log(`No se pudo crear un juego`);
        //iu.mostrarModal("El nick ya está en uso");
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${nick} ha creado la partida ${data.partida}`);
      cli.ultimaPartidaCreada = data.partida;
      iu.mostrarListaDePartidas();
      iu.mostrarCodigo(data.partida);
      //$.cookie("nick",ws.nick);
      //iu.mostrarHome(data);
    });
  };

  this.unirAPartida = function (codigo, nick) {
    var cli = this;
    $.getJSON(`/unirAPartida/${codigo}/${nick}`, function (data) {
      console.log(data);
      if (!data.seHaUnido) {
        console.log(`${nick} No se pudo unir al juego ${codigo}`);
        //iu.mostrarModal("El nick ya está en uso");
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${nick} se ha unido a la partida ${codigo}`);
      iu.mostrarCodigo(data.partida);
      //$.cookie("nick",ws.nick);
      //iu.mostrar                  Home(data);
    });
  };

  this.obtenerPartidas = function () {
    var cli = this;
    $.getJSON("/obtenerPartidas", function (data) {
      console.log(data);
    });
  };

  this.obtenerPartidasDisponibles = function () {
    var cli = this;
    $.getJSON("/obtenerPartidasDisponibles", function (data) {
      console.log(data);
      iu.mostrarListaDePartidasCallback(data);
    });
  };

  this.crearPartidaCon = function (nick1, nick2) {
    //Jquery debería ser síncrono para que esto funcione
    jQuery.ajaxSetup({ async: false });
    this.agregarUsuario(nick1);
    this.agregarUsuario(nick2);
    this.crearPartida(nick1);
    this.unirAPartida(this.ultimaPartidaCreada, nick2);
    jQuery.ajaxSetup({ async: true });
  };
}
