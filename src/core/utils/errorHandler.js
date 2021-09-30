const httpHelper = require( './httpHelper' );

const invalidRoute = ( req, res ) => {
    // console.log( 'error >> Request ' + req.path + ' could not be handled by any existing routes.' );

    res.status( 500 );

    httpHelper.sendAckResponse( res, new Error( "Invalid API Access Request" ), null );
}; 

const universalErrorHandler = ( err, req, res, next ) => {

    if ( res.headersSent ) {

        return next( err );
    
    }
    
    // console.log( 'error >> Server errorHandler Function :' + err.message );

    res.status( 500 );

    httpHelper.sendAckResponse( res, err, null );
};

module.exports = {
    invalidRoute,
    universalErrorHandler
}