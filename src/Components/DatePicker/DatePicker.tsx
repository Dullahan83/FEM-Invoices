import React, { useState } from 'react'
import Calendar from './Calendar'
import { cn } from '../../Utils/functions'
import { FieldProps } from 'formik'
import CalendarIcon from '../Shared/CalendarIcon'
import useModal from '../../Hooks/useModal'

const Datepicker = ({
    field, // { name, value, onChange, onBlur }
    form, // { touched, errors, setFieldValue }
    ...props
}: FieldProps) => {
    const { modalType } = useModal()
    // const [selectedDate, setSelectedDate] = useState(new Date())
    const [currentMonth, setCurrentMonth] = useState(
        modalType === 'Create'
            ? new Date().getMonth()
            : new Date(field.value).getMonth()
    )
    const [currentYear, setCurrentYear] = useState(
        modalType === 'Create'
            ? new Date().getMonth()
            : new Date(field.value).getFullYear()
    )
    const [isCalendarVisible, setCalendarVisible] = useState(false)
    const calendarRef = React.useRef<HTMLDivElement>(null)
    const formatDate = (date: Date) => {
        return date
            .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            })
            .replace(/ /g, ' ')
    }

    const handleSelectDate = (name: string, date: Date) => {
        form.setFieldValue(name, date)
        setCalendarVisible(false)
    }

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentYear, currentMonth + offset, 1)
        setCurrentMonth(newDate.getMonth())
        setCurrentYear(newDate.getFullYear())
    }

    return (
        <div
            ref={calendarRef}
            className={cn('relative z-20 flex w-full flex-col sm:w-60', {
                ' opacity-50': !isCalendarVisible,
            })}
        >
            <label htmlFor="paymentDue" className="mb-2">
                Invoice Date
            </label>
            <input
                {...field}
                {...props}
                type="text"
                value={formatDate(field.value)}
                readOnly
                onClick={() => setCalendarVisible(!isCalendarVisible)}
                className="rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark outline-primary hover:border-primary focus:border-primary z-0 h-12 border px-5 hover:cursor-pointer dark:text-white"
                id="paymentDue"
                name="paymentDue"
            />
            <CalendarIcon className={'absolute bottom-4 right-5 z-0'} />
            {isCalendarVisible && (
                <Calendar
                    selectedDate={field.value}
                    setIsOpen={setCalendarVisible}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    onSelectDate={handleSelectDate}
                    changeMonth={changeMonth}
                />
            )}
        </div>
    )
}

export default Datepicker
