const mongoose = require('mongoose');

module.exports = () => {

    const repository = {}

    repository.conectar = async () => {
        var uri = "mongodb://:@cluster0-shard-00-00.khvwj.mongodb.net:27017,cluster0-shard-00-01.khvwj.mongodb.net:27017,cluster0-shard-00-02.khvwj.mongodb.net:27017/cadastrocursos?ssl=true&replicaSet=atlas-pd6hhw-shard-0&authSource=admin&retryWrites=true&w=majority";
        var connection = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.Promise = global.Promise;
        return connection;
    }

    return repository;
}