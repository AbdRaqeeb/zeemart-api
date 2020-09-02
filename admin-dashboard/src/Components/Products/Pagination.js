import React from 'react';

const Pagination = ({ totalProducts, productsPerPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage) ; i++) {
        pageNumbers.push(i)
    }

    return (
            <div className="kt-portlet__body">
                <div className="tab-content">
                    <div className="kt-section">
                            {/*begin: Pagination*/}
                            <div className="kt-pagination  kt-pagination--brand">
                                <ul className="kt-pagination__links">
                                    {pageNumbers.map(number => (
                                        <li key={number} className="kt-pagination__link--active">
                                            <a href onClick={() => {paginate(number)}}>
                                                {number}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/*end: Pagination*/}
                    </div>
                </div>
            </div>
    );
};

export default Pagination;