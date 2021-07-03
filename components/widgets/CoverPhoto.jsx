import React from 'react'
import CoverStyle from './CoverPhoto.module.css';

function CoverPhoto({ url }) {
    return (
        <div className={CoverStyle.bg}>
            <style jsx>{`
                div {
                    position: absolute;
                    background-image: url("${url}");
                    background-repeat: no-repeat;
                    background-size: min(100%, 800px) 30vh;
                    background-position: center; 
                    height: 30vh;
                    width: 100vw;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    )
}

export default CoverPhoto
