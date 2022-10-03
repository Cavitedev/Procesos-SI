"use strict";
const express = require("express");
const fs = require("fs");
const app = express();
const modelo = require("./servidor/modelo.js");

const PORT = process.env.PORT || 3000;

let juego = new modelo.Juego();
/*
"/"
"/obtenerPartidas"
"/agregarUsuario/:nick"
...
*/

app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  const contenido = fs.readFileSync(__dirname + "/cliente/src/index.html");
  res.setHeader;
  "Content-type", "text/html";
  res.send(`${contenido}`);
});

app.get("/agregarUsuario/:nick", (req, res) => {
  let nick = req.params.nick;
  let nuevoUsuario = juego.agregarUsuario(nick);
  let output = { nick: nuevoUsuario ? nuevoUsuario.nick : -1 };
  res.send(output);
});

app.get("/eliminarUsuario/:nick", (req, res) => {
  let nick = req.params.nick;
  let haSidoEliminado = juego.eliminarUsuario(nick);
  let output = { eliminado: haSidoEliminado };
  res.send(output);
});

app.get("/crearPartida/:nick", (req, res) => {
  let nick = req.params.nick;
  let codigoPartida = juego.crearPartidaNick(nick);
  res.send({ partida: codigoPartida });
});

app.get("/unirAPartida/:codigo/:nick", (req, res) => {
  let codigo = req.params.codigo;
  let nick = req.params.nick;
  let codigoPartida = juego.unirAPartidaNick(codigo, nick);
  res.send({ partida: codigo, seHaUnido: codigoPartida });
});

app.get("/obtenerPartidas", (req, res) => {
  let partidas = juego.obtenerPartidas();
  res.send(partidas);
});

app.listen(PORT, () => {
  console.log(`Express 👂 puerto ${PORT}`);
  console.log("Presiona Ctrl+C para salir.");
});

// const noCirculares = (v) => {
//   const set = new Set();
//   const noCirculares = (v) => {
//     if (Array.isArray(noCirculares)) return v.map(noCirculares);
//     if (typeof v === "object" && v !== null) {
//       if (set.has(v)) return v.representacion() || undefined;
//       set.add(v);

//       return Object.fromEntries(
//         Object.entries(v).map(([k, v]) => [k, noCirculares(v)])
//       );
//     }
//     return v;
//   };
//   return noCirculares(v);
// };
