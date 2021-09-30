const productDao = require( './dao' );
const moment = require( 'moment' );

var path = require('path');
var fs = require('fs');
const uuid = require('uuid');

exports.addNewProduct = async( req ) => {

    try {

        let productDetails = req.body.productDetails;

        if( !productDetails ) {

            throw new Error( "Product details is required!" );

        }

        if(
            !productDetails.productName || 
            !productDetails.origionalPrice || 
            !productDetails.netSellingPrice || 
            !productDetails.shortDescription || 
            !productDetails.description
        )  {

            throw new Error( "All fields are mandatory!" );

        }

        productDetails.timestamp = moment().unix();
        
        productDetails.id = await productDao.addProduct( productDetails );

        return productDetails;

    } catch( err ) {

        throw new Error( err.message );

    }

}

exports.removeProduct = async( req ) => {

    try {

        let productId = req.params.id;

        if( !productId ) {

            throw new Error( "Product id is required!" );

        }

        const productDetails = await productDao.getProductDetails( productId );

        const isRemoved = await productDao.removeProduct( productId );

        return isRemoved && "Product Removed Successfully!";

    } catch( err ) {

        throw new Error( err.message );

    }

}

exports.getAllProducts = async( req ) => {

    try {

        const products = await productDao.getAllProducts( { isActive: 'true' } );

        return products;
        
    } catch( err ) {

        throw new Error( err.message );

    }

}

exports.uploadImage = async( req ) => {

    try {

        let base64str = req.body.image;
        let imageFormat = req.body.imageFormat;
        let uniqueId = uuid.v4();
        var bufferData = Buffer.from( base64str, 'base64' );
        var fileName = uniqueId + "." + imageFormat;

        return new Promise( ( resolve, reject ) => {

            fs.writeFile( path.join( __dirname, '../../src/assets/uploads/', fileName ), bufferData, 'base64', ( err, result ) => {

                if( err ) {
        
                    reject( "Failed to upload image" );
        
                }
        
                resolve( "image/" + fileName );
        
            } )

        } )

    } catch( err ) {



    }

}