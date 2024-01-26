import React from 'react'
import { cn } from '../../Utils/functions'
import ArrowIcon from '../Shared/ArrowIcon'

type CalendarProps = {
    currentMonth: number
    currentYear: number
    selectedDate: Date
    onSelectDate: (name: string, date: Date) => void
    changeMonth: (offset: number) => void
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Calendar = ({
    currentMonth,
    currentYear,
    selectedDate,
    onSelectDate,
    changeMonth,
    setIsOpen,
}: CalendarProps) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const [hoveredDay, setHoveredDay] = React.useState<number | null>()
    const [isHovering, setIsHovering] = React.useState(false)
    const calendarRef = React.useRef<HTMLDivElement>(null)
    const getDaysInMonth = (month: number, year: number) => {
        const date = new Date(year, month, 1)
        const days = []
        while (date.getMonth() === month) {
            days.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }
        return days
    }

    const getDaysForCalendar = (days: Date[]) => {
        const totalDays = [...days] // Clone the days array

        // Ajoutez les jours du mois suivant si nécessaire pour compléter la dernière semaine
        const lastDay = totalDays[totalDays.length - 1]
        const nextMonth = new Date(
            lastDay.getFullYear(),
            lastDay.getMonth() + 1,
            1
        )
        while (totalDays.length % 7 !== 0) {
            totalDays.push(new Date(nextMonth))
            nextMonth.setDate(nextMonth.getDate() + 1)
        }

        return totalDays
    }

    const handleSelectDate = (dir: string, day: Date) => {
        onSelectDate(dir, day)
    }

    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const daysForCalendar = getDaysForCalendar(daysInMonth)

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.parentNode!.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [calendarRef])
    return (
        <div
            ref={calendarRef}
            className="dark:bg-elem-dark shadow-menu absolute left-0 top-full z-10 mt-2 w-full rounded-lg bg-white px-5 pb-8 pt-6"
        >
            <div className="text-Heading-S-variant mb-8 flex justify-between">
                <button type="button" onClick={() => changeMonth(-1)}>
                    <ArrowIcon className="rotate-90" />
                </button>
                <span>
                    {months[currentMonth].slice(0, 3)} {currentYear}{' '}
                </span>
                <button type="button" onClick={() => changeMonth(1)}>
                    <ArrowIcon className="-rotate-90" />
                </button>
            </div>
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="text-Heading-S-variant group grid grid-cols-7 gap-x-[15px] gap-y-4"
            >
                {daysForCalendar.map((day, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => setHoveredDay(day.getDate())}
                        onMouseLeave={() => setHoveredDay(null)}
                        onClick={() =>
                            day.getMonth() === currentMonth &&
                            handleSelectDate('createdAt', day)
                        }
                        className={cn(
                            '  hover:text-primary w-4 text-center hover:cursor-pointer',
                            {
                                'text-primary ':
                                    selectedDate.getDate() === index + 1 &&
                                    !hoveredDay &&
                                    !isHovering &&
                                    day.getMonth() === selectedDate.getMonth(),
                                ' opacity-25': day.getMonth() !== currentMonth,
                            }
                        )}
                    >
                        {day.getDate()}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar
