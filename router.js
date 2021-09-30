const express = require( 'express' );
const router = express.Router();

router.use( '/v1/product', require( './src/modules/product/route' ) );

router.use( '/v1/bucket', require( './src/modules/bucket/route' ) );

router.use( '/v1/checklist', require( './src/modules/checklist/route' ) );

router.use( '/v1/common', require( './src/modules/common/route' ) );

router.use( '/v1/category', require( './src/modules/category/route' ) );

module.exports = router;