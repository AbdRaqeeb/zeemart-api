import React, {Fragment} from 'react';
import { addComma } from '../../utils/formatNumber';


const CustomerItem = ({ customer, index }) => {
    const { user_id, firstname, lastname, phone, Orders, address } = customer;

    //eslint-disable-next-line
    Array.prototype.sum = function(prop) {
      let total = 0;
        for (let i = 0, _len = this.length; i < _len; i++) {
            total += parseInt(this[i][prop])
        }
        return total;
    };

    const payment = Orders.length > 0 ? Orders.sum("amount") : 0.0;

    const home = address ? address : 'nil';


    return (
        <Fragment>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{user_id}</td>
                <td>{lastname}{' '}{firstname}</td>
                <td>{phone}</td>
                <td>{Orders.length}</td>
                <td>{addComma(payment)}</td>
                <td>{home}</td>
            </tr>
        </Fragment>
    );
};

export default CustomerItem;