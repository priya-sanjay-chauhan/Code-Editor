const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.14", express.static("D:/Priya/compiler/codemirror-5.65.14"))
app.get("/", function (req, res) {
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile("D:/Priya/compiler/index.html")
})

app.post("/compile", function (req, res) {
    var code = req.body.code                     // Api request code in the body
    var input = req.body.input                     // Api request code 
    var lang = req.body.lang
    try {
        if (lang == "Cpp") {
            if (!input) {
                //if windows  
                var envData = { OS: "windows", cmd: "g++",options:{timeout:10000} }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if(data.output){
                        res.send(data);
                    }else{
                        res.send({output: "error"})
                    }
                });
            }
            else {
                var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data);
                    }else{
                        res.send({output: "error"})
                    }
                });
            }
        }
        else if(lang=="Java"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }else{
                        res.send({output: "error class name should be Main"})
                    }
                });  
            }
            else{
                var envData = { OS : "windows"}; 
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }else{
                        res.send({output: "error class name should be Main"})
                    }
                });
            }
        }
        else if(lang=="Python"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }else{
                        res.send({output: "error"})
                    }
                });    
            }
            else{
                var envData = { OS : "windows"};  
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }else{
                        res.send({output: "error"})
                    }      
                });
            }
        }
    }
    catch (e) {
        console.log("error class name should be Main")
    }
})
app.listen(8000)