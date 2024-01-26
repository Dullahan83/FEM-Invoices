import React from 'react'
import useStore from '../../../Hooks/useStore'
import CustomButton from '../../Shared/CustomButton'
import Menu from './Menu'
import useModal from '../../../Hooks/useModal'
import { Status } from '../../../Utils/Types'

type InvoiceHeaderProps = {
    selected: string
    handleSelect: (val: Status | '') => void
}

const InvoiceHeader = ({ ...props }: InvoiceHeaderProps) => {
    const { data } = useStore()
    const { openModal } = useModal()

    return (
        <div className="flex h-fit w-full items-start justify-between">
            <div className="flex flex-col">
                <h1 className=" text-Heading-L text-important font-bold lg:mb-1.5 dark:text-white">
                    Invoices
                </h1>
                <p className=" text-body-variant text-paragraph dark:text-border">
                    There are {data.length} total invoices
                </p>
            </div>
            <div className="flex items-center">
                <Menu {...props} />
                <CustomButton
                    onClick={() => openModal('Create')}
                    variant="New Invoice"
                />
            </div>
        </div>
    )
}

export default InvoiceHeader
