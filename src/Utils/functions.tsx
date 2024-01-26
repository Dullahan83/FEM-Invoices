import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Invoice, InvoiceItem } from './Types'
import * as yup from 'yup'
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const getDatas = async () => {
    try {
        //   const response = await fetch("https://dullahan83.github.io/FEM-Kanban/data.json");
        const response = await fetch('/data.json')

        const datas = await response.json()
        if (!response.ok) {
            throw new Error('Failed to fetch datas')
        }
        return datas
    } catch (error) {
        console.log(error)
    }
}

export const getFormatedDate = (date: string, type?: string) => {
    if (type === 'short') {
        const newDate = new Date(date)
            .toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            .split('/')

        return newDate.reverse().join('-')
    } else
        return new Date(date)
            .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            })
            .replace(/ /g, ' ')
}

export const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(amount)
}

export const calculateTotal = (items: InvoiceItem[]) => {
    const arr = items.map((item) => item.total)
    const total = items.length ? arr.reduce((acc, curr) => acc + curr) : 0
    return total
}

export const generateUniqueId = (CurrentList: Invoice[]) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const getRandomLetter = () =>
        letters[Math.floor(Math.random() * letters.length)]
    const getRandomNumber = () => Math.floor(Math.random() * 10)

    const generatedId = `${getRandomLetter()}${getRandomLetter()}${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}`

    if (!CurrentList.filter((invoice) => invoice.id === generatedId)) {
        generateUniqueId(CurrentList)
    }
    return generatedId
}

export const validationSchéma = yup.object().shape({
    id: yup.string().matches(/[A-Z]{2}[0-9]{4}/),
    createdAt: yup.string().matches(/(\d{4})-(\d{2})-(\d{2})/),
    paymentDue: yup.string().matches(/(\d{4})-(\d{2})-(\d{2})/),
    description: yup.string().required("can't be empty"),
    paymentTerms: yup.number().min(1),
    clientName: yup.string().required("can't be empty"),
    clientEmail: yup.string().required("can't be empty"),
    senderAddress: yup.object().shape({
        street: yup.string().required("can't be empty"),
        city: yup.string().required("can't be empty"),
        postCode: yup.string().required("can't be empty"),
        country: yup.string().required("can't be empty"),
    }),
    clientAddress: yup.object().shape({
        street: yup.string().required("can't be empty"),
        city: yup.string().required("can't be empty"),
        postCode: yup.string().required("can't be empty"),
        country: yup.string().required("can't be empty"),
    }),
    items: yup.array().of(
        yup.object().shape({
            name: yup.string().required(),
            quantity: yup.number().min(1),
            price: yup.number().min(1),
            total: yup.number().min(1),
        })
    ),
    total: yup.number().min(1, 'there must be atleast 1 item'),
    status: yup.string().matches(/[draft]||[pending]||[paid]/),
})
