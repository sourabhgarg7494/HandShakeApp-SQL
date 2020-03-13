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
    var query = "CALL getuserdetailbyemailId(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query,UserEmailId);

    await con.end();
    console.log(results[0][0]);
    return results[0][0];
}

async function createUserData(data){ 
    var query = "CALL createuser(?,?,?,?,?,?,?,?,?,?)";

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
    var query = "CALL createcompanyuser(?,?,?,?,?,?,?,?,?,?,?)";

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
    var query = "CALL getschoolmaster()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}

async function getExperienceMasterData(){ 
    var query = "CALL getexperiencemasterdata()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}

async function getEducationMasterData(){ 
    var query = "CALL geteducationmasterdata()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}

async function getApplicationMasterData(data){ 
    var query = "CALL getapplicationmasterdata(?)";
    var con = await mysql.createConnection(databaseConString);
    var UserId = getUserIdFromToken(data.token);
    console.log("inside con");
    var [results, fields] = await con.query(query,UserId);

    await con.end();
    console.log(results);
    return results;
}



async function getUploadedResumeList(UserId){ 
    var query = "CALL getuploadedresumelist(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, UserId);

    await con.end();
    console.log(results);
    return results;
}


async function getMasterDataJobPosting(){ 
    var query = "CALL getmasterdatajobposting()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}


async function getMasterCompanyProfile(){ 
    var query = "CALL getmastercompanyprofile()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}

async function getNewJobPostMasterData(){ 
    var query = "CALL getnewjobpostmasterdata()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}

async function getNewEventPostMasterData(){ 
    var query = "CALL getneweventpostmasterdata()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}

async function getEventListings(data){ 
    var query = "CALL geteventlistings(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query,[data.eventName,UserId]);

    await con.end();
    console.log(results);
    return results;
}

async function getCompanyEventListings(data){ 
    var query = "CALL getcompanyeventlistings(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query,UserId);

    await con.end();
    console.log(results);
    return results;
}

async function updateStatus(data){ 
    var query = "CALL updatestatus(?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query,[data.status,data.JobId,data.StudentId]);

    await con.end();
    console.log(results);
    return results;
}

async function getEventDetails(data){ 
    var query = "CALL geteventdetails(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query,[data.eventId,UserId]);

    await con.end();
    console.log(results);
    return results;
}

async function getCompanyEventStudentList(data){ 
    var query = "CALL getcompanyeventstudentlist(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query,[data.eventId,UserId]);

    await con.end();
    console.log(results);
    return results;
}

async function registerForEvent(data){ 
    var query = "CALL registerforevent(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query,[data.eventId,UserId]);

    await con.end();
    console.log(results);
    return results;
}

async function leaveEvent(data){ 
    var query = "CALL leaveevent(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query,[data.eventId,UserId]);

    await con.end();
    console.log(results);
    return results;
}

async function getJobPosting(data){ 
    var query = "CALL getjobpostings(?,?,?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query,[data.city,data.jobTitle,data.company,data.jobCategoryFilter,UserId]);

    await con.end();
    console.log(results);
    return results;
}

async function getCompanyJobPosting(data){ 
    var query = "CALL getcompanyjobposting(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query,UserId);

    await con.end();
    console.log(results);
    return results;
}

async function fetchJobApplications(data){ 
    var query = "CALL fetchjobapplications(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query,data.jobId);

    await con.end();
    console.log(results);
    return results;
}

async function getJobDetails(data){ 
    var query = "CALL getjobdetails(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query,[data.jobId,UserId]);

    await con.end();
    console.log(results);
    return results;
}

async function getCompanySignUpMasterData(){ 
    var query = "CALL getcompanysignupmaster()";
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
    var query = "CALL getuserdata(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, UserId);

    await con.end();
    console.log(results);
    return results;
}

async function getCompanyProfileData(data){ 
    var UserId = getUserIdFromToken(data.token);

    var query = "CALL getcompanyuserdata(?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, UserId);

    await con.end();
    console.log(results);
    return results;
}

async function updateCompanyProfileData(data){ 
    var UserId = getUserIdFromToken(data.token);

    var query = "CALL updatecompanyprofiledata(?,?,?,?,?,?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [UserId
                                            ,data.CompanyName
                                            ,data.CompanyAddress
                                            ,data.Country
                                            ,data.State
                                            ,data.City
                                            ,data.Description
                                            ,data.Phone
                                        ]);

    await con.end();
    console.log(results);
    return results;
}

async function insertNewJob(data){ 
    var UserId = getUserIdFromToken(data.token);

    var query = "CALL insertnewjob(?,?,?,?,?,?,?,?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [UserId
                                            ,data.JobTitle
                                            ,data.ApplicationDeadLineDate
                                            ,data.Country
                                            ,data.State
                                            ,data.City
                                            ,data.Address
                                            ,data.Salary
                                            ,data.JobDescription
                                            ,data.jobCategories
                                        ]);

    await con.end();
    console.log(results);
    return results;
}

async function insertNewEvent(data){ 
    var UserId = getUserIdFromToken(data.token);

    var query = "CALL insertnewevent(?,?,?,?,?,?,?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [UserId
                                            ,data.EventName
                                            ,data.EventDescription
                                            ,data.DateAndTime
                                            ,data.Country
                                            ,data.State
                                            ,data.City
                                            ,data.Address
                                            ,data.majors
                                        ]);

    await con.end();
    console.log(results);
    return results;
}

async function updateOverviewData(data){ 
    var query = "CALL updateoverviewdata(?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [data.userId,data.firstName,data.lastName]);

    await con.end();
    console.log(results);
    return results;
}

async function updateEducationData(data){ 
    var query = "CALL updateeducationdata(?,?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [UserId,data.schoolName,data.major,data.cumulativeGPA]);

    await con.end();
    console.log(results);
    return results;
}

async function updateExperienceData(data){ 
    var query = "CALL updateexperiencedata(?,?,?,?,?,?,?,?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [UserId
                                            ,data.CompanyName
                                            ,data.Title
                                            ,data.Address
                                            ,data.State
                                            ,data.City
                                            ,data.Country
                                            ,data.StartDate
                                            ,data.EndDate
                                            ,data.WorkDescription
                                        ]);

    await con.end();
    console.log(results);
    return results;
}

