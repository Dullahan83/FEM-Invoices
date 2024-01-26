import React from 'react'
import { Formik, Form, Field } from 'formik'
import Datepicker from '../Components/DatePicker/DatePicker'
import CustomSelect from '../Components/CustomSelect/CustomSelect'
import List from './ItemList/List'
import {
    Address,
    FormikInvoice,
    Invoice,
    InvoiceItem,
    Status,
} from '../Utils/Types'
import useModal from '../Hooks/useModal'
import FormEnd from './FormEnd'
import {
    calculateTotal,
    cn,
    generateUniqueId,
    getFormatedDate,
    validationSchéma,
} from '../Utils/functions'
import useStore from '../Hooks/useStore'
import BackLink from '../Components/Invoices/ViewInvoices/BackLink'
import * as Yup from 'yup'
import { yupToFormErrors } from 'formik'

type MyFormValues = {
    senderAddress: {
        street: string | undefined
        city: string | undefined
        postCode: string | undefined
        country: string | undefined
    }
    clientAddress: {
        street: string | undefined
        city: string | undefined
        postCode: string | undefined
        country: string | undefined
    }
    createdAt: Date
    paymentDue: string | undefined
    description: string | undefined
    paymentTerms: number | undefined
    clientName: string | undefined
    clientEmail: string | undefined
    items: InvoiceItem[] | undefined
    total: number | undefined
    status: Status | undefined
}

const options = [
    { label: 'Net 1 Day', value: 1 },
    { label: 'Net 7 Days', value: 7 },
    { label: 'Net 14 Days', value: 14 },
    { label: 'Net 30 Days', value: 30 },
]

const initialItem = {
    name: '',
    quantity: 0,
    price: 0,
    total: 0,
}

const EditTitle = ({ id }: { id: string }) => {
    return (
        <>
            Edit <span className="text-paragraph">#</span>
            {id}
        </>
    )
}

