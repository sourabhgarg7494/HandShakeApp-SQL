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
    secret              : 'HandshakeApp',
    resave              : false,
    saveUninitialized   : false,
    duration            : 60 * 60 * 1000,
    activeDuration      :  5 * 60 * 1000,
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

var UserTokens = []


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

async function createCompanyUser(data){ 
    var query = "CALL CreateCompanyUser(?,?,?,?,?,?,?,?,?,?,?)";

    var salt = genSalt.generate();
   
    var passwordHash = bcrypt.hashSync(data.Password + salt, 10);
    console.log(passwordHash); 

    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query,[ data.CompanyName,
        data.EmailAddress,
        data.Country,
        data.State,
        data.City,
        data.Address,
        data.Phone,
        data.Description,
        passwordHash,
        salt,
        'Company']);

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
    console.log(results);
    return results;
}

async function getCompanySignUpMasterData(){ 
    var query = "CALL GetCompanySignUpMaster()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}



async function getProfileData(data){ 
    var profileEmail = data.userId;
    if(profileEmail === ""){
        var UserId = getUserIdFromToken(data.token);
    }else{
        var UserId = profileEmail;
    }
    var query = "CALL GetUserData(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, UserId);

    await con.end();
    console.log(results);
    return results;
}

async function updateOverviewData(data){ 
    var query = "CALL UpdateOverviewData(?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [data.userId,data.firstName,data.lastName]);

    await con.end();
    console.log(results);
    return results;
}

async function updateEducationData(data){ 
    var query = "CALL UpdateEducationData(?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [UserId,data.schoolName,data.major]);

    await con.end();
    console.log(results);
    return results;
}

async function UpdateObjective(data){ 
    var query = "CALL UpdateObjective(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [UserId,data.myJourney]);

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
    let UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [UserId,data.skill]);

    await con.end();
    console.log(results);
    return results;
}

async function getStudentFilterData(data){ 
    var query = "CALL GetStudentFilterData(?,?,?,?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    let UserId = getUserIdFromToken(data.token);
    console.log("inside con");
    var [results, fields] = await con.query(query, [data.studentName,data.schoolName,data.major,data.startIndex,data.rowCount,UserId]);

    await con.end();
    console.log(results);
    return results;
}

async function getStudentFilterMaster(){
    var query = "CALL getStudentFilterMasterData()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}

async function deleteUserSkill(data){ 
    var query = "CALL deleteUserSkill(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    let UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [UserId,data.skill]);
    await con.end();
    console.log(results);
    return results;
}

function getUserIdFromToken(token){
    var User = null;
    User = UserTokens.filter(user => user.Token == token);
    console.log("User JSON: ",User);
    return User[0].userId;
}


app.post('/login',async function(req,res){
    console.log("Inside Login Post Request");
    
    console.log("Req Body : ",req.body);
    results = await getUserData(req.body.username);
    
    var {EmailId, Password, PasswordSalt, UserRole} = results;
    if(EmailId === req.body.username){
            console.log("Inside If");
             bcrypt.compare(req.body.password + PasswordSalt, Password, function(err, r) {
                if(r) {
                    var token = genSalt.generate();
                    res.cookie('cookie', token ,{maxAge: 900000, httpOnly: false, path : '/'});
                    res.cookie('userrole', UserRole ,{maxAge: 900000, httpOnly: false, path : '/'});
                    UserTokens.push({userId: EmailId,role : UserRole ,Token : token});
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

app.post('/logout',async function(req,res){
    console.log("Inside logout Post Request");
    console.log("Req Body : ",req.body);
    var isTokenDeleted;
    UserTokens.filter(function(user){
        if(user.Token === req.body.token){
            UserTokens.splice(UserTokens.indexOf(user),1);
            isTokenDeleted = true;
        }
    });

    if(isTokenDeleted){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end("User Token Deleted");
    }
    else{
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end("User Token Not Found");
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

app.post('/companySignUp',async function(req,res){
    console.log("Inside Company Sign up Post Request");
    console.log("Req Body : ",req.body);
    results = await createCompanyUser(req.body);

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

app.get('/Signup', async function(req,res){
    console.log("Inside signup Login");    
    results = await getSignUpMasterData();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("SchoolMaster : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})


app.get('/companySignUp', async function(req,res){ 
    console.log("Inside Company signup Login");    
    results = await getCompanySignUpMasterData();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Alldata: ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/uploadProfilePic', async function(req,res){
    console.log("inside uploadProfile pic");
    let profilePic = req.files.file;
    let [fileExtension] = profilePic.name.split('.').splice(-1);
    let UserId = getUserIdFromToken(req.body.token);
    let newFilename = UserId+"-ProfilePic-"+Date.now()+"."+fileExtension;

    profilePic.mv(`${uploadPath}/${newFilename}`, async function(err) {
        if (err) {
            return res.status(500).send(err);
        }else{
            results = await UpdateProfilePicLocation(UserId,newFilename);
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

app.get('/studentSearchFilter',async function(req, res){
    console.log("inside student Search Filter get");
    console.log(req);

    let results = await getStudentFilterMaster();

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    //console.log("SchoolMaster : ",JSON.stringify(results));
    res.end(JSON.stringify(results)); 

})

app.post('/studentSearchFilter',async function(req, res){
    console.log("inside student Search Filter post");
    console.log(req);

    let results = await getStudentFilterData(req.body);

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    console.log("Search REsults : ",JSON.stringify(results));
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
        console.log("MyJourneyUpdate");
        console.log(req.body);
        results = await UpdateObjective(req.body);
    }

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    //console.log("SchoolMaster : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/companyProfile', async function(req,res){

    // if (req.body.type === "FirstTimeLoad"){
    //     results = await getProfileData(req.body);
    // }else if(req.body.type === "UpdateOverviewData"){
    //     results = await updateOverviewData(req.body);
    // }else if(req.body.type === "UpdateEducationData"){
    //     results = await updateEducationData(req.body);
    // }else if(req.body.type === "MyJourneyUpdate"){
    //     console.log("MyJourneyUpdate");
    //     console.log(req.body);
    //     results = await UpdateObjective(req.body);
    // }

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    //console.log("SchoolMaster : ",JSON.stringify(results));
    //res.end(JSON.stringify(results));
    res.end("");
})



//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");