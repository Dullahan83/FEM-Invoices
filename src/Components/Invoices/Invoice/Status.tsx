import React from 'react'
import { cn } from '../../../Utils/functions'

type StatusType = {
    status: 'draft' | 'paid' | 'pending'
    invoice?: boolean
}

const Status = ({ status, invoice }: StatusType) => {
    return (
        <div
            className={cn(
                ' w-26 order-4 flex h-10 items-center justify-center rounded-md  sm:order-none',
                {
                    'bg-draft/5 dark:bg-border/5': status === 'draft',
                    'bg-paid/5': status === 'paid',
                    'bg-pending/5': status === 'pending',
                    ' translate-y-1/2 sm:translate-y-0': invoice,
                }
            )}
        >
            <span
                className={cn(' inline-block h-2 w-2 rounded-full ', {
                    'bg-draft  dark:bg-border': status === 'draft',
                    'bg-paid': status === 'paid',
                    'bg-pending': status === 'pending',
                })}
            ></span>
            <p
                className={cn(
                    'ml-2 text-[15px] capitalize leading-4 tracking-[-0.25px]',
                    {
                        'text-draft dark:text-border': status === 'draft',
                        'text-paid': status === 'paid',
                        'text-pending': status === 'pending',
                    }
                )}
            >
                {status}
            </p>
        </div>
    )
}

export default Status
