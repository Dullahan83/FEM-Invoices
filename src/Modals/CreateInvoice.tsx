import React from 'react'
import ModalForm from './Form'

const CreateInvoice = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithRef<'div'>
>(({ ...props }, ref) => {
    return (
        <div
            {...props}
            ref={ref}
            className="dark:bg-dark sm:rounded-r-2.5xl text-important sm:w-154 relative flex h-full w-full flex-col bg-white  dark:text-white"
        >
            <ModalForm />
        </div>
    )
})
CreateInvoice.displayName = 'Create modal body'
export default CreateInvoice
