import React from 'react';

const Pagination = () => {
    return (
            <div className="kt-portlet__body">
                <div className="tab-content">
                    <div className="kt-section">
                            {/*begin: Pagination*/}
                            <div className="kt-pagination  kt-pagination--brand">
                                <ul className="kt-pagination__links">
                                    <li className="kt-pagination__link--first">
                                        <a href="void">
                                            <i className="fa fa-angle-double-left kt-font-brand"/>
                                        </a>
                                    </li>
                                    <li className="kt-pagination__link--next">
                                        <a href="void">
                                            <i className="fa fa-angle-left kt-font-brand"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="void">1</a>
                                    </li>
                                    <li>
                                        <a href="void">2</a>
                                    </li>
                                    <li>
                                        <a href="void">3</a>
                                    </li>
                                    <li className="kt-pagination__link--active">
                                        <a href="void">4</a>
                                    </li>
                                    <li>
                                        <a href="void">5</a>
                                    </li>
                                    <li className="kt-pagination__link--prev">
                                        <a href="void">
                                            <i className="fa fa-angle-right kt-font-brand"/>
                                        </a>
                                    </li>
                                    <li className="kt-pagination__link--last">
                                        <a href="void">
                                            <i className="fa fa-angle-double-right kt-font-brand"/>
                                        </a>
                                    </li>
                                </ul>
                                <div className="kt-pagination__toolbar">
                                    <select className="form-control kt-font-brand" style={{width: "60px"}}>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <span className="pagination__desc">
                                        Displaying 10 of 230 records
                                    </span>
                                </div>
                            </div>
                            {/*end: Pagination*/}
                    </div>
                </div>
            </div>
    );
};

export default Pagination;