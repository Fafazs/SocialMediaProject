const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const cookieParser = require('cookie-parser');

//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173/' ,credentials: true,}));
app.use(cookieParser());


//routes
const authRoute = require('./routes/authRoute');
app.use('/', authRoute);

app.get('/',(req,res)=>{
    res.send('server is running');
})



//listen
app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port} `);
})

