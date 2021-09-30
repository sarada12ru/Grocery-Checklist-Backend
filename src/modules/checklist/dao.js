const dbHelper = require( './../../core/utils/dbHelper' );

exports.addProductToChecklist = async( productObj ) => {

    const product = await dbHelper.Checklist.create( productObj );

    if( !product ) {

        throw new Error( "Failed to add product in checklist" );

    }

    return product.id;

}

exports.removeProductFromChecklist = async( checklistId, userId ) => {

    const isRemoved = await dbHelper.Checklist.update( { isActive: 'false' }, { where: { id: checklistId, userId: userId } } );

    if( !isRemoved ) {

        throw new Error( "Failed to remove product from checklist" );

    }

    return true;

}

exports.getChecklistProductDetails = async( productId, userId ) => {

    const checkListProduct = await dbHelper.Checklist.findOne( { where: { productId: productId, userId: userId, isActive: 'true' } } )

    return checkListProduct;
    
}  

exports.getProductListByUser = async( userId ) => {

    let queryString = `SELECT ch.id, ch.productId, ch.isActive, p.productName, p.image, p.origionalPrice, p.netSellingPrice, p.shortDescription as productShortDescription, p.description as productDescription, c.categoryName, c.description as categoryDescription 
                        from checklist as ch LEFT JOIN products as p on ch.productId = p.id 
                        LEFT JOIN category as c on p.categoryId = c.id 
                        where ch.userId = ${ userId } AND ch.isActive = 'true' AND p.isActive = 'true'`;

    const userChecklistProducts = await dbHelper.sequelize.query( queryString, { raw: true, type: dbHelper.Sequelize.QueryTypes.SELECT } )

    // const userChecklistProducts = await dbHelper.Checklist.findAll( { where : { userId: userId, isActive: 'true' } } );

    if( !userChecklistProducts ) {

        throw new Error( "Failed to get checklist product details" );

    }

    return userChecklistProducts;

}