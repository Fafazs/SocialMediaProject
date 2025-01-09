const registerRepositorie = require("../repositories/authRepositorie");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.userRegister = async ({name,email,age,password,role,})=>{
    const userVerify = await registerRepositorie.findUserByEmail(email);
    if(userVerify){
        throw new Error('This Email has already been used');
    }
    try{
    const id = uuidv4();
    const hashedPassowrd = await bcrypt.hash(password, 10);
    const newUser = new User(id, name, email, hashedPassowrd, role, age);
    const user = await registerRepositorie.registerNewUser(newUser);
    return user;
    }catch(err){
        return console.error('Error at creating the user', err.message);
    }
}

exports.authenticateLogin = async ({email, password})=>{
try{
const user = await registerRepositorie.findUserByEmail(email);
if(!user){throw new Error ('Erro ao achar Usuário');}

const hashedId = crypto.createHash('sha256').update(user.id).digest('hex');
const validatePassword = await bcrypt.compare(password, user.password);


if(!validatePassword){throw new Error ('Invalid Password')};

const token = jwt.sign({id: hashedId, email: user.email, name: user.name},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN });
return token;

}catch(err){
    return console.error(err.message);
}
}

exports.message = async ({user})=>{
    return `Welcome back ${user.name}, your session has been reset for ${user.email}`
}