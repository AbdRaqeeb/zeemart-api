import React, {useContext, useEffect} from 'react';
import TypeHeader from "./TypeHeader";
import TypeSearch from "./TypeSearch";
import TypeContext from "../../context/type/typeContext";
import TypeTable from "./TypeTable";


const Types = () => {
    const typeContext = useContext(TypeContext);

    const { getTypes, types, filtered } = typeContext;

    useEffect(() => {
        getTypes();

        //eslint-disable-next-line
    }, []);


    return (
        <div className="kt-portlet kt-portlet--mobile">
            <TypeHeader />
            <TypeSearch />
            <TypeTable types={types} filtered={filtered} />
        </div>
    );
};

export default Types;