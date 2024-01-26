import React from 'react'
import AddIcon from './AddIcon'

type ButtonProps = {
    variant?:
        | 'New Invoice'
        | 'Delete'
        | 'Edit'
        | 'Mark'
        | 'Cancel'
        | 'Add Item'
        | 'Discard'
        | 'Draft'
        | 'Save'
    children?: React.ReactNode
} & React.ComponentPropsWithoutRef<'button'>

const CustomButton = ({ children, variant, ...props }: ButtonProps) => {
    switch (variant) {
        case 'New Invoice':
            return (
                <button
                    {...props}
                    className={`md:w-37.5  bg-primary text-Heading-S-variant flex items-center whitespace-pre rounded-full p-1.5 pr-3 font-bold text-white md:py-2 md:pl-2 `}
                >
                    <AddIcon />
                    New <span className="hidden md:flex">Invoice</span>
                </button>
            )

        case 'Edit':
            return (
                <button
                    {...props}
                    className={`text-Heading-S-variant bg-elem-sub-light text-labels dark:text-border dark:bg-elem-sub-dark hover:bg-border dark:hover:text-labels flex h-12 items-center whitespace-pre rounded-full px-6 font-bold dark:hover:bg-white `}
                >
                    Edit
                </button>
            )
        case 'Cancel':
            return (
                <button
                    {...props}
                    className={`text-Heading-S-variant bg-elem-sub-light text-labels dark:text-border dark:bg-elem-sub-dark hover:bg-border dark:hover:text-labels flex h-12 items-center whitespace-pre rounded-full px-6 font-bold dark:hover:bg-white `}
                >
                    Cancel
                </button>
            )

        case 'Discard':
            return (
                <button
                    {...props}
                    className={`text-Heading-S-variant bg-elem-sub-light text-labels dark:text-border dark:bg-elem-sub-dark hover:bg-border dark:hover:text-labels w-21 flex h-12 items-center justify-center whitespace-pre rounded-full font-bold sm:w-24 sm:px-6 dark:hover:bg-white `}
                >
                    Discard
                </button>
            )
        case 'Delete':
            return (
                <button
                    {...props}
                    className={`text-Heading-S-variant bg-secondary active:bg-secondary-active hover:bg-secondary-active flex h-12 w-[89px] items-center justify-center whitespace-pre rounded-full font-bold text-white`}
                >
                    Delete
                </button>
            )
        case 'Mark':
            return (
                <button
                    {...props}
                    className={`text-Heading-S-variant bg-primary active:bg-primary-active hover:bg-primary-active flex h-12 w-[149px] items-center justify-center whitespace-pre rounded-full font-bold text-white`}
                >
                    Mark as paid
                </button>
            )
        case 'Add Item':
            return (
                <button
                    {...props}
                    className={`text-Heading-S-variant bg-elem-sub-light text-labels dark:text-border dark:bg-elem-sub-dark hover:bg-border dark:hover:text-labels mt-4 flex h-12 w-full items-center justify-center  rounded-full font-bold dark:hover:bg-white`}
                >
                    + Add New Item
                </button>
            )
        case 'Save':
            return (
                <button
                    {...props}
                    className={`text-Heading-S-variant bg-primary active:bg-primary-active hover:bg-primary-active flex h-12 items-center justify-center whitespace-pre rounded-full px-4 font-bold text-white sm:px-6`}
                >
                    {children}
                </button>
            )
        case 'Draft':
            return (
                <button
                    {...props}
                    className={`text-Heading-S-variant bg-draft active:bg-elem-dark hover:bg-elem-dark text-paragraph flex h-12 w-[117px] items-center justify-center whitespace-pre rounded-full font-bold hover:text-white sm:w-fit sm:px-6`}
                >
                    {children}
                </button>
            )
        default:
            return <button {...props}>{children}</button>
    }
}

export default CustomButton
