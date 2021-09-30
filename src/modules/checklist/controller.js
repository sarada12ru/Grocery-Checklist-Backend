const checklistDao = require( './dao' );
const userDao = require( './../product/dao' );
const moment = require( 'moment' );

exports.addProductToChecklist = async( req ) => {

    try {

        let checklistProductDetails = req.body.checklistProductDetails;
        let userId = req.body.userId;

        if( !checklistProductDetails ) {

            throw new Error( "Product details is required!" );

        }

        if( !userId ) {

            throw new Error( "User id is required!" );

        }

        if( !checklistProductDetails.productId )  {

            throw new Error( "All fields are mandatory!" );

        }

        checklistProductDetails.timestamp = moment().unix();
        checklistProductDetails.userId = userId;

        await userDao.getProductDetails( checklistProductDetails.productId );

        let isProductAvailable = await checklistDao.getChecklistProductDetails( checklistProductDetails.productId, userId )

        if( isProductAvailable ) {

            throw new Error( "Product Already Exists in checklist" );

        }        
        
        checklistProductDetails.id = await checklistDao.addProductToChecklist( checklistProductDetails );

        return checklistProductDetails;

    } catch( err ) {

        throw new Error( err.message );

    }

}

exports.removeProductFromChecklist = async( req ) => {

    try {

        let checklistId = req.params.productId;
        let userId = req.params.userId;

        if( !checklistId ) {

            throw new Error( "Checklist product id is required!" );

        }

        if( !userId ) {

            throw new Error( "user id is required!" );

        }

        const isRemoved = await checklistDao.removeProductFromChecklist( checklistId, userId );

        return isRemoved && "Product Removed Successfully!";

    } catch( err ) {

        throw new Error( err.message );

    }

}

exports.getChecklistProducts = async( req ) => {

    try {

        let userId = req.params.userId;

        if( !userId ) {

            throw new Error( "user id is required!" );

        }

        const userChecklistProducts = await checklistDao.getProductListByUser( userId );

        return userChecklistProducts;
        
    } catch( err ) {

        throw new Error( err.message );

    }

}