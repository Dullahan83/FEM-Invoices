import React from 'react'
import Layout from '../Layout/Layout'
import InvoiceHeader from '../Components/Invoices/Header/InvoiceHeader'
import MainContainer from '../Components/MainContainer'
import Invoice from '../Components/Invoices/Invoice/Invoice'
import EmptyData from '../Components/Invoices/EmptyData'
import { useNavigate } from 'react-router-dom'
import useFilter from '../Hooks/useFilter'
import { Status } from '../Utils/Types'

const Invoices = () => {
    const { filterDatas, filteredDatas } = useFilter()
    const navigate = useNavigate()

    const [selected, setSelected] = React.useState<Status | ''>('')

    const handleSelect = (value: Status | '') => {
        if (value === selected) {
            setSelected('')
        } else setSelected(value)
    }

    const handleNavigate = (id: string) => {
        navigate(`/view/${id}`)
    }

    React.useEffect(() => {
        filterDatas(selected)
    }, [selected])
    return (
        <Layout>
            <MainContainer className=" lg:py-19.2 py-[104px] md:py-[61px] md:pt-[141px]">
                <InvoiceHeader
                    selected={selected}
                    handleSelect={handleSelect}
                />
                <div className="flex flex-1  flex-col gap-y-4 ">
                    {filteredDatas.length ? (
                        filteredDatas?.map((invoice, index) => {
                            return (
                                <Invoice
                                    onClick={() => handleNavigate(invoice.id)}
                                    invoice={invoice}
                                    key={index}
                                />
                            )
                        })
                    ) : (
                        <EmptyData />
                    )}
                </div>
            </MainContainer>
        </Layout>
    )
}

export default Invoices