async function UpdateObjective(data){ 
    var query = "CALL updateobjective(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [UserId,data.myJourney]);

    await con.end();
    console.log(results);
    return results;
}

async function UpdateProfilePicLocation(userId,profilePicPath){ 
    var query = "CALL updateprofilepicpath(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [userId,profilePicPath]);

    await con.end();
    console.log(results);
    return results;
}

async function UpdateResumeLocation(userId,resumePath,originalName){ 
    var query = "CALL updateresumepath(?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query, [userId,resumePath,originalName]);

    await con.end();
    console.log(results);
    return results;
}

async function addUserSkill(data){ 
    var query = "CALL adduserskill(?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    let UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [UserId,data.skill]);

    await con.end();
    console.log(results);
    return results;
}

async function applyForJob(data){ 
    var query = "CALL applyforjob(?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    let UserId = getUserIdFromToken(data.token);
    var [results, fields] = await con.query(query, [UserId,data.JobId,data.selectedResume]);

    await con.end();
    console.log(results);
    return results;
}

async function getStudentFilterData(data){ 
    var query = "CALL getstudentfilterdata(?,?,?,?,?,?,?)";
    var con = await mysql.createConnection(databaseConString);
    let UserId = getUserIdFromToken(data.token);
    console.log("inside con");
    var [results, fields] = await con.query(query, [data.studentName,data.schoolName,data.major,data.skill,data.startIndex,data.rowCount,UserId]);

    await con.end();
    console.log(results);
    return results;
}


async function getApplicationData(data){ 
    var query = "CALL getapplicationdata(?,?)";
    var con = await mysql.createConnection(databaseConString);
    let UserId = getUserIdFromToken(data.token);
    console.log("inside con");
    var [results, fields] = await con.query(query, [UserId,data.jobStatusFilter]);

    await con.end();
    console.log(results);
    return results;
}

async function getRegisteredEventList(data){ 
    var query = "CALL getregisteredeventlist(?)";
    var con = await mysql.createConnection(databaseConString);
    let UserId = getUserIdFromToken(data.token);
    console.log("inside con");
    var [results, fields] = await con.query(query, UserId);

    await con.end();
    console.log(results);
    return results;
}


async function getStudentFilterMaster(){
    var query = "CALL getstudentfiltermasterdata()";
    var con = await mysql.createConnection(databaseConString);
    console.log("inside con");
    var [results, fields] = await con.query(query);

    await con.end();
    console.log(results);
    return results;
}

