import React from 'react'
import { Invoice } from '../../../Utils/Types'
import Status from '../Invoice/Status'
import ButtonBlock from './ButtonBlock'

const ControlBar = ({ Invoice }: { Invoice: Invoice }) => {
    return (
        <div className="dark:bg-elem-dark shadow-generic flex w-full items-center justify-between rounded-lg bg-white px-6 py-6 sm:py-5 md:px-8">
            <div className="flex w-full items-center justify-between sm:w-fit md:justify-normal">
                <p className="text-name mr-5">Status</p>
                <Status status={Invoice.status} />
            </div>
            <ButtonBlock
                status={Invoice.status}
                className="hidden gap-x-2 sm:flex"
                invoiceId={Invoice.id}
            />
        </div>
    )
}

export default ControlBar
