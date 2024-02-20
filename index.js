//npx sequelize-cli model:generate --name UserAccount --attributes firstName:string,password:string,email:string       
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 // "Radiofrekvens"
const session = require('express-session');


const { sequelize, UserAccount } = require('./models')
const userController  = require('./controllers/userController.js')
const migrationhelper = require('./migrationhelper')
const {validateLoginUser,validateCreateUser} = require('./validators/userValidator.js');

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5500",
    credentials:true 
}))

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

console.log(userController.team)


const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next(); // User is authenticated, continue to next middleware
    } else {
        res.status(401).send('login'); // User is not authenticated, redirect to login page
    }
}

app.get('/api/currentUserInfo',requireAuth, async (req,res)=>{
    let result = {
        name: 'Stefan',
        id:11112,
        age:52
    }
     res.json(result)
});


app.post('/api/userAccount',validateCreateUser,userController.postUserAccount);

app.post('/api/signIn',validateLoginUser, userController.loginUserAccount);




app.listen(port, async () => {
    await migrationhelper.migrate()
    console.log(`Example app listening2 on port ${port}`)
})