import React from 'react'
import useTheme from '../../Hooks/useTheme'
import MoonIcon from '../Shared/MoonIcon'
import SunIcon from '../Shared/SunIcon'

const ThemeSwitcher = () => {
    const { isDarkTheme, handleTheme } = useTheme()
    return (
        <div onClick={handleTheme} className="h-fit w-fit">
            {isDarkTheme ? <MoonIcon /> : <SunIcon />}
        </div>
    )
}

export default ThemeSwitcher
