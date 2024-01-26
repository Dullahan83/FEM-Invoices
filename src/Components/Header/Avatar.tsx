import React from 'react'

const Avatar = () => {
    return (
        <div className="aspect-square h-fit w-8 overflow-hidden rounded-full lg:w-10">
            <img
                src="/assets/image-avatar.jpg"
                alt="avatar"
                className="h-full w-full"
            />
        </div>
    )
}

export default Avatar
