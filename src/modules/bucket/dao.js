const dbHelper = require( './../../core/utils/dbHelper' );

exports.addProductToBucket = async( productObj ) => {

    const product = await dbHelper.Bucket.create( productObj );

    if( !product ) {

        throw new Error( "Failed to add product in bucket" );

    }

    return product.id;

}

exports.removeProductFromBucket = async( bucketId, userId ) => {

    const isRemoved = await dbHelper.Bucket.update( { isActive: 'false' }, { where: { id: bucketId, userId: userId } } );

    if( !isRemoved ) {

        throw new Error( "Failed to remove product from bucket" );

    }

    return true;

}

exports.getBucketProductDetails = async( productId, userId ) => {

    const bucketList = await dbHelper.Bucket.findOne( { where: { productId: productId, userId: userId, isActive: 'true' } } )

    if( bucketList ) {

        throw new Error( "Product already available in bucket!" );

    }

    return bucketList;
    
}  

exports.getProductListByUser = async( userId ) => {

    let queryString = `SELECT b.id, b.productId, b.quantity, b.isActive, p.productName, p.image, p.origionalPrice, p.netSellingPrice, p.shortDescription as productShortDescription, p.description as productDescription, c.categoryName, c.description as categoryDescription 
                        from bucket as b LEFT JOIN products as p on b.productId = p.id 
                        LEFT JOIN category as c on p.categoryId = c.id 
                        where b.userId = ${ userId } AND b.isActive = 'true' AND p.isActive = 'true'`;

    const userBucketList = await dbHelper.sequelize.query( queryString, { raw: true, type: dbHelper.Sequelize.QueryTypes.SELECT } )

    if( !userBucketList ) {

        throw new Error( "Failed to get bucket product details" );

    }

    return userBucketList;

}