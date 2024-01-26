import React from 'react'
import ArrowIcon from '../../Shared/ArrowIcon'
import { cn } from '../../../Utils/functions'
import MenuItem from './MenuItem'
import { Status } from '../../../Utils/Types'

type MenuProps = {
    selected: string
    handleSelect: (val: Status | '') => void
}

const Menu = ({ selected, handleSelect }: MenuProps) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const menuRef = React.useRef<HTMLDivElement>(null)
    const handleOpenMenu = () => {
        setIsOpen((prev) => !prev)
    }
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.parentNode!.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuRef])

    return (
        <div className="mr-4.5 relative z-10 md:mr-10">
            <button
                onClick={handleOpenMenu}
                className="text-important text-Heading-S-variant relative  flex items-center  whitespace-pre dark:text-white"
            >
                Filter <span className="hidden md:flex">by status</span>
                <ArrowIcon className=" ml-3.5" />
            </button>
            <div
                ref={menuRef}
                className={cn(
                    'mt-5.5 dark:bg-elem-sub-dark shadow-menu-dark gap-y-3.8 absolute left-1/2 top-full flex h-32 w-48 -translate-x-1/2 flex-col rounded-lg bg-white p-6',
                    {
                        hidden: !isOpen,
                    }
                )}
            >
                <MenuItem
                    label="Draft"
                    name="radio-group"
                    id="draft"
                    value={'draft'}
                    handleSelect={handleSelect}
                    selected={selected}
                />
                <MenuItem
                    label="Pending"
                    name="radio-group"
                    id="pending"
                    value={'pending'}
                    handleSelect={handleSelect}
                    selected={selected}
                />
                <MenuItem
                    label="Paid"
                    name="radio-group"
                    id="paid"
                    value={'paid'}
                    handleSelect={handleSelect}
                    selected={selected}
                />
            </div>
        </div>
    )
}

export default Menu
