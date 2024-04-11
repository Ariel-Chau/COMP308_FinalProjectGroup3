const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/User')
const bcyrpt = require('bcrypt')
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true

}))
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/comp308_groupassignment");

const verifyUser = (req, res, next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.json("The token was not avaialble");

    }else{
        jwt.verify(token, "jwt-secret-key", (err,decoded)=>{
            if(err) return res.json("Token is wrong")
            next();
        })
    }
}

app.get('/home', verifyUser, (req,res)=> {
    return res.json("Success");
})

app.post("/login", (req,res) =>{
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user =>{
        if(user){
            bcyrpt.compare(password, user.password, (err, response)=>{
                
                if(response){
                    const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn:"1d"});
                    res.cookie("token", token);
                    res.json({ message: "Success", userType: user.userType }); // Send user type along with "Success" message
                }
                else{
                    res.json("The password is incorrect");
                }
            })
        }else{
            res.json("No record existed");
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        res.status(500).json("An error occurred during login.");
    });
});

app.post('/register', (req,res) => {
    const {name, email, password,userType } = req.body;
    bcyrpt.hash(password,10)
    .then(hash => {
        UserModel.create({name, email, password: hash,userType })
        .then(users => res.json(users))
        .catch(err => res.json(err)) 
    
    }).catch(err => console.log(err.message));
    
})


app.listen(3001, () =>{
    console.log("Server is running")
})