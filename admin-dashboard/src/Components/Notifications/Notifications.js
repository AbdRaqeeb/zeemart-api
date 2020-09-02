import React from 'react';

const Notifications = () => {
    return (
        <div className="row">
            <div className="col-md">
                <div className="kt-portlet">
                    <form className="kt-form" style={{ width: "60%", margin: "auto" }}>
                        <div className="kt-portlet__body">
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" className="form-control" aria-describedby="emailHelp"
                                       placeholder="Enter Subject" />
                                    <span className="form-text text-muted">Subject of the email to be pushed</span>
                            </div>
                            <div className="form-group form-group-last">
                                <label htmlFor="exampleTextarea">Message</label>
                                <textarea className="form-control" id="exampleTextarea" rows="8"></textarea>
                            </div>
                        </div>
                        <div className="kt-portlet__foot">
                            <div className="kt-form__actions">
                                <button type="reset" className="btn btn-primary">Submit</button>
                                <button type="reset" className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Notifications;