const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
require('./DB');
app.use(cors())
app.use(express.json());
app.use(require('./routes/main'))


app.listen(port, ()=>{
    console.log(`server is listening on ${port} port`);
});
