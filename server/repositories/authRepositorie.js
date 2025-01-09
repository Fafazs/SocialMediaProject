const db = require('../db');

exports.registerNewUser = async (newUser)=>{
const query = `
      INSERT INTO users (id,name,email,password,role,age)
        VALUES ($1::uuid, $2, $3, $4, $5, $6)
        RETURNING id,name,email,password,role,age;
    `;

const {id,name,email,password,role,age} = newUser
const values = [id,name,email,password,role,age];
console.log(values);
const result = await db.query(query, values);
return result.rows[0];
}

exports.findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await db.query(query, [email]);

  return result.rows[0];
};