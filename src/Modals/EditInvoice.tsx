import React from 'react'
import { useParams } from 'react-router-dom'
import ModalForm from './Form'
import useStore from '../Hooks/useStore'
const EditInvoice = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithRef<'div'>
>(({ ...props }, ref) => {
    const id = useParams().id
    const invoice = useStore((store) => {
        const result = store.data.filter((item) => item.id === id)
        return result[0]
    })

    return (
        <div
            {...props}
            ref={ref}
            className="dark:bg-dark sm:rounded-r-2.5xl text-important sm:w-154 relative flex h-full w-full flex-col bg-white   dark:text-white"
        >
            <ModalForm invoice={invoice} />
        </div>
    )
})

EditInvoice.displayName = 'Edit Invoice Modale Body'

export default EditInvoice
