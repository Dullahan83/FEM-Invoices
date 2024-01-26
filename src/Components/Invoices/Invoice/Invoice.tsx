import React from 'react'
import { Invoice } from '../../../Utils/Types'
import Status from './Status'
import ArrowIcon from '../../Shared/ArrowIcon'

type InvoiceProps = {
    invoice: Invoice
} & React.ComponentPropsWithoutRef<'div'>

const InvoiceElement = ({ invoice, ...props }: InvoiceProps) => {
    const formatedDueDate = new Date(invoice.paymentDue)
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        .replace(/ /g, ' ')
    return (
        <div
            className="dark:bg-elem-dark pb-5.5 shadow-generic relative flex w-full flex-wrap items-center rounded-lg bg-white px-6 py-6 sm:py-4 sm:pl-8"
            {...props}
        >
            <p className=" text-important text-Heading-S-variant flex-[1_1_50%] sm:mr-6 sm:min-w-16 sm:flex-none dark:text-white  ">
                <span className="text-labels">#</span>
                {invoice.id}
            </p>
            <p className="text-paragraph text-body-variant sm::min-w-24 order-3 flex-[1_1_50%] whitespace-pre sm:order-none sm:mr-[47px] sm:flex-none  ">
                <span className="text-labels">Due </span>
                {formatedDueDate}
            </p>
            <p className="text-name flex-[1_1_50%] text-end sm:flex-1 sm:text-start dark:text-white">
                {invoice.clientName}
            </p>
            <p className=" text-Heading-S text-important order-5 flex-[1_1_50%] first-letter:mr-1  sm:order-none sm:mr-10 sm:flex-none dark:text-white ">
                {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                }).format(invoice.total)}
            </p>
            <Status status={invoice.status} invoice />
            <ArrowIcon className="ml-5 hidden -rotate-90 md:flex " />
        </div>
    )
}

export default InvoiceElement
