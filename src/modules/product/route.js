const express = require( 'express' );
const router = express.Router();
const productController = require( './controller' );
const httpHelper = require( './../../core/utils/httpHelper' );
const Jimp = require( 'jimp' );
const { upload,imagePath } = require( './helper' );

router.get( '/list', async( req, res ) => {

    productController.getAllProducts( req )
        .then( result => httpHelper.sendGetRecordsResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

router.post( '/add', ( req, res ) => {

    productController.addNewProduct( req )
        .then( result => httpHelper.sendGetRecordResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

router.delete( '/remove/:id', ( req, res ) => {

    productController.removeProduct( req )
        .then( result => httpHelper.sendAckResponse( res, null, result ) )
        .catch( err => httpHelper.sendAckResponse( res, err, null ) )

} )

router.post( '/upload/image', upload.single('image'), ( req, res ) => {

    filename = req.udf;

    Jimp.read( "./" + req.file.path )
    .then(lenna => {

        lenna
        .resize(250, 250)
        .quality(100)
        .write( imagePath+'/'+filename);

        httpHelper.sendGetRecordResponse( res, null, { imgUrl : "image/"+filename } );

    })
    .catch(err => {
      
        httpHelper.sendAckResponse( res, err, null );
        
    } );

} )





module.exports = router;