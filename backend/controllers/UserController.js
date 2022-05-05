const User = require('../models/Users')
const bcrypt = require('bcrypt')
const createUserToken = require('../middlewares/create-token-user')

module.exports = class UserController {
    
    static async register(req, res){
        const {name, email, phone, password, confirmPassword } = req.body

        if(!name) {
            res.status(422).json({message: "O nome é obrigatório!"})
            return
        } 
        if(!email) {
            res.status(422).json({message: "O email é obrigatório!"})
            return
        } 
        if(!phone) {
            res.status(422).json({message: "O telefone é obrigatório!"})
            return
        } 
        if(!password) {
            res.status(422).json({message: "A senha é obrigatório!"})
            return
        } 
        if(!confirmPassword) {
            res.status(422).json({message: "A confirmaçõa de senha é obrigatório!"})
            return
        } 

        if(password !== confirmPassword) {
            res.status(422).json({message: "A senha e a confirmação devem ser iguais!"})
        }

        const userExist = await User.findOne({email: email})

        if(userExist) {
            res.status(422).json({message: "O usuário já existe!"})
            return
        }

        // Criando criptografia para senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const users = new User({name, email, phone, password: passwordHash})

        // Inserindo usuário
        try {
            const newUser = await users.save()
            await createUserToken(newUser, req, res)
        }catch(error) {
            res.status(500).json({message: error})
        }
    }
}

