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
server.route({
    method:"GET",
    path:"/books",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'table'
              });
              connection.connect();
     
              connection.query(`SELECT * from books`, function (error, books, fields) {
                if (error) reject(error);
                resolve(books);
              });
               
              connection.end();
        })
        
    }
})
server.route({
    method:"POST",
    path:"/books",
    handler:(request,reply)=>{
        var newbook= request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'table'
              });
              connection.connect();
     
              connection.query(`INSERT INTO books(book_id,author_fname) VALUES('${newbook.book_id}','${newbook.author_fname}')`, function (error, books, fields) {
                if (error) reject(error);
                resolve(books);
              });
               
              connection.end();
        })
        
    }
})
server.route({
    method:"PUT",
    path:"/books/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var updatebook=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'table'
              });
              connection.connect();
     
              connection.query(`UPDATE books SET author_fname='${updatebook.author_fname}'WHERE book_id=${id}`, function (error, books, fields) {
                if (error) reject(error);
                resolve(books);
              });
               
              connection.end();
        })
        
    }
})
server.route({
    method:"DELETE",
    path:"/books/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'table'
              });
              connection.connect();
              connection.query(`DELETE from books WHERE book_id=${id}`, function (error, books, fields) {
                if (error) reject(error);
                resolve(books);
              });
              connection.end();
        })
        
    }
})

server.start((err)=>{
    if(err) throw err;
    console.log("Server is started")
});
/*'use strict';

const Hapi = require('@hapi/hapi');
const  MySQL = require('mysql');

//const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
   var books=[{
        id:1,
        title:'hindubook',
        author:'jack',
    },
    {
        id:2,
        title:'wings of fire',
        author:'abdul kalam',
    },
    {
        id:3,
        title:'knowledge power',
        author:'gandhi',
    },
    {
        id:4,
        title:'manspower',
        author:'nahru',
    }]

    server.route({
        method: 'GET',
        path:'/books',
        handler: (request, reply)=>{
        return new promise((resolve,reject)=>{
        const connection=Mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'table'
        });
        connection.connect();
        connection.query(`SELECT * FROM books`,
        function(error,books,fields){
            if(error) reject (error);
            resolve(books);
        });
        connection.end();
    });
    }
});
server.start((err) => {
    if(err) throw err;
    console.log('server started');
});
    /*
    server.route({
        method: 'POST',
        path: '/api/books',
        handler: function (request,reply) {
    
            var newbook = request.payload;
            books.push(newbook);
            return books;
        }
        });
        server.route({
            method: 'PUT',
            path: '/api/books/{id}',
            handler: function (request,reply) {
        
                var id=request.params.id;
                var updatedBook=books.filter((obj)=>{
                    return obj.id==id;
                })
                updatedBook[0].title=request.payload.title;
                return updatedBook;
            }
            });
            server.route({
                method: 'DELETE',
                path: '/api/books/{id}',
                handler: function (request,reply) {
            
                    var id=request.params.id;
                    var deletedBook=books.filter((obj)=>{
                        return obj.id!=id;
                    })
                    deletedBook[0].title=request.payload.title;
                    return deletedBook;
                }
                });
    

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();*/