const ModalForm = ({ invoice }: { invoice?: Invoice }) => {
    const { data, updateInvoice, createInvoice } = useStore()
    const { modalType, closeModal } = useModal()
    const [displayError, setDisplayError] = React.useState(false)
    const [items, setItems] = React.useState<InvoiceItem[]>(
        invoice ? invoice.items : []
    )
    const [errors, setErrors] = React.useState<Partial<FormikInvoice>>()

    const [isBottom, setIsBottom] = React.useState(false)
    const invoiceId =
        modalType === 'Create' ? generateUniqueId(data) : invoice?.id
    const initialValues = {
        senderAddress: {
            street: modalType === 'Create' ? '' : invoice?.senderAddress.street,
            city: modalType === 'Create' ? '' : invoice?.senderAddress.city,
            postCode:
                modalType === 'Create' ? '' : invoice?.senderAddress.postCode,
            country:
                modalType === 'Create' ? '' : invoice?.senderAddress.country,
        },
        clientAddress: {
            street: modalType === 'Create' ? '' : invoice?.clientAddress.street,
            city: modalType === 'Create' ? '' : invoice?.clientAddress.city,
            postCode:
                modalType === 'Create' ? '' : invoice?.clientAddress.postCode,
            country:
                modalType === 'Create' ? '' : invoice?.clientAddress.country,
        },
        clientName: modalType === 'Create' ? '' : invoice?.clientName,
        clientEmail: modalType === 'Create' ? '' : invoice?.clientEmail,
        createdAt:
            modalType === 'Create'
                ? new Date()
                : new Date(invoice?.createdAt as string),
        paymentDue: '',
        description: modalType === 'Create' ? '' : invoice?.description,
        paymentTerms: modalType === 'Create' ? 1 : invoice?.paymentTerms,
        items: modalType === 'Create' ? items : invoice?.items,
        total: modalType === 'Create' ? 0 : invoice?.total,
        status: modalType === 'Create' ? 'pending' : invoice?.status,
    }

    const AddItem = () => {
        setItems((prev) => [...prev, initialItem])
    }

    const handleDeleteitem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index))
    }
    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const target = e.currentTarget
        const { scrollHeight, scrollTop, clientHeight } = target
        const distToBottom = scrollHeight - (scrollTop + clientHeight)
        if (distToBottom <= 80) setIsBottom(true)
        else setIsBottom(false)
    }
    const handleBackAction = () => {
        setErrors({})
        setDisplayError(false)
        closeModal()
    }

    const handleChangeItem = (
        index: number,
        property: keyof InvoiceItem,
        value: string
    ) => {
        setItems((prev) => {
            const newItems = [...prev]
            newItems[index] = {
                ...newItems[index],
                [property]: value,
            }
            return newItems
        })
    }

    const handleBlur = (index: number, property: keyof InvoiceItem) => {
        if (items[index] != initialItem) {
            setItems((prev) => {
                const newItems = [...prev]
                let value = newItems[index][property]

                if (property === 'price' || property === 'quantity') {
                    value = value.toString().replace(/,/g, '.')
                    const numericalValue = parseFloat(value)
                    newItems[index][property] = isNaN(numericalValue)
                        ? 0
                        : numericalValue

                    if (property === 'price' || property === 'quantity') {
                        newItems[index].total =
                            newItems[index].price * newItems[index].quantity
                    }
                }

                return newItems
            })
        }
    }
    const returnPaymentDueDate = (date: Date, days: number) => {
        const dateObject = new Date(date)
        const newDate = dateObject.setDate(dateObject.getDate() + days)
        return getFormatedDate(new Date(newDate).toString(), 'short')
    }

    const validateForm = async (values: MyFormValues) => {
        const Invoice = {
            ...values,
            id: invoiceId,
            createdAt:
                modalType === 'Create'
                    ? getFormatedDate(new Date().toDateString(), 'short')
                    : getFormatedDate(values.createdAt.toString(), 'short'),
            paymentDue: returnPaymentDueDate(
                values.createdAt,
                values.paymentTerms as number
            ),
            items: items,
            total: calculateTotal(items),
            status:
                modalType === 'Edit' && values.status === 'draft'
                    ? 'pending'
                    : 'pending',
        }

        try {
            await validationSchéma.validate(Invoice, { abortEarly: false })
            modalType === 'Edit'
                ? updateInvoice(Invoice as Invoice)
                : createInvoice(Invoice as Invoice)
            setDisplayError(false)
            setErrors({})
            closeModal()
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const formikErrors = yupToFormErrors(err)
                setErrors(formikErrors) // Définir les erreurs
            }
            setDisplayError(true)
            console.log(err)
        }
    }

    const handleValidtionBlur = (
        e: React.FocusEvent<HTMLInputElement>,
        field: string
    ) => {
        const fieldParts = field.split('.')
        const firstKey = fieldParts[0]
        if (e.target.value.trim().length > 0) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                if (fieldParts.length === 2) {
                    const secondKey = fieldParts[1]
                    const addressPart = newErrors[
                        firstKey as keyof FormikInvoice
                    ] as Address
                    const newAddressPart = { ...addressPart }
                    delete newAddressPart[secondKey as keyof Address]
                    const newObject = {
                        ...newErrors,
                        [firstKey]: newAddressPart,
                    }
                    if (
                        Object.keys(newObject).length === 1 &&
                        !Object.keys(newAddressPart).length
                    )
                        delete newObject[firstKey as keyof FormikInvoice]
                    return newObject
                } else {
                    delete newErrors[firstKey as keyof FormikInvoice]
                    return newErrors
                }
            })
        }
    }

    React.useEffect(() => {
        const errorsLength = errors && Object.keys(errors).length
        if (errorsLength && errorsLength > 0) {
            setDisplayError(true)
        } else setDisplayError(false)
    }, [errors])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
                validateForm(values)
                resetForm(initialValues)
            }}
        >
            {() => (
                <Form className="flex h-full w-full flex-col">
                    <div className="sm:pb-46 h-full w-full flex-col flex-wrap px-2 pb-60 pl-6 pt-6 sm:pl-14 sm:pr-8 sm:pt-14">
                        <BackLink inModal onClick={handleBackAction} />
                        <h2 className=" text-Heading-M mb-5.5 leading-8">
                            {modalType === 'Create' ? (
                                'New Invoice'
                            ) : (
                                <EditTitle id={invoice?.id as string} />
                            )}
                        </h2>
                        <div
                            onScroll={handleScroll}
                            className="flex h-full w-full flex-wrap justify-between gap-x-4 gap-y-6 overflow-scroll pb-6 pr-2 sm:pr-6 "
                        >
                            {/* Sender Address */}
                            <h3 className="text-primary text-Heading-S-variant">
                                Bill From
                            </h3>
                            <div className="relative flex flex-[1_1_100%] flex-col gap-y-2">
                                <label
                                    className={cn({
                                        'text-secondary':
                                            errors?.senderAddress?.street,
                                    })}
                                    htmlFor="senderAddress.street"
                                >
                                    Street Address
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) =>
                                        handleValidtionBlur(
                                            e,
                                            'senderAddress.street'
                                        )
                                    }
                                    id="senderAddress.street"
                                    name="senderAddress.street"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark  text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.senderAddress?.street,
                                        }
                                    )}
                                />
                                {errors?.senderAddress?.street ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.senderAddress?.street}
                                    </div>
                                ) : null}
                            </div>

                            <div className="w-38 relative flex flex-1 flex-col gap-y-2 sm:flex-initial">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary':
                                            errors?.senderAddress?.city,
                                    })}
                                    htmlFor="senderAddress.city"
                                >
                                    City
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) =>
                                        handleValidtionBlur(
                                            e,
                                            'senderAddress.city'
                                        )
                                    }
                                    id="senderAddress.city"
                                    name="senderAddress.city"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.senderAddress?.city,
                                        }
                                    )}
                                />
                                {errors?.senderAddress?.city ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.senderAddress?.city}
                                    </div>
                                ) : null}
                            </div>

                            <div className="w-38 relative flex flex-1 flex-col gap-y-2 sm:flex-initial">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary':
                                            errors?.senderAddress?.postCode,
                                    })}
                                    htmlFor="senderAddress.postCode"
                                >
                                    Post Code
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) =>
                                        handleValidtionBlur(
                                            e,
                                            'senderAddress.postCode'
                                        )
                                    }
                                    id="senderAddress.postCode"
                                    name="senderAddress.postCode"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.senderAddress?.postCode,
                                        }
                                    )}
                                />
                                {errors?.senderAddress?.postCode ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.senderAddress?.postCode}
                                    </div>
                                ) : null}
                            </div>

                            <div className="sm:w-38 relative flex flex-1 flex-col gap-y-2  sm:flex-initial">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary':
                                            errors?.senderAddress?.country,
                                    })}
                                    htmlFor="senderAddress.country"
                                >
                                    Country
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) =>
                                        handleValidtionBlur(
                                            e,
                                            'senderAddress.country'
                                        )
                                    }
                                    id="senderAddress.country"
                                    name="senderAddress.country"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.senderAddress?.country,
                                        }
                                    )}
                                />
                                {errors?.senderAddress?.country ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.senderAddress?.country}
                                    </div>
                                ) : null}
                            </div>

                            {/* Client Address */}

                            <h3 className="text-primary text-Heading-S-variant flex-[1_1_100%]">
                                Bill To
                            </h3>

                            <div className="relative flex flex-[1_1_100%] flex-col  gap-y-2">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary': errors?.clientName,
                                    })}
                                    htmlFor="clientName"
                                >
                                    Client's Name
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) => handleValidtionBlur(e, 'clientName')}
                                    id="clientName"
                                    name="clientName"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.clientName,
                                        }
                                    )}
                                />
                                {errors?.clientName ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.clientName}
                                    </div>
                                ) : null}
                            </div>

                            <div className="relative flex flex-[1_1_100%] flex-col  gap-y-2">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary': errors?.clientEmail,
                                    })}
                                    htmlFor="clientEmail"
                                >
                                    Client's Email
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) => handleValidtionBlur(e, 'clientEmail')}
                                    id="clientEmail"
                                    name="clientEmail"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.clientEmail,
                                        }
                                    )}
                                />
                                {errors?.clientEmail ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.clientEmail}
                                    </div>
                                ) : null}
                            </div>

                            <div className="relative flex flex-[1_1_100%] flex-col  gap-y-2">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary':
                                            errors?.clientAddress?.street,
                                    })}
                                    htmlFor="clientAddress.street"
                                >
                                    Street Address
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) =>
                                        handleValidtionBlur(
                                            e,
                                            'clientAddress.street'
                                        )
                                    }
                                    id="clientAddress.street"
                                    name="clientAddress.street"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.clientAddress?.street,
                                        }
                                    )}
                                />
                                {errors?.clientAddress?.street ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.clientAddress?.street}
                                    </div>
                                ) : null}
                            </div>

                            <div className="w-38 relative flex flex-1 flex-col gap-y-2  sm:flex-initial">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary':
                                            errors?.clientAddress?.city,
                                    })}
                                    htmlFor="clientAddress.city"
                                >
                                    City
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) =>
                                        handleValidtionBlur(
                                            e,
                                            'clientAddress.city'
                                        )
                                    }
                                    id="clientAddress.city"
                                    name="clientAddress.city"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.clientAddress?.city,
                                        }
                                    )}
                                />
                                {errors?.clientAddress?.city ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.clientAddress?.city}
                                    </div>
                                ) : null}
                            </div>

                            <div className="w-38 relative flex flex-1 flex-col gap-y-2  sm:flex-initial">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary':
                                            errors?.clientAddress?.postCode,
                                    })}
                                    htmlFor="clientAddress.postCode"
                                >
                                    Post Code
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) =>
                                        handleValidtionBlur(
                                            e,
                                            'clientAddress.postCode'
                                        )
                                    }
                                    id="clientAddress.postCode"
                                    name="clientAddress.postCode"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.clientAddress?.postCode,
                                        }
                                    )}
                                />
                                {errors?.clientAddress?.postCode ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.clientAddress?.postCode}
                                    </div>
                                ) : null}
                            </div>

                            <div className=" sm:w-38 relative flex flex-1 flex-col gap-y-2  sm:flex-initial">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary':
                                            errors?.clientAddress?.country,
                                    })}
                                    htmlFor="clientAddress.country"
                                >
                                    Country
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) =>
                                        handleValidtionBlur(
                                            e,
                                            'clientAddress.country'
                                        )
                                    }
                                    id="clientAddress.country"
                                    name="clientAddress.country"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary':
                                                errors?.clientAddress?.country,
                                        }
                                    )}
                                />
                                {errors?.clientAddress?.country ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.clientAddress?.country}
                                    </div>
                                ) : null}
                            </div>

                            {/* Date Picker and custom select */}
                            <Field name="createdAt" component={Datepicker} />
                            <Field
                                id="paymentTerms"
                                name="paymentTerms"
                                component={CustomSelect}
                                options={options}
                            />

                            <div className=" relative flex flex-[1_1_100%] flex-col  gap-y-2">
                                <label
                                    className={cn(' text-body-variant', {
                                        'text-secondary': errors?.description,
                                    })}
                                    htmlFor="description"
                                >
                                    Project Description
                                </label>
                                <Field
                                    onBlur={(
                                        e: React.FocusEvent<HTMLInputElement>
                                    ) => handleValidtionBlur(e, 'description')}
                                    id="description"
                                    name="description"
                                    placeholder=""
                                    className={cn(
                                        ' rounded-xs dark:bg-elem-dark text-Heading-S-variant text-important border-border dark:border-elem-dark hover:border-primary focus:border-primary h-12 border px-5 outline-none dark:text-white',
                                        {
                                            'border-secondary ':
                                                errors?.description,
                                        }
                                    )}
                                />
                                {errors?.description ? (
                                    <div className="text-error text-secondary absolute right-4 top-0">
                                        {errors?.description}
                                    </div>
                                ) : null}
                            </div>

                            {/* Item List */}
                            <List
                                AddItem={AddItem}
                                DeleteItem={handleDeleteitem}
                                handleChangeItem={handleChangeItem}
                                itemList={items}
                                handleBlur={handleBlur}
                                displayError={displayError}
                            />
                            <div
                                className={cn(
                                    'text-body-variant text-secondary hidden flex-col text-[10px]',
                                    {
                                        flex: displayError,
                                    }
                                )}
                            >
                                <p>- All fields must be added</p>
                                {!items.length ? (
                                    <p>- An item must be added</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* Button block */}
                    <FormEnd
                        invoiceId={invoiceId}
                        itemList={items}
                        isBottom={isBottom}
                        setErrors={setErrors}
                        setDisplayError={setDisplayError}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default ModalForm
