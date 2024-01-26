import React from 'react'
import CustomButton from '../../Shared/CustomButton'
import useModal from '../../../Hooks/useModal'
import useStore from '../../../Hooks/useStore'

type ButtonBlockProps = {
    invoiceId: string
    status: string
} & React.ComponentPropsWithoutRef<'div'>

const ButtonBlock = ({ invoiceId, status, ...props }: ButtonBlockProps) => {
    const { markAsPaid } = useStore()
    const { openModal } = useModal()
    const handleDelete = () => {
        openModal('Delete')
    }

    const handleEdit = () => {
        openModal('Edit')
    }
    const handlePaid = () => {
        markAsPaid(invoiceId)
    }

    return (
        <div {...props}>
            <CustomButton onClick={handleEdit} variant="Edit" />
            <CustomButton onClick={handleDelete} variant="Delete" />
            {status === 'pending' && (
                <CustomButton onClick={handlePaid} variant="Mark" />
            )}
        </div>
    )
}

export default ButtonBlock
