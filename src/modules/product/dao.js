const dbHelper = require( './../../core/utils/dbHelper' );

exports.addProduct = async( productObj ) => {

    let product = await dbHelper.Products.create( productObj );

    if( !product ) {

        throw new Error( "Failed to add product" );

    }

    return product.id;

}

exports.getProductDetails = async( id ) => {

    let product = await dbHelper.Products.findByPk( id );

    if( !product ) {

        throw new Error( "Product not found" );        

    }

    return product;

}

exports.getAllProducts = async( productClauses ) => {

    let products = await dbHelper.Products.findAll( { where: productClauses } );

    if( !products ) {

        throw new Error( "Failed to get products" );

    }

    return products;

}

exports.removeProduct = async( id ) => {

    let isRemoved = await dbHelper.Products.update( { isActive: 'false' }, { where: { id: id } } );

    if( !isRemoved ) {

        throw new Error( "Failed to remove product" );

    }

    return isRemoved;

}