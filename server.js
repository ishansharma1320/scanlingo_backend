const express = require('express');
const routes = require("./server/routes");
const firebaseModule = require("./firebase");

firebaseModule.initializeFirebase().catch((error) => {
    console.error("Error initializing Firebase:", error);
  });



async function decodeIdToken(req,res,next){
    const { admin } = firebaseModule;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const idToken = req.headers.authorization.split("Bearer ")[1];
        try{
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            console.log(decodedToken)
            req.currentUser = decodedToken;
            next();
        } catch(err){
            console.log(err);
            res.status(403).json({ error: "Error verifying ID Token" });
        }
    } else {
        res.status(403).json({ error: "Authorization token missing" });
    }
}

const app = express();

app.get("/",(req,res)=>{
    res.json({"success":true})
})

const router = express.Router();
routes.register(router);

app.use("/api",decodeIdToken,router);


app.listen(3000, "0.0.0.0", ()=>{
    console.log("Running express app at port 3000");
})
