import React from 'react'

type FieldDetailsProps = {
    title: string
    children: React.ReactNode
} & React.ComponentPropsWithoutRef<'div'>

const FieldDetails = ({
    title,
    children,
    className,
    ...props
}: FieldDetailsProps) => {
    return (
        <div className={`flex flex-col ${className}`} {...props}>
            <p className="text-labels dark:text-border">{title}</p>
            {children}
        </div>
    )
}

export default FieldDetails
