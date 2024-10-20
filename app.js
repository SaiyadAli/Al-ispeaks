import express from "express"
import bodyParser from "body-parser"
import nodemailer from "nodemailer"
import _ from "lodash"

const port =3000
const app =express()
let value =0,cvalue=0;
let arr =[]
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("home",{arr})
})
app.get("/posts/:topic",(req,res)=>{
  for(let values of arr){
   if(_.lowerCase(values.title) == _.lowerCase(req.params.topic)){
     res.render("post",{title :values.title,content:values.bContent})
   }else{
    console.log("not found")
   }
  }
  
})

app.get("/contact",(req,res)=>{
    res.render("contact",{value})
    value=0
})

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'saiyadwork@gmail.com',  // Your Gmail account
      pass: 'hzeh xolc hxcb omuz',         // Your Gmail app password (you need to set this up)
    },
  });
  
  // Route to handle the form submission
  app.post('/contact', (req, res) => {
    const { fName,lName, email, phone,tContent } = req.body;
  
    // Email options
    let mailOptions = {
      from: 'saiyadwork@gmail.com',           // Sender's address
      to: 'alisaiyad508@gmail.com',             // Receiver's email
      subject: `New Al-iSpeaks Form Submission from ${fName +" "+lName}`,        // Email subject
      html: `<h1>You have received a new message from ${fName} (${email}) :</h1>
            <p>this is the message: ${tContent}</p> 
            <p>${phone}</p>
            <p>best regards,</P>
            <p> Al-iSpeaks </p>`, // Email content
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }else{
        // res.status(200).send('Email sent: ' + info.response);
        value=1
        res.redirect("/contact")
      }
      
    });

   
  });

  app.get("/compose",(req,res)=>{
     res.render("compose",{cvalue})
     cvalue=0
  })

app.post("/compose",(req,res)=>{
  console.log(req.body)
  arr.push(req.body)
  if(arr){
     res.redirect("/compose")
     cvalue=1
  }
})


app.listen(port,()=>console.log(`Server is running in port ${port}`))