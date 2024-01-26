import React from 'react'
import { InvoiceItem } from '../../Utils/Types'
import DeleteIcon from '../../Components/Shared/DeleteIcon'
import { cn } from '../../Utils/functions'

type RowProps = {
    index: number
    item: InvoiceItem
    DeleteItem: (val: number) => void
    handleChangeItem: (
        index: number,
        property: keyof InvoiceItem,
        value: string
    ) => void
    handleBlur: (index: number, property: keyof InvoiceItem) => void
    displayError: boolean
}

const Row = ({
    index,
    item,
    DeleteItem,
    handleChangeItem,
    handleBlur,
    displayError,
}: RowProps) => {
    return (
        <div className="text-body-variant relative flex w-full flex-wrap gap-x-4 gap-y-6 sm:h-12">
            <div className="flex flex-[1_1_100%] flex-col sm:flex-[0_0_214px]">
                <label
                    htmlFor={`item${index}Name`}
                    className={cn('mb-2 flex sm:hidden', {
                        'text-secondary': displayError && item.name === '',
                    })}
                >
                    Item Name
                </label>
                <input
                    onBlur={() => handleBlur(index, 'name')}
                    onChange={(e) =>
                        handleChangeItem(index, 'name', e.target.value)
                    }
                    value={item.name}
                    type="text"
                    name={`item${index}Name`}
                    id={`item${index}Name`}
                    className={cn(
                        'rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border pl-5 outline-none dark:text-white',
                        {
                            'border-secondary':
                                displayError && item.name === '',
                        }
                    )}
                />
                {displayError && item.name.trim() === '' ? (
                    <div className="text-error text-secondary absolute right-4 top-0 sm:hidden">
                        can't be empty
                    </div>
                ) : null}
            </div>
            <div className="flex w-12 flex-[0_1_48px] flex-col">
                <label
                    htmlFor={`item${index}Quantity`}
                    className={cn('mb-2 flex sm:hidden', {
                        'text-secondary': displayError && item.quantity <= 0,
                    })}
                >
                    Qty.
                </label>
                <input
                    onBlur={() => handleBlur(index, 'quantity')}
                    onChange={(e) =>
                        handleChangeItem(index, 'quantity', e.target.value)
                    }
                    value={item.quantity}
                    type="text"
                    name={`item${index}Quantity`}
                    id={`item${index}Quantity`}
                    className={cn(
                        'rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border pl-5 outline-none dark:text-white',
                        {
                            'border-secondary':
                                displayError && item.quantity <= 0,
                        }
                    )}
                />
            </div>
            <div className="w-25 flex flex-[0_1_100px] flex-col">
                <label
                    htmlFor={`item${index}Price`}
                    className={cn('mb-2 flex sm:hidden', {
                        'text-secondary': displayError && item.price <= 0,
                    })}
                >
                    Price
                </label>
                <input
                    onBlur={() => handleBlur(index, 'price')}
                    onChange={(e) =>
                        handleChangeItem(index, 'price', e.target.value)
                    }
                    value={item.price}
                    type="text"
                    name={`item${index}Price`}
                    id={`item${index}Price`}
                    className={cn(
                        'rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border pl-5 outline-none dark:text-white',
                        {
                            'border-secondary': displayError && item.price <= 0,
                        }
                    )}
                />
            </div>
            <div className="relative flex w-14 flex-[1_1_auto] flex-col justify-between">
                <p
                    className={cn('mb-2 flex sm:hidden', {
                        'text-secondary': displayError && item.total <= 0,
                    })}
                >
                    Total
                </p>
                <p className="flex h-12  w-fit items-center text-center">
                    {item.total}
                </p>
                {displayError && item.total === 0 ? (
                    <div className="text-error text-secondary absolute right-4 top-0 sm:hidden">
                        can't be null
                    </div>
                ) : null}
            </div>
            <DeleteIcon
                onClick={() => DeleteItem(index)}
                className="mt-4 h-fit self-center sm:mt-0"
            />
        </div>
    )
}

export default Row
