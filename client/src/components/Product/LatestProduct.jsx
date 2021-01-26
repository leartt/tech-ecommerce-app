import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getLatestProducts } from '../../redux/actions/productActions'
import ProductCard from './ProductCard'
import { Row } from 'react-bootstrap'

const LatestProduct = () => {

    const dispatch = useDispatch();
    const latestProducts = useSelector(state => state.product.latestProducts);


    useEffect(() => {
        dispatch(getLatestProducts());
    }, [])

    return (
        <div>
            <Row>
                {latestProducts?.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </Row>
        </div>
    )
}

export default LatestProduct
