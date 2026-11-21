const mongoose=require("mongoose");
const List=require("../models/list.js");
const fulldata=require("./data.js")




main().then(()=>console.log("mongoose connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
  
  
}

const initDB =async ()=>{
    await List.deleteMany({});
    await List.insertMany(fulldata.data);
    console.log(fulldata.data);
}   
initDB();