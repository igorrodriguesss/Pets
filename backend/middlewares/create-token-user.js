const jwt = require('jsonwebtoken')

const createUserToken = async(user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "unique_secret_jwt")

    res.status(200).json({message: "Usuário autentiado com sucesso!", token: token})

}

module.exports = createUserToken