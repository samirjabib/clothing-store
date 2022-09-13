import  './category.styles.scss'
import { useParams } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react';


import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/category/categories.selector';


const Category = () => {

    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    console.log('rendering category')

    const [products, setProducts] = useState(categoriesMap[category]);


    useEffect( () => {
        setProducts(categoriesMap[category])
    }, [ category, categoriesMap])

    return(
        <Fragment>
            <h2 className='category-title'>{ category.toUpperCase() }</h2>
            <div className='category-container'>
                {products &&
                    products.map( (product) => <ProductCard product={ product } key={ product.id }/>)
                }
            </div>
       </Fragment>
    )
}

export default Category