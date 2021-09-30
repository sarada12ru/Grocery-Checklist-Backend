const moment = require( 'moment' );
const async = require( 'async' );
const checklistDao = require( './../checklist/dao' )
const bucketDao = require( './../bucket/dao' )

exports.getBucketAndChecklist = async( req ) => {

    try {

        let userId = req.params.userId;

        if( !userId ) {
    
            throw new Error( "User id is required" );
    
        }
    
        const checklist = await checklistDao.getProductListByUser( userId );
    
        const bucketList = await bucketDao.getProductListByUser( userId );

        let response = {
            checklist,
            bucketList
        }

        return response;

    } catch( err ) {

        throw new Error( err.message );

    }

}