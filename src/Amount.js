import React from 'react';
import numeral from 'numeral';

const Amount = ({ amount }) => <span>{numeral(amount).format('$0,0.00')}</span>;

export default Amount;
