const express = require('express');
const cors = require('cors');
const fs = require( 'fs' );

const app = express();
const port = process.env.PORT || 8080;

//Configuring Cors
app.use( cors( { origin: '*' } ) );

app.use( express.json( { extended: false } ) )

//DB Interaction
require( './src/core/utils/dbHelper' );

app.use( '/api', require( './router' ) );

//Directory Manager
if ( ! fs.existsSync('./uploads/profile-pic')) {
    fs.mkdir("./src/assets/uploads", { recursive: true }, function(err) {
      if (err) {
        console.log("Failed to create new directory.")
      } else {
        // console.log("New directory successfully created.")
      }
    })
}

app.use('/image', express.static('src/assets/uploads')); 

const { invalidRoute, universalErrorHandler } = require( './src/core/utils/errorHandler' );

app.use( invalidRoute );
app.use( universalErrorHandler );


//Server Configuration
app.listen(port, () => {
    console.log( `App Live On PORT ${ port }` )
})