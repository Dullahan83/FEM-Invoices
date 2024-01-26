import React from 'react'
import useModal from '../Hooks/useModal'
import { cn } from '../Utils/functions'
import CreateInvoice from '../Modals/CreateInvoice'
import EditInvoice from '../Modals/EditInvoice'
import DeleteInvoice from '../Modals/DeleteInvoice'

interface ModalProps extends React.ComponentPropsWithoutRef<'dialog'> {
    onClose: () => void
    invoiceId: string
}

const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
    ({ onClose, invoiceId }, ref) => {
        const modalBody = React.useRef<HTMLDivElement>(null)
        const { modalType } = useModal()

        const handleClick = (
            e: React.MouseEvent<HTMLDialogElement, MouseEvent>
        ) => {
            const target = e.target as Node
            if (modalBody.current && !modalBody.current.contains(target)) {
                onClose()
            }
        }

        const returnModalBody = () => {
            switch (modalType) {
                case 'Create':
                    return <CreateInvoice ref={modalBody} />
                case 'Edit':
                    return <EditInvoice ref={modalBody} />
                case 'Delete':
                    return (
                        <DeleteInvoice invoiceId={invoiceId} ref={modalBody} />
                    )
                default:
                    return null
            }
        }

        return (
            <dialog
                ref={ref}
                onClick={handleClick}
                key={modalType}
                id="modale"
                className={cn(
                    'fixed bottom-0 left-0  top-[72px] z-10 hidden h-[calc(100vh-72px)] w-full  min-w-full border-0 bg-black/50  outline-none backdrop:left-0 backdrop:w-screen open:flex sm:top-20 sm:h-[calc(100vh-80px)] lg:top-0 lg:h-screen lg:min-h-screen backdrop:lg:top-0',
                    {
                        '     lg:left-[103px]  lg:w-[calc(100vw-103px)] backdrop:lg:left-[103px]  lg:backdrop:w-[calc(100vw-103px)]':
                            modalType !== 'Delete',
                    }
                )}
            >
                {returnModalBody()}
            </dialog>
        )
    }
)
Modal.displayName = 'Modal'
export default Modal
