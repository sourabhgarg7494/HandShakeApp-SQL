//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql2/promise');
var configData = require('./config.js');
var databaseConString = configData.databaseConString;
var uploadPath = configData.uploadPath;
var genSalt = require("randomstring");
var fileUpload = require('express-fileupload'); 

const bcrypt = require('bcrypt');
app.use(fileUpload());
app.use(express.static(__dirname + '/uploads'));

app.set('view engine', 'ejs');

// console.log(data);




//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]

  var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]


async function getUserData(UserEmailId){ 
    var query = "CALL GetUserDetailByEmailId(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query,UserEmailId);

    await con.end();
    console.log(results[0][0]);
    return results[0][0];
}

async function createUserData(data){ 
    var query = "CALL CreateUser(?,?,?,?,?,?,?,?,?,?)";

    var salt = genSalt.generate();

   
    var passwordHash = bcrypt.hashSync(data.Password + salt, 10);
    console.log(passwordHash); 

    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query,[ data.School,
        data.FirstName,
        data.LastName,
        data.EmailAddress,
        data.Major,
        data.GradMonth,
        data.GradYear,
        passwordHash,
        salt,
        'Student']);

    await con.end();
    console.log(results);
    return results;
}

async function getSignUpMasterData(){ 
    var query = "CALL GetSchoolMaster()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results[0][0]);
    return results[0];
}

async function getProfileData(data){ 
    var query = "CALL GetUserData(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, data.userId);

    await con.end();
    console.log(results);
    return results;
}

async function updateOverviewData(data){ 
    var query = "CALL UpdateOverviewData(?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [data.userId,data.firstName,data.lastName]);

    await con.end();
    console.log(results);
    return results;
}

async function updateEducationData(data){ 
    var query = "CALL UpdateEducationData(?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [data.userId,data.schoolName,data.major]);

    await con.end();
    console.log(results);
    return results;
}

async function UpdateObjective(data){ 
    var query = "CALL UpdateObjective(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [data.userId,data.Objective]);

    await con.end();
    console.log(results);
    return results;
}

async function UpdateProfilePicLocation(userId,profilePicPath){ 
    var query = "CALL UpdateProfilePicPath(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [userId,profilePicPath]);

    await con.end();
    console.log(results);
    return results;
}

async function addUserSkill(data){ 
    var query = "CALL addUserSkill(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [data.userId,data.skill]);

    await con.end();
    console.log(results);
    return results;
}

async function deleteUserSkill(data){ 
    var query = "CALL deleteUserSkill(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [data.userId,data.skill]);
    await con.end();
    console.log(results);
    return results;
}


app.post('/login',async function(req,res){
    console.log("Inside Login Post Request");
    
    console.log("Req Body : ",req.body);
    results = await getUserData(req.body.username);
    
    var {EmailId, Password, PasswordSalt} = results;
    if(EmailId === req.body.username){
            console.log("Inside If");
             bcrypt.compare(req.body.password + PasswordSalt, Password, function(err, r) {
                if(r) {
                    res.cookie('cookie', req.body.username ,{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = req.body.username;
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Successful Login");
                } else {
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                } 
            });
         }
});

//Route to handle Post Request Call
app.post('/Signup',async function(req,res){
    console.log("Inside Sign up Post Request");
    console.log("Req Body : ",req.body);
    results = await createUserData(req.body);

    if (results){
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("User Created");
    }
    else{
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("User Not Created");
    }
});

app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})

//Route to get All Books when user visits the Home Page
app.get('/Signup', async function(req,res){
    console.log("Inside signup Login");    
    results = await getSignUpMasterData();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("SchoolMaster : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/uploadProfilePic', async function(req,res){
    console.log("inside uploadProfile pic");
    let profilePic = req.files.file;
    let [fileExtension] = profilePic.name.split('.').splice(-1);
    console.log(fileExtension);
    let newFilename = req.body.userId+"-ProfilePic-"+Date.now()+"."+fileExtension;

    profilePic.mv(`${uploadPath}/${newFilename}`, async function(err) {
        if (err) {
            return res.status(500).send(err);
        }else{
            results = await UpdateProfilePicLocation(req.body.userId,newFilename);
            res.json({file: results[0][0].ProfilePicturePath});
        }
    });

})

app.post('/updateSkill',async function(req, res){
    console.log("inside update skill");
    console.log(req);
    if(req.body.type === "AddUserSkill"){
        let results = await addUserSkill(req.body);
    } else if(req.body.type === "DeleteUserSkill"){
        let results = await deleteUserSkill(req.body);
    }

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    //console.log("SchoolMaster : ",JSON.stringify(results));
    res.end(JSON.stringify(results)); 

})


app.post('/profile', async function(req,res){

    if (req.body.type === "FirstTimeLoad"){
        results = await getProfileData(req.body);
    }else if(req.body.type === "UpdateOverviewData"){
        results = await updateOverviewData(req.body);
    }else if(req.body.type === "UpdateEducationData"){
        results = await updateEducationData(req.body);
    }else if(req.body.type === "MyJourneyUpdate"){
        results = await UpdateObjective(req.body);
    }

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    //console.log("SchoolMaster : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");