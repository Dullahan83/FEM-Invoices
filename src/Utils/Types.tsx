export type Invoice = {
    id: string
    createdAt: string
    paymentDue: string
    description: string
    paymentTerms: number
    clientName: string
    clientEmail: string
    senderAddress: {
        street: string
        city: string
        postCode: string
        country: string
    }
    clientAddress: {
        street: string
        city: string
        postCode: string
        country: string
    }
    items: InvoiceItem[]
    total: number
    status: Status
}

export type FormikInvoice = {
    senderAddress: {
        street: string
        city: string
        postCode: string
        country: string
    }
    clientAddress: {
        street: string
        city: string
        postCode: string
        country: string
    }
    clientName: string
    clientEmail: string
    createdAt: string
    paymentDue: string
    description: string
    paymentTerms: string
    items: string
    total: string
    status: string
}

export type Address = {
    street: string
    city: string
    postCode: string
    country: string
}

export type Status = 'draft' | 'paid' | 'pending'

export type InvoiceItem = {
    name: string
    quantity: number
    price: number
    total: number
}

export type SelectOption = {
    label: string
    value: number
}
