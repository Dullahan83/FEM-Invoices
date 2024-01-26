import React from 'react'
import { cn } from '../Utils/functions'

type MainContainerProps = {
    children: React.ReactNode
    view?: boolean
} & React.ComponentPropsWithoutRef<'div'>

const MainContainer = ({ children, view, ...props }: MainContainerProps) => {
    return (
        <div
            {...props}
            className={cn(
                `lg:pl-25.8 flex h-full w-full flex-1 flex-col items-center px-6 py-8 lg:min-h-screen ${props.className}`
            )}
        >
            <div
                className={cn(
                    'md:w-172 lg:w-182.5 flex h-full w-full flex-1 flex-col gap-y-8 ',
                    {
                        'md:gap-y-6': view,
                    }
                )}
            >
                {children}
            </div>
        </div>
    )
}

export default MainContainer
