const express = require( 'express' );
const router = express.Router();

const httpHelper = require( './../../core/utils/httpHelper' );
const bucketController = require( './controller' );

router.get( '/list/:userId', ( req, res ) => {

    bucketController.getBucketProducts( req )
        .then( result => httpHelper.sendGetRecordsResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

router.post( '/add', ( req, res ) => {

    bucketController.addProductToBucket( req )
        .then( result => httpHelper.sendGetRecordResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

router.delete( '/remove/:productId/:userId', ( req, res ) => {

    bucketController.removeProductFromBucket( req )
        .then( result => httpHelper.sendAckResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

module.exports = router;