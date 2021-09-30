const express = require( 'express' );
const router = express.Router();
const checklistController = require( './controller' );
const httpHelper = require( './../../core/utils/httpHelper' );

router.get( '/list/:userId', ( req, res ) => {

    checklistController.getChecklistProducts( req )
        .then( result => httpHelper.sendGetRecordsResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

router.post( '/add', ( req, res ) => {

    checklistController.addProductToChecklist( req )
        .then( result => httpHelper.sendGetRecordResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

router.delete( '/remove/:productId/:userId', ( req, res ) => {

    checklistController.removeProductFromChecklist( req )
        .then( result => httpHelper.sendAckResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

module.exports = router;