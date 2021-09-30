const bucketDao = require( './dao' );
const userDao = require( './../product/dao' );
const moment = require( 'moment' );

exports.addProductToBucket = async( req ) => {

    try {

        let bucketProductDetails = req.body.bucketProductDetails;
        let userId = req.body.userId;

        if( !bucketProductDetails ) {

            throw new Error( "Product details is required!" );

        }

        if( !userId ) {

            throw new Error( "User id is required!" );

        }

        if( !bucketProductDetails.productId )  {

            throw new Error( "All fields are mandatory!" );

        }

        bucketProductDetails.quantity = 1;
        bucketProductDetails.timestamp = moment().unix();
        bucketProductDetails.userId = userId;

        await userDao.getProductDetails( bucketProductDetails.productId );

        await bucketDao.getBucketProductDetails( bucketProductDetails.productId, userId )
        
        bucketProductDetails.id = await bucketDao.addProductToBucket( bucketProductDetails );

        return bucketProductDetails;

    } catch( err ) {

        throw new Error( err.message );

    }

}

exports.removeProductFromBucket = async( req ) => {

    try {

        let bucketId = req.params.productId;
        let userId = req.params.userId;

        if( !bucketId ) {

            throw new Error( "Bucket product id is required!" );

        }

        if( !userId ) {

            throw new Error( "user id is required!" );

        }

        const isRemoved = await bucketDao.removeProductFromBucket( bucketId, userId );

        return isRemoved && "Product Removed Successfully!";

    } catch( err ) {

        throw new Error( err.message );

    }

}

exports.getBucketProducts = async( req ) => {

    try {

        let userId = req.params.userId;

        if( !userId ) {

            throw new Error( "user id is required!" );

        }

        const userBucketProducts = await bucketDao.getProductListByUser( userId );

        return userBucketProducts;
        
    } catch( err ) {

        throw new Error( err.message );

    }

}