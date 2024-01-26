import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Invoice } from '../Utils/Types'
import { getDatas } from '../Utils/functions'

interface StoreState {
    data: Invoice[]
}

type Actions = {
    createInvoice: (invoice: Invoice) => void
    deleteInvoice: (id: string) => void
    updateInvoice: (invoice: Invoice) => void
    markAsPaid: (id: string) => void
}

const useStore = create<StoreState & Actions>()(
    persist(
        immer((set) => ({
            data: [],
            createInvoice: (invoice) =>
                set((state) => {
                    state.data.push(invoice)
                }),
            deleteInvoice: (id) =>
                set((state) => {
                    state.data = state.data.filter((item) => item.id !== id)
                }),
            updateInvoice: (invoice) =>
                set((state) => {
                    const indexInvoice = state.data.findIndex(
                        (item) => item.id === invoice.id
                    )
                    if (indexInvoice === -1) {
                        return new Error('Invoice not found')
                    }
                    state.data[indexInvoice] = invoice
                }),
            markAsPaid: (id) =>
                set((state) => {
                    const indexInvoice = state.data.findIndex(
                        (item) => item.id === id
                    )
                    if (indexInvoice === -1) {
                        return new Error('Invoice not found')
                    }
                    state.data[indexInvoice].status = 'paid'
                }),
        })),
        {
            name: 'invoiceApp', // nom unique pour le stockage local
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                data: state.data,
            }),
        }
    )
)

const initializeData = async () => {
    const storedDataJson = sessionStorage.getItem('invoiceApp')
    let storedData
    if (storedDataJson) {
        storedData = JSON.parse(storedDataJson)
    }
    if (!storedData.state.data.length) {
        const datas = (await getDatas()) as Invoice[]
        useStore.setState({ data: datas })
    }
}

initializeData()

export default useStore
