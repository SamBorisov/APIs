const { response } = require("express");
const express = require("express")
const https = require("https")
const bodyPareser = require("body-parser")

const app = express();
app.use(bodyPareser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")

})
app.post("/", (req,res) => {
    console.log(req.body.cityName)

        let city = (req.body.cityName)
        https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c7a05026ca8b61d84fed3ffa09aa5efa`, function(resp) {
                

        resp.on("data",(data)=>{
            const wd = JSON.parse(data)
            const icon = wd.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"


            // res.write("<h3>Now: "+ wd.weather[0].main + "</h3>")
            // res.write();
            res.send(`<h1>the temperature is this place is ${wd.main.temp} </h1> <br> <p>the weather description is ${wd.weather[0].description} </p>
            <img src="${imageURL}">
            `);

        })
        })
})

app.listen(3000)


