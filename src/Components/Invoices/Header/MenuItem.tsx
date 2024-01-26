import React from 'react'
import { Status } from '../../../Utils/Types'

type MenuItemProps = {
    label: string
    name: string
    id: Status
    handleSelect: (val: Status) => void
    selected: string
} & React.ComponentPropsWithoutRef<'input'>

const MenuItem = ({
    label,
    name,
    id,
    selected,
    handleSelect,
    ...props
}: MenuItemProps) => {
    return (
        <span className="MenuItem text-important flex w-fit flex-row-reverse gap-x-[13px] hover:cursor-pointer dark:text-white">
            <label htmlFor={id} className=" text-Heading-S-variant self-end">
                {label}
            </label>
            <input
                checked={selected === id}
                onChange={() => handleSelect(id)}
                type="checkbox"
                name={name}
                id={id}
                {...props}
            />
        </span>
    )
}

export default MenuItem
