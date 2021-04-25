const mongoose = require('mongoose');



const dbConnection = async () => {

   try {
       
    await mongoose.connect('mongodb+srv://task_list_user:G4pE4tvpxBtt3mGc@cluster0.anbii.mongodb.net/test',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');


   } catch ( error ) {
       
    console.log( error );
    throw new Error('Error a la hora de iniciar la base de datos, ver LOGS')

   }

}



module.exports = {
    dbConnection : dbConnection
}