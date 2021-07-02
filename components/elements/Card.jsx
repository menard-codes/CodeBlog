import React from 'react';
import cardStyle from './Card.module.css';

function Card({ children }) {
    return (
        <div className={cardStyle.card}>
            {children}
        </div>
    )
}

export default Card
