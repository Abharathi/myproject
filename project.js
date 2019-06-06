'use strict';
var Hapi=require('@hapi/hapi');
var mysql=require('mysql');

var server=new Hapi.Server({
    host:'localhost',
    port:3000
});
server.route({
    method:"GET",
    path:"/",
    handler:(request,reply)=>{
        return "Welcome to HAPI Server";
    }
})
// 1 get method
server.route({
    method:"GET",
    path:"/api/producer",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from producer`, function (error, producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
})
// 2 post method
server.route({
    method:"POST",
    path:"/api/producer",
    handler:(request,reply)=>{
        var newproducer= request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`INSERT INTO Producer(Id,Name,Email,Password_hash,Twitter_Name,Soundcloud_Name,Producer_Status) VALUES(${newproducer.Id},'${newproducer.Name}','${newproducer.Email}','${newproducer.Password_hash}','${newproducer.Twitter_Name}','${newproducer.Soundcloud_Name}','${newproducer.Producer_Status}')`, function (error, producer, fields) {
                if (error) reject(error);
                
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
})
// 3 get producer id
server.route({
    method:"GET",
    path:"/api/producer/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from producer WHERE Id=${id}`, function (error, producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
})
//4 put method
server.route({
    method:"PUT",
    path:"/api/producer/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var updateproducer=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`UPDATE Producer SET Name='${updateproducer.Name}'WHERE Id=${id}`, function (error, producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
})
// 5 delete producer
server.route({
    method:"DELETE",
    path:"/api/producer/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`DELETE from Producer WHERE Id=${id}`, function (error, res, fields) {
                if (error) reject(error);
                resolve(res);
              });
              connection.query(`DELETE from Beat WHERE Beat_Id=${id}`, function (error, res, fields) {
                if (error) reject(error);
                resolve(res);
              });
              connection.end();
        })
        
    }
})

//6 producer id approvedbeats
server.route({
    method:"GET",
    path:"/api/producer/{id}/approvedbeats",
    handler:(request,reply)=>{
        //var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from Beat WHERE Approved=1`, function (error, producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
})
//7 producer id submitted
server.route({
    method:"GET",
    path:"/api/producer/{id}/submittedbeats",
    handler:(request,reply)=>{
        //var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from Beat WHERE Submit_Date is NOT NULL`, function (error, producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
})
//8 beat submitted
server.route({
    method:"GET",
    path:"/api/beat/submitted",
    handler:(request,reply)=>{
        //var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from Beat WHERE Submit_Date Is NOT NULL`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})
// 9 get start date,end date
server.route({
    method:"GET",
    path:"/api/beat/approve/{startdate}/{enddate}",
    handler:(request,reply)=>{
        var startdate=request.params.startdate;
        var enddate=request.params.enddate;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * FROM beat WHERE Approved=1 and Submit_Date between'${startdate}' and '${enddate}'`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})
// 10 get beat start date
server.route({
    method:"GET",
    path:"/api/beat/approve/{startdate}",
    handler:(request,reply)=>{
        var startdate=request.params.startdate;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();

              connection.query(`SELECT * FROM beat WHERE Approved=1 and Submit_Date between'${startdate}' and now()`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
     
              connection.end();
        })
        
    }
})
//11 beat get pending
server.route({
    method:"GET",
    path:"/api/beat/pending",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();

              connection.query(`SELECT * FROM beat WHERE Approved=1 and Approval_Date > now()`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
     
              connection.end();
        })
        
    }
})
//12 beat post
server.route({
    method:"POST",
    path:"/api/beat",
    handler:(request,reply)=>{
        var newbeat= request.payload;
        if(newbeat.Beat_Name.includes("Must Listen")){
            return 'Name Must be valid';
        }
        else{
            return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`INSERT INTO Beat(Beat_Name,Beat_Url,Approved,Id,Submit_Date,Approval_Date,Post_DateTime) 
		    VALUES('${newbeat.Beat_Name}','${newbeat.Beat_Url}','${newbeat.Approved}',
		    '${newbeat.Id}','${newbeat.Submit_Date}','${newbeat.Approval_Date}','${newbeat.Post_DateTime}')`, function (error, beat, fields) {
                if (error) reject(error);
                
                resolve(beat);
              });
               
              connection.end();
        })
        } 
    }
})
// 13 beat get id
server.route({
    method:"GET",
    path:"/api/beat/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from Beat WHERE Beat_Id=${id}`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})
// 14 beat delete id
server.route({
    method:"DELETE",
    path:"/api/beat/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`delete from beat WHERE Beat_Id=${id}`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})
// 15 beat get
server.route({
    method:"GET",
    path:"/api/beat",
    handler:(request,reply)=>{
        //var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`SELECT * from Beat `, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})
//16 beat put id
server.route({
    method:"PUT",
    path:"/api/beat/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var updatebeat=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`UPDATE beat SET Beat_Name='${updatebeat.Beat_Name}'WHERE Beat_Id=${id}`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})
//17 put beats id approve
server.route({
    method:"PUT",
    path:"/api/beat/{id}/approve",
    handler:(request,reply)=>{
        var id=request.params.id;
        var updatebeat=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`UPDATE beat SET Approval_Date='${updatebeat.Approval_date}', Post_DateTime='${updatebeat.Post_DateTime}'WHERE Beat_Id=${id}`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})
// 18 beats put unapprove
server.route({
    method:"PUT",
    path:"/api/beat/{id}/unapprove",
    handler:(request,reply)=>{
        var id=request.params.id;
        //var updatebeat=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
     
              connection.query(`UPDATE beat SET Approval_Date=NULL, Post_DateTime=NULL WHERE Beat_Id=${id}`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})
server.start();
console.log("Server is started");