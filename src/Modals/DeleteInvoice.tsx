import React from 'react'
import CustomButton from '../Components/Shared/CustomButton'
import { useNavigate } from 'react-router-dom'
import useModal from '../Hooks/useModal'
import useStore from '../Hooks/useStore'

type DeleteInvoiceProps = {
    invoiceId: string
} & React.ComponentPropsWithRef<'div'>

const DeleteInvoice = React.forwardRef<HTMLDivElement, DeleteInvoiceProps>(
    ({ invoiceId, ...props }, ref) => {
        const navigate = useNavigate()
        const { closeModal } = useModal()
        const { deleteInvoice } = useStore()

        const handleDeletion = () => {
            deleteInvoice(invoiceId)
            navigate('/')
            closeModal()
        }

        return (
            <div
                {...props}
                ref={ref}
                className=" w-120  bg-light dark:bg-elem-dark sm:rounded-2.5xl mx-auto flex flex-col self-center p-12 dark:text-white"
            >
                <h1 className=" text-Heading-M text-important mt-[3px] leading-8 dark:text-white">
                    Confirm Deletion
                </h1>
                <p className=" text-paragraph dark:text-border text-body mb-3.5 mt-3 leading-[22px]">
                    Are you sure you want to delete invoice #{invoiceId}? This
                    action cannot be undone.
                </p>
                <div className="flex w-fit gap-x-2 self-end">
                    <CustomButton onClick={closeModal} variant="Cancel" />
                    <CustomButton variant="Delete" onClick={handleDeletion} />
                </div>
            </div>
        )
    }
)

DeleteInvoice.displayName = 'Delete Invoice Modale body'

export default DeleteInvoice
