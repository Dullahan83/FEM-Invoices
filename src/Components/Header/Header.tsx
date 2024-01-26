import React from 'react'
import ComposedLogo from '../Shared/ComposedLogo'
import AvatarContainer from './AvatarContainer'
import ThemeSwitcher from './ThemeSwitcher'

const Header = () => {
    return (
        <div className="lg:w-25.8 bg-elem-dark lg:rounded-r-2.5xl fixed z-50 flex h-[72px] w-full sm:h-20 lg:h-screen lg:flex-col">
            <div className="flex h-full w-full items-center justify-between pr-6 md:pr-8 lg:flex-col lg:pb-8 lg:pr-0">
                <ComposedLogo />
                <ThemeSwitcher />
            </div>
            <AvatarContainer />
        </div>
    )
}

export default Header