async function deleteUserSkill(data){ 
    var query = "CALL deleteuserskill(?,?)";
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
    console.log("Inside signup");    
    results = await getSignUpMasterData();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("SchoolMaster : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})


app.get('/getExperienceMasterData', async function(req,res){
    console.log("Inside Experience Master");    
    results = await getExperienceMasterData();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Experience Master : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})


app.get('/getEducationMasterData', async function(req,res){
    console.log("Inside signup");    
    results = await getEducationMasterData();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("EducationMasters : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/getUploadedResumeList', async function(req,res){
    console.log("Inside get Resume List"); 
    
    let UserId = getUserIdFromToken(req.body.token);
    results = await getUploadedResumeList(UserId);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("ResumeList : ",JSON.stringify(results));
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

app.post('/application', async function(req,res){ 
    console.log("Inside Company signup Login");    
    results = await getApplicationMasterData(req.body);

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

app.post('/uploadResume', async function(req,res){
    console.log("inside resume pic");
    let resume = req.files.file;
    let [fileExtension] = resume.name.split('.').splice(-1);
    let UserId = getUserIdFromToken(req.body.token);
    let newFilename = UserId+"-Resume-"+Date.now()+"."+fileExtension;

    resume.mv(`${uploadPath}/${newFilename}`, async function(err) {
        if (err) {
            return res.status(500).send(err);
        }else{
            results = await UpdateResumeLocation(UserId,newFilename,resume.name);
            console.log("Uploaded Resume : ",JSON.stringify(results));
            res.json({file: results[0][0].ResumePath
                    , ResumeId : results[0][0].Id
                    , FileName : results[0][0].FileName});
        }
    });

})

app.post('/applyForJob',async function(req, res){
    console.log("inside applyForJob skill");
    console.log(req);
    let results = await applyForJob(req.body);

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    //console.log("SchoolMaster : ",JSON.stringify(results));
    res.end(JSON.stringify(results)); 

})

app.post('/jobPosting', async function(req,res){
    console.log("Inside jobPosting post");   
    var results=null;
    if(req.body.type === "jobListLoad"){
        results = await getJobPosting(req.body);
    }
    else if(req.body.type === "fetchJobDetails")
        results = await getJobDetails(req.body);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("JobPosting : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/CompanyJobPosting', async function(req,res){
    console.log("Inside Company Jobs Posting post");   
    var results=null;
    if(req.body.type === "jobListLoad"){
        results = await getCompanyJobPosting(req.body);
    }
    else if(req.body.type === "fetchJobApplications")
        results = await fetchJobApplications(req.body);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("JobPosting : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.get('/fetchJobMasterData', async function(req,res){
    console.log("Inside Post Job Master Data  get");   
    var results=null;
    results = await getNewJobPostMasterData();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Post Job Master Data : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.get('/fetchEventPostMasterData', async function(req,res){
    console.log("Inside NewEventPostMasterData  get");   
    var results=null;
    results = await getNewEventPostMasterData();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Post Event Master Data : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
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

app.get('/jobPosting', async function(req,res){
    console.log("Inside jobPosting get");   
    var results=null;
    results = await getMasterDataJobPosting();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("JobPosting : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})


app.get('/companyProfile', async function(req,res){
    console.log("Inside Company Profile  get");   
    var results=null;
    results = await getMasterCompanyProfile();

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("companyProfile : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/updateStatus', async function(req,res){
    console.log("Inside Update Status get");   
    var results=null;
    results = await updateStatus(req.body);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Event Listing : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/eventListings', async function(req,res){
    console.log("Inside Event Listings get");   
    var results=null;
    results = await getEventListings(req.body);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Event Listing : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/CompanyEventListings', async function(req,res){
    console.log("Inside Company Event Listings get");   
    var results=null;
    results = await getCompanyEventListings(req.body);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Event Listing : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/eventDetails', async function(req,res){
    console.log("Inside Event details get");   
    var results=null;
    results = await getEventDetails(req.body);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Event Details : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/CompanyEventStudentList', async function(req,res){
    console.log("Inside CompanyEventStudentList get");   
    var results=null;
    results = await getCompanyEventStudentList(req.body);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Event Details : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/registerForEvent', async function(req,res){
    console.log("Inside Register Event");   
    var results=null;
    results = await registerForEvent(req.body);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Event REgister : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/leaveEvent', async function(req,res){
    console.log("Inside Leave Event get");   
    var results=null;
    results = await leaveEvent(req.body);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Leave Event : ",JSON.stringify(results));
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

app.post('/applicationsSearch',async function(req, res){
    console.log("inside application list post");
    console.log(req);

    let results = await getApplicationData(req.body);

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    console.log("Search REsults : ",JSON.stringify(results));
    res.end(JSON.stringify(results)); 

})


app.post('/getRegisteredEventList',async function(req, res){
    console.log("inside Registered event list post");
    console.log(req);

    let results = await getRegisteredEventList(req.body);

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
    }else if(req.body.type === "UpdateExperienceData"){
        results = await updateExperienceData(req.body);
    }

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    //console.log("SchoolMaster : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
})

app.post('/companyProfile', async function(req,res){

    if (req.body.type === "FirstTimeLoad"){
        results = await getCompanyProfileData(req.body);
    }else if(req.body.type === "updateCompanyProfile"){
        results = await updateCompanyProfileData(req.body);
    }

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    console.log("Company Profile FirstTime Load : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
    
})

app.post('/postNewJob', async function(req,res){

    results = await insertNewJob(req.body);

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    console.log("Company Post New Job: ",JSON.stringify(results));
    res.end(JSON.stringify(results));
    
})

app.post('/postNewEvent', async function(req,res){

    results = await insertNewEvent(req.body);

    res.writeHead(200,{  
        'Content-Type' : 'application/json'
    });
    console.log("Company Post New Event : ",JSON.stringify(results));
    res.end(JSON.stringify(results));
    
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");