import React from 'react'
import Header from '../Components/Header/Header'
import { useParams } from 'react-router-dom'
import Modal from './Modal'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const modalRef = React.useRef<HTMLDialogElement>(null)
    const id = useParams().id
    const handleClose = () => {
        if (modalRef.current) {
            modalRef.current?.close()
        }
    }

    return (
        <div className="bg-light dark:bg-dark flex h-full min-h-screen w-full flex-col lg:flex-row">
            <Header />
            {children}
            <Modal
                invoiceId={id as string}
                onClose={handleClose}
                ref={modalRef}
            />
        </div>
    )
}

export default Layout
