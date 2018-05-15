import { Alert } from 'reactstrap';
import React from 'react';

const ErrorMessage = ({ message }) => <Alert color="danger">{message}</Alert>;

export default ErrorMessage;
