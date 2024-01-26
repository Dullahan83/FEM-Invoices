import React from 'react'

const useTheme = () => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(
        localStorage.getItem('theme') ? true : false
    )

    const handleTheme = () => {
        setIsDarkTheme((prev) => !prev)
    }
    React.useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.removeItem('theme')
        }
    }, [isDarkTheme])
    return { isDarkTheme, handleTheme }
}

export default useTheme
