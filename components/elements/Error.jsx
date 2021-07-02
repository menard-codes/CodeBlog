import React from 'react';
import ErrorStyle from './Error.module.css';

function Error({ msg }) {
    return (
        <div className={ErrorStyle.error}>
            Error: {msg}
        </div>
    )
}

export default Error
