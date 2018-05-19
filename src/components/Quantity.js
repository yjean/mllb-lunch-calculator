import React from 'react';
import numeral from 'numeral';

const Quantity = ({ q }) => <span>{numeral(q).format('0,0.00')}</span>;

export default Quantity;
