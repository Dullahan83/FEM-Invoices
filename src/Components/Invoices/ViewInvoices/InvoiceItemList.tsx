import React from 'react'
import { InvoiceItem } from '../../../Utils/Types'
import { calculateTotal, cn, formatAmount } from '../../../Utils/functions'

type InvoiceItemListProps = {
    itemList: InvoiceItem[]
}

const InvoiceItemList = ({ itemList }: InvoiceItemListProps) => {
    return (
        <div className="w-full">
            <div className=" bg-elem-sub-light dark:bg-elem-sub-dark sm:mt-6.5 lg::mt-6 hidden w-full flex-col gap-y-8  rounded-t-lg p-8 sm:flex sm:pb-[39px] sm:pt-[33px]">
                <div className="leading-4.5 grid w-full grid-cols-5">
                    <p className=" col-span-2">Item Name</p>
                    <p className=" col-span-1 text-end">QTY.</p>
                    <p className=" col-span-1 pr-[2px] text-end">Price</p>
                    <p className=" col-span-1 pr-[2px] text-end">Total</p>
                </div>
                {itemList.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className=" text-Heading-S-variant text-important grid w-full grid-cols-5 dark:text-white"
                        >
                            {Object.entries(item).map((cell, i) => {
                                return (
                                    <p
                                        key={'cell' + i}
                                        className={cn('col-span-2', {
                                            'col-span-1 text-end':
                                                cell[0] != 'name',
                                            'text-labels dark:text-border':
                                                cell[0] === 'quantity' ||
                                                cell[0] === 'price',
                                            'pr-3': cell[0] === 'quantity',
                                            'first-letter:mr-1':
                                                cell[0] === 'price' ||
                                                cell[0] === 'total',
                                        })}
                                    >
                                        {cell[0] === 'price' ||
                                        cell[0] === 'total'
                                            ? formatAmount(cell[1] as number)
                                            : cell[1]}
                                    </p>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="bg-elem-sub-light dark:bg-elem-sub-dark flex w-full flex-col items-center gap-y-6 rounded-t-lg p-6 sm:hidden">
                {itemList.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="text-Heading-S-variant flex w-full flex-wrap items-center"
                        >
                            <div className="flex-[1_1_50%]">
                                <p className="text-important dark:text-white">
                                    {item.name}
                                </p>
                                <p className="mt-2">
                                    {`${item.quantity} x `}
                                    <span className="inline-block first-letter:mr-1">
                                        {formatAmount(item.price)}
                                    </span>
                                </p>
                            </div>
                            <p className="text-Heading-S-variant mt-1 first-letter:mr-1">
                                {formatAmount(item.total)}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className="bg-draft dark:bg-important flex h-20 w-full items-center justify-between rounded-b-lg px-6">
                <p className="hidden text-white sm:flex">Amount Due</p>
                <p className="flex text-white sm:hidden">Grand total</p>
                <p className=" text-Heading-M leading-8 text-white first-letter:mr-1">
                    {formatAmount(calculateTotal(itemList))}
                </p>
            </div>
        </div>
    )
}

export default InvoiceItemList
