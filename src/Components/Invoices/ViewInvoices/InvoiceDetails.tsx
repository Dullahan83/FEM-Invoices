import React from 'react'
import { Invoice } from '../../../Utils/Types'
import FieldDetails from './FieldDetails'
import { getFormatedDate } from '../../../Utils/functions'
import InvoiceItemList from './InvoiceItemList'

const InvoiceDetails = ({ Invoice }: { Invoice: Invoice }) => {
    return (
        <section className="dark:bg-elem-dark  text-labels text-body-variant flex w-full flex-wrap gap-y-8 rounded-lg bg-white p-6 sm:gap-y-[21px] sm:p-8 lg:p-12 dark:text-white">
            <div className=" flex flex-[1_1_100%] flex-col gap-y-1 sm:flex-[1_1_50%] sm:gap-y-2">
                <p className="text-important text-Heading-S-variant dark:text-white">
                    <span className="text-paragraph">#</span>
                    {Invoice.id}
                </p>
                <p className="">{Invoice.description}</p>
            </div>
            <div className=" flex-[1_1_100%]  sm:flex-[1_1_50%]">
                {Object.entries(Invoice.senderAddress).map((field, index) => {
                    return (
                        <p
                            key={index}
                            className="text-labels dark:text-border leading-4.5 sm:text-end"
                        >
                            {field[1]}
                        </p>
                    )
                })}
            </div>
            <div className="flex-[1_1_50%] space-y-8 sm:flex-[1_1_33%]">
                <FieldDetails title="Invoice Date" className="">
                    <p className="text-important text-Heading-S mt-[13px] leading-5 dark:text-white">
                        {getFormatedDate(Invoice.createdAt)}
                    </p>
                </FieldDetails>
                <FieldDetails title="Payment Due">
                    <p className="text-important text-Heading-S mt-[13px] leading-5 dark:text-white">
                        {getFormatedDate(Invoice.paymentDue)}
                    </p>
                </FieldDetails>
            </div>
            <FieldDetails
                title="Bill To"
                className="flex-[1_1_50%] sm:flex-[1_1_33%]"
            >
                <p className="text-important text-Heading-S mb-2 mt-[13px] leading-5 dark:text-white">
                    {Invoice.clientName}
                </p>
                {Object.entries(Invoice.clientAddress).map((field, index) => {
                    return (
                        <p
                            key={index}
                            className="text-labels leading-4.5 dark:text-border mb-0.5 last-of-type:mb-0"
                        >
                            {field[1]}
                        </p>
                    )
                })}
            </FieldDetails>

            <FieldDetails title="Sent To">
                <p className="text-important text-Heading-S mt-[13px] leading-5 dark:text-white">
                    {Invoice.clientEmail}
                </p>
            </FieldDetails>
            <InvoiceItemList itemList={Invoice.items} />
        </section>
    )
}

export default InvoiceDetails
