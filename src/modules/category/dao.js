const dbHelper = require( './../../core/utils/dbHelper' );

exports.addNewCategory = async( categoryObj ) => {

    const category = await dbHelper.Category.create( categoryObj );

    if( !category ) {

        throw new Error( "Failed to add category!" );

    }

    return category.id;

}

exports.getCategory = async( categoryClauses ) => {

    const category = await dbHelper.Category.findOne( { where : { ...categoryClauses, isActive: 'true' } } );

    if( !category ) {

        throw new Error( "Failed to get category details" );

    }

    return category;

}

exports.categoryList = async() => {

    const categories = await dbHelper.Category.findAll( { where : { isActive: 'true' } } );

    if( !categories ) {

        throw new Error( "Failed to get categories" );

    }

    return categories;

}