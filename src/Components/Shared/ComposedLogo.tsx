import React from 'react'
import Logo from './Logo'

const ComposedLogo = () => {
    return (
        <div className='w-18 lg:w-25.8 rounded-r-2.5xl bg-primary after:rounded-tl-2.5xl  after:bg-primary-active relative z-10 flex aspect-square items-center justify-center overflow-hidden after:absolute after:bottom-0 after:right-0 after:-z-10 after:h-1/2 after:w-full after:content-[""] sm:w-20'>
            <Logo className="w-10" />
        </div>
    )
}

export default ComposedLogo
