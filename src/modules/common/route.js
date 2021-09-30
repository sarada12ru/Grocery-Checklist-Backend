const express = require( 'express' );
const router = express.Router();
const commonController = require( './controller' );
const httpHelper = require( './../../core/utils/httpHelper' );

router.get( '/:userId', async( req, res ) => {

    commonController.getBucketAndChecklist( req )
        .then( result => httpHelper.sendGetRecordResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

module.exports = router;