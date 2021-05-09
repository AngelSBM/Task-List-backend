const express = require('express');
const bodyParser = require('body-parser');
const { dbConnection } = require('./db/mongoose');
const cors = require('cors');

// Load in mongoose models     
// const { Task, List } = require('./db/models/models')
const List = require('./db/models/list.model');
const Task = require('./db/models/task.model');


const app = express();

app.use(bodyParser.json());

app.use( cors() );



dbConnection();



//ROUTES HANDLLERS

/* 
    *GET /lists
    *purpose: Get all lists

*/
app.get( '/list', async (req, res) => {
    // We want to return an array of all the lists of the databse
    const lists = await List.find({})

    try {
        
        return res.json({
            ok: true,
            lists: lists
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hubo un error obteniendo las listas'
        })
    }

})


/* 
    POST /list
    purpose: Create a list 
*/
app.post( '/list', async (req, res) => {
    //we want to create a new list and put it in the databse, also return this list to the user
    const title = req.body.title;

    const newList = new List({
        title: title
    });

    try {        
        
        const listDB = await newList.save();

        return res.json({
            list: listDB
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Algo ha salido mal creando la lista'
        })
    }

})


/* 
    PUT /list/:id
    purpose: Update a specified list
*/
app.put( '/list/:id', async (req, res) => {
    //We want update the list of the databse with the data sended in the JSON body request
    const id  = req.headers.id;
    const title = req.body.title;

    if( !id ){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ID en la petición'
        })
    }

    try {
        
        const updatedList = await List.findByIdAndUpdate( id, { title }, {useFindAndModify: false}  );

        return res.json({
            ok: true,
            updatedList
        });

    } catch (error) {
        
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Algo ha salido mal actualizando la lista'
        });

    }


})


/* 
    DELETE /list/:id
    purpose: DELETE a specified list
*/
app.delete( '/list/:id', async (req, res) => {
    //We want delete the list of the databse with the id sended in the JSON body request

    const id  = req.headers.id;

    if( !id ){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ID en la petición'
        })
    }

    try {
        
        const deletedList = await List.findByIdAndDelete( id );

        return res.json({
            ok: true,
            msg: 'Lista eliminada correctamente'
        });

    } catch (error) {
        
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Algo ha salido mal eliminando la lista'
        });

    }


});



/* TASKS */

/* 
    GET list/tasks
    purpose: return all the tasks in the database
*/
app.get( '/list/tasks', async (req, res) => {
    // We want to return an array of all the tasks in the list with the ID we are receiving

    const id = req.headers.id; 

    if( !id ){

        return res.status(400).json({
            ok: false,
            msg: 'Falta el id de la lista en los header [ id ]'
        });

    }

    const tasks = await Task.find({
        listId: id
    })

    try {
        
        return res.json({
            ok: true,
            tasks
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hubo un error obteniendo los tasks'
        })
    }

})


/* 
    POST list/task
    purpose: Create a task in the task collection,
*/
app.post( '/list/tasks/post', async (req, res) => {
    // We want to create a task with the fields title, and listId which is the Id of the list that own our task 
    const title = req.body.title;
    const listId = req.headers.listid;

    if( !listId ){
        return res.json({
            ok: false,
            msg: 'falta el id de la lista a la que pertenecera el task ',
        })
    }


    const task = new Task({
        title,
        listId
    });

    try {
    
        const taskDB = await task.save();

        return res.json({
            ok: true,
            task: taskDB
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hubo un error obteniendo las listas'
        })
    }

})


/* 
    UPDATE list/tasks
    purpose: update a task
*/
app.put( '/list/tasks/update', async (req, res) => {
    // We want to get the id of the task in the request and update that task
    const id  = req.headers.id;
    const body = req.body;

    if( !id ){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ID en la petición'
        })
    }

    try {
        
        const updatedTask = await Task.findByIdAndUpdate( id, { 
            title: body.title,
            completed: body.completed
         },  {useFindAndModify: false} );

        return res.json({
            ok: true,
            updatedTask
        });

    } catch (error) {
        
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Algo ha salido mal actualizando el task'
        });

    }

})


/* 
    POST list/task
    purpose: Create a task in the task collection,
*/
app.delete( '/list/tasks/delete', async (req, res) => {
    // We want to create a task with the fields title, and listId which is the Id of the list that own our task 
    
    const id  = req.headers.id;

    if( !id ){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ID en la petición'
        })
    }

    try {
        
        const deletedTask = await Task.findByIdAndDelete( id );

        return res.json({
            ok: true,
            msg: 'TASK eliminada correctamente'
        });

    } catch (error) {
        
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Algo ha salido mal eliminando el task'
        });

    }

})


app.listen( 3000, () =>  {
    console.log('Backend running on port 3000');
});

