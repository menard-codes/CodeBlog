import React from 'react';
import Image from 'next/image';

import AvatarStyle from './Avatar.module.css';

function Avatar({ url }) {
    return (
        <div>
            <Image src={url} alt="user avatar" width={120} height={120} className={AvatarStyle.avatar} />
        </div>
    )
}

export default Avatar
