var Todos = require("../models/todoModel");

function getTodos(res){
    Todos.find(function(err, todos){
        if(err){
            res.statis(500).json(err);
        }else{
            res.json(todos);
        }
    });
}

module.exports = function(app){

    app.get("/api/todos", function(req,res){
        getTodos(res);
    });

    // get all row
    app.get("/api/todo/:id", function(req, res){

        Todos.findById({_id: req.params.id}, function(err, todo){
            if(err){
                throw err;
            }else{
                res.json(todo);
            }
        });  
    });

    // create
    app.post("/api/todo", function(req, res){

        var todo = { 
            text: req.body.text,
            isDone: req.body.isDone
        };

        Todos.create(todo, function(err, todo){
            if(err){
                throw err;
            }else{
                getTodos(res);
            }
        });
    });

    // update
    app.put("/api/todo", function(req, res){
        if(!req.body._id){
            return res.status(500).send("ID is required");
        }else{
            Todos.update({
                _id: req.body._id
            },{
                text: req.body.text,
                isDone: req.body.isDone
            }, function(err, todo){
                if(err){
                    return res.status(500).json(err);
                }else{
                    getTodos(res);
                }
            });
        }
    });

    // delete
    app.delete("/api/todo/:id", function(req, res){
        Todos.remove({
            _id: req.params.id
        }, function(err, todo){
            if(err){
                return res.status(500).json(err);
            }else{
                getTodos(res);
            }
        });
    });
}