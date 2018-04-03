var Todos = require("../models/todoModel");

module.exports = function(app){
    app.get("/api/setupTodos", function(req, res){
        var seedTodos = [
            {
                text: "Học Node.js",
                isDone: false
            },
            {
                text: "Học Angular.js",
                isDone: false
            },
            {
                text: "Viết 1 ứng dụng hoàn chỉnh",
                isDone: false
            }
        ];

        Todos.create(seedTodos, function(err, results){
            res.send(results);
        });
    });
}