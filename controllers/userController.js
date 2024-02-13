const { UserAccount } = require('../models')
const bcrypt = require('bcrypt');

async function postUserAccount (req,res){

    const {firstName,email,password} = req.body
    let hashedPassword = await bcrypt.hash(password,10)

    let result = await UserAccount.create({ firstName,email,password:hashedPassword })
     res.json({email: result.email})
}

async function loginUserAccount (req,res){

    const {email,password} = req.body

    const user = await UserAccount.findOne({
        where: {email}
    });
    if (!user) {
        return res.status(401).json('Could not login');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json('Could not login');
    }
    req.session.userId = user.id
     res.json({status:"Yepp"})
}




module.exports = {
    postUserAccount,
    loginUserAccount
}
