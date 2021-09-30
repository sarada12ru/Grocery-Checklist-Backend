const express = require( 'express' );
const router = express.Router();
const categoryController = require( './controller' );
const httpHelper = require( './../../core/utils/httpHelper' );

router.get( '/list', ( req, res ) => {

    categoryController.getCategoryList( req )
        .then( result => httpHelper.sendGetRecordsResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

module.exports = router;