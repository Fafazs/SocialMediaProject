class User{
    constructor(id,name,email,hashedPassowrd,funcao,idade){
     this.id = id;
     this.name = name;
     this.email = email;
     this.age = age;
     this.hashedPassowrd = hashedPassowrd;
     this.role = role;
    }
}

module.exports = User;