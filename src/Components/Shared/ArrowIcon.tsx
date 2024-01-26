import React from 'react'

type ArrowIconProps = {
    color?: string
} & React.ComponentPropsWithoutRef<'svg'>

const ArrowIcon = ({ color = '#7C5DFA', ...props }: ArrowIconProps) => {
    return (
        <svg
            width="11"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M1 1l4.228 4.228L9.456 1"
                stroke={color}
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
            />
        </svg>
    )
}

export default ArrowIcon
