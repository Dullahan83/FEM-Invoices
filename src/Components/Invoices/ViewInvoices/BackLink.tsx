import React from 'react'
import { NavLink } from 'react-router-dom'
import ArrowIcon from '../../Shared/ArrowIcon'

const BackLink = ({
    inModal,
    ...props
}: { inModal?: boolean } & React.ComponentPropsWithoutRef<'button'>) => {
    return (
        <>
            {inModal ? (
                <button
                    {...props}
                    type="button"
                    className="text-Heading-S-variant text-important mb-6.5 flex w-fit items-center gap-x-6 sm:hidden dark:text-white"
                >
                    <ArrowIcon className="mr-6 rotate-90" />
                    Go Back
                </button>
            ) : (
                <NavLink
                    to={'/'}
                    className="text-Heading-S-variant text-important mb-8 flex w-fit items-center gap-x-6 sm:mb-2 dark:text-white"
                >
                    <ArrowIcon className="rotate-90" />
                    Go back
                </NavLink>
            )}
        </>
    )
}

export default BackLink
