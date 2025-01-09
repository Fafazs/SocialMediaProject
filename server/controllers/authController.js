const authService = require("../services/authServices");


exports.userRegister = async (req, res)=>{
    try{
        const {name, email, password, role, age} = req.body;
        const newUser = await authService.userRegister({name,email,password,role,age});
        return res.status(201).json(newUser);
    }catch(err){
        return res.status(400).json({message: err.message});
    };
}


exports.authenticateLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const token = await authService.authenticateLogin({email, password});
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'strict', 
            maxAge: 3600000, 
          });
        res.status(200).json({ message: "The login was successful!"});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.authenticateCookie = async (req, res)=>{
try{
    const user = req.user;
    const message = await authService.message(user);
    res.status(200).json({message},{ data: { name: user.name, email: user.email } });
}catch(err){
    return res.status(400).json({message: err.message}, 'User not found');
}
}