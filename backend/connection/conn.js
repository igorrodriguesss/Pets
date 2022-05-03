const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/pets')
    console.log("Conexão realizada com sucesso!")
}

main().catch((err) => console.log(err));

module.exports = mongoose