const categoryDao = require( './dao' );

exports.getCategoryList = async( req ) => {

    try {
    
        const categoryList = await categoryDao.categoryList();

        return categoryList;

    } catch( err ) {

        throw new Error( err.message );

    }

}