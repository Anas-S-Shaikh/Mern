const mongoose = require("mongoose");
const db = `mongodb+srv://Anas:anas1234@cluster0.dixv8.mongodb.net/Clementius-Interview?retryWrites=true&w=majority`;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(()=>{
    console.log(`connection success!`);
}).catch((err)=>{
    console.log(err);
})
