const express = require('express');
const app = express();


const { dbConnection } = require('./db/mongoose');
dbConnection();

// Load in mongoose models     
const { Task, List } = require('./db/models/models')

//ROUTES HANDLLERS

/* 
    *GET /lists
    *purpose: Get all lists

*/
app.get( '/lists', async (req, res) => {
    // We want to return an array of all the lists of the databse
    const Lists = await List.find({})

    try {
        
        return res.json({
            ok: true,
            lists: Lists
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
app.post( '/list', (req, res) => {
    //we want to create a new list and put it in the databse, also return this list to the user
})


/* 
    PUT /list/:id
    purpose: Update a specified list
*/
app.put( '/list/:id', (req, res) => {
    //We want update the list of the databse with the data sended in the JSON body request
})


/* 
    DELETE /list/:id
    purpose: DELETE a specified list
*/
app.delete( '/list/:id', (req, res) => {
    //We want delete the list of the databse with the id sended in the JSON body request
})

app.listen( 3000, () =>  {
    console.log('Backend running on port 3000');
});

