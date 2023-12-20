import server from "./app";
import Mongo from "./database/connection";


Mongo.connect().then(() => {
    console.log("Banco conectado");
    server.listen(process.env.PORT || 5000, () => console.log("Servidor Rodando"));
}).catch(err => console.log("Error ao conectar com banco", err));