import React, {useContext, useEffect, useState} from 'react';
import '../../assets/css/cartsy/cartsy-main.css';
import ProductHeader from "./ProductHeader";
import ProductSearch from "./ProductSearch";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";
import ProductContext from "../../context/product/productContext";
import CategoryContext from "../../context/category/categoryContext";

const Products = () => {
    const productContext = useContext(ProductContext);
    const categoryContext = useContext(CategoryContext);
    const {products, getProducts, filtered} = productContext;
    const {getCategories, categories} = categoryContext;

    useEffect(() => {
        getProducts();

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        getCategories();

        //eslint-disable-next-line
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    // Get current orders
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="kt-portlet kt-portlet--mobile">
            <ProductHeader/>
            <ProductSearch/>
            <ProductTable products={currentProduct} filtered={filtered} categories={categories}/>
            <Pagination paginate={paginate} productsPerPage={productsPerPage} totalProducts={products.length}/>
        </div>
    );
};

export default Products;