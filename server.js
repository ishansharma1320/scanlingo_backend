const express = require('express');
const routes = require("./server/routes");
const firebaseModule = require("./firebase");
const bodyParser = require("body-parser");



async function initializeApp(){
    let {db, admin} = await firebaseModule.initializeFirebase();
    const app = express();
    app.use(bodyParser.json({ limit: '10mb' }));
    
    app.get("/",(req,res)=>{
        console.log({event: "/health route accessed"})
        res.json({"success":true})
    })
    
    const router = express.Router();
    routes.register(router,db,admin);
    
    app.use("/api",router);
    
    
    app.listen(3000, "0.0.0.0", ()=>{
        console.log("Running express app at port 3000");
    })
}


initializeApp();
  
