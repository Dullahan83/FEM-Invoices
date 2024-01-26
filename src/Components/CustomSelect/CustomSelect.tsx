// export default Select
import React, { useState, useRef, useEffect } from 'react'
import { SelectOption } from '../../Utils/Types'
import { FieldProps } from 'formik'
import { cn } from '../../Utils/functions'
import ArrowIcon from '../Shared/ArrowIcon'

interface CustomSelectProps extends FieldProps {
    options: SelectOption[]
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    field, // { name, value, onChange, onBlur }
    form, // { touched, errors }
    options,
    //   ...props
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)
    const selectedOption = options.find(
        (option) => option.value === field.value
    )

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.parentNode!.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [selectRef])

    const handleOptionClick = (option: SelectOption) => {
        form.setFieldValue(field.name, option.value)
        setIsOpen(false)
    }

    return (
        <div className=" relative z-10 flex w-60 flex-1 flex-col gap-y-2 sm:flex-initial">
            <label htmlFor="paymentTerms">Payment Terms</label>
            <div
                ref={selectRef}
                className="rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark relative flex h-12 w-full items-center border bg-white  dark:text-white"
            >
                <input
                    id="paymentTerms"
                    type="text"
                    readOnly
                    {...field}
                    value={selectedOption?.label}
                    className="dark:bg-elem-dark outline-primary hover:border-primary focus:border-primary h-full w-full rounded-lg px-5 hover:cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                />
                <ArrowIcon
                    className={cn('absolute right-5 top-1/2 -translate-y-1/2', {
                        'rotate-180': isOpen,
                    })}
                />
                {isOpen && (
                    <div className="shadow-menu dark:bg-elem-dark absolute left-0 top-full z-10 mt-2 w-full rounded-lg bg-white">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'border-border hover:text-primary w-full  px-5 py-4 hover:cursor-pointer',
                                    {
                                        'border-b ':
                                            index !== options.length - 1,
                                    }
                                )}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomSelect
