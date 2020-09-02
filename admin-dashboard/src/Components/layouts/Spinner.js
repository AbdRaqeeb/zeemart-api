import React, {Fragment} from 'react';
import spinner from '../../assets/media/Spinner/spinner.gif'

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="" style={{ width:'200px', margin: 'auto', display: 'block' }}/>
        </Fragment>
    );
};

export default Spinner;