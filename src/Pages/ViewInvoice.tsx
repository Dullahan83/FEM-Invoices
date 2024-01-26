import React from 'react'
import Layout from '../Layout/Layout'
import MainContainer from '../Components/MainContainer'
import BackLink from '../Components/Invoices/ViewInvoices/BackLink'
import ControlBar from '../Components/Invoices/ViewInvoices/ControlBar'
import { useParams, useNavigate } from 'react-router-dom'
import useStore from '../Hooks/useStore'
import InvoiceDetails from '../Components/Invoices/ViewInvoices/InvoiceDetails'
import ButtonBlock from '../Components/Invoices/ViewInvoices/ButtonBlock'

const ViewInvoice = () => {
    const id = useParams().id
    const navigate = useNavigate()
    const invoice = useStore((store) => {
        const filter = store.data.filter((invoice) => invoice.id === id)
        return filter[0]
    })

    React.useEffect(() => {
        if (!invoice) {
            navigate('/', { replace: true })
        }
    }, [])

    if (!invoice) return null
    return (
        <Layout>
            <MainContainer
                view
                className="py-[104px] md:py-[61px] md:pt-[129px] lg:py-16 lg:pb-12"
            >
                <BackLink />
                <ControlBar Invoice={invoice} />
                <InvoiceDetails Invoice={invoice} />
            </MainContainer>
            <ButtonBlock
                status={invoice.status}
                className="h-22 dark:bg-elem-dark flex w-full items-center justify-between gap-x-2 bg-white px-6 sm:hidden"
                invoiceId={invoice.id}
            />
        </Layout>
    )
}

export default ViewInvoice
