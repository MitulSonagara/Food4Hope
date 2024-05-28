const express=require("express")
const app=express()
const path=require("path") 
const hbs=require("hbs")
const collection = require("./mongodb")
const templatePath=path.join(__dirname,'../templates')
app.use(express.static('public'));       
           
app.use(express.json())     
app.set("view engine","hbs")   
app.set("views",templatePath)  
app.use(express.urlencoded({extended:false}))  
  
app.get("/",(req,res)=>{       
    res.render("homepage")   
})  

app.get("/donate",(req,res)=>{     
    res.render("donate")
})  

app.get("/signup",(req,res)=>{
    res.render("signup")
}) 
app.get("/ourmission",(req,res)=>{  
    res.render("ourmission")
})  
app.get("/choice",(req,res)=>{
    res.render("choice")
})
 
app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/thanks",(req,res)=>{
    res.render("thanks")
})

app.get("/aboutus",(req,res)=>{
    res.render("aboutus")
})

app.get("/data", async (req, res) => {
    try {
        const data = await collection.Collection1.find({});
        res.render("data", { data });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("An error occurred while fetching data.");
    }
});


app.post("/donate", async (req, res) => {
    const data = {
        name1: req.body.name1, 
        email1: req.body.email1,
        type1: req.body.type1,
        date1: req.body.date1,
        time1: req.body.time1,
        quantity1: req.body.quantity1,
        location1: req.body.location1
    };

    try {
        const result = await collection.Collection1.create(data);
        console.log("Data inserted:", result);
        res.render("thanks");
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("An error occurred while processing your donation.");
    }
}); 
 
app.post("/signup", async (req, res) => {
    const data = {
        fname: req.body.fname,
        lname: req.body.lname,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender,  
        dob: req.body.dob, 
        number: req.body.number 
    };

await collection.Collection2.create(data)
    // Redirect to the login page after successful registration.
    res.redirect("/login");
});

 
app.post("/login", async (req, res) => {
    try {
        const username = req.body.name;
        const password = req.body.password;

        console.log("Received login request with username:", username);

        const user = await collection.Collection2.findOne({ name: username });

        if (user) {
            if (user.password === password) {
                console.log("Login successful for user:", username);
                res.render("choice");
            } else {
                console.log("Password mismatch for user:", username);
                res.send("Wrong password");
            }
        } else {
            console.log("User not found:", username);
            res.send("User not found");
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send("An error occurred while processing your request.");
    }
});    

 


app.listen(3004,()=>{  
    console.log("port connected"); 
})       