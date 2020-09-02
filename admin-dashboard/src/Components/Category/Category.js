import React, {useContext, useEffect} from 'react';
import CategoryHeader from "./CategoryHeader";
import CategorySearch from "./CategorySearch";
import CategoryTable from "./CategoryTable";
import CategoryContext from "../../context/category/categoryContext";
import TypeContext from "../../context/type/typeContext";

const Category = () => {
    const categoryContext = useContext(CategoryContext);
    const { categories, getCategories, filtered } = categoryContext;

    const typeContext = useContext(TypeContext);
    const { getTypes, types } = typeContext;

    useEffect(() => {
        getCategories();
        getTypes();

        //eslint-disable-next-line
    }, []);

    return (
        <div className="kt-portlet kt-portlet--mobile">
            <CategoryHeader />
            <CategorySearch />
            <CategoryTable categories={categories} filtered={filtered} types={types} />
        </div>
    );
};

export default Category;