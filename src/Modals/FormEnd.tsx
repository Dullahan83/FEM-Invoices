import React from 'react'
import useModal from '../Hooks/useModal'
import CustomButton from '../Components/Shared/CustomButton'
import { calculateTotal, cn, getFormatedDate } from '../Utils/functions'
import { useFormikContext } from 'formik'
import useStore from '../Hooks/useStore'
import { FormikInvoice, Invoice, InvoiceItem, Status } from '../Utils/Types'

type FormEndProps = {
    isBottom: boolean
    itemList: InvoiceItem[]
    invoiceId?: string
    setErrors: React.Dispatch<
        React.SetStateAction<Partial<FormikInvoice> | undefined>
    >
    setDisplayError: React.Dispatch<React.SetStateAction<boolean>>
}

const FormEnd = ({
    isBottom,
    itemList,
    invoiceId,
    setErrors,
    setDisplayError,
}: FormEndProps) => {
    const { modalType, closeModal } = useModal()
    const { createInvoice } = useStore()

    const formikContext = useFormikContext<Invoice>()

    const Invoice = {
        ...formikContext.values,
        id: invoiceId,
        createdAt: getFormatedDate(new Date().toDateString(), 'short'),
        paymentDue: getFormatedDate(formikContext.values.paymentDue, 'short'),
        items: itemList,
        status: 'draft' as Status,
        total: calculateTotal(itemList),
    }

    const handleDraft = () => {
        createInvoice(Invoice as Invoice)
        setErrors({})
        setDisplayError(false)
        closeModal()
    }

    const handleCancel = () => {
        formikContext.resetForm(formikContext.initialValues)
        setErrors({})
        setDisplayError(false)
        closeModal()
    }

    return (
        <div
            className={cn(
                'rounded-r-2.5xl sticky bottom-0 left-0 z-50 w-full before:absolute before:bottom-[85%] before:-z-10 before:h-20 before:w-full before:bg-gradient-to-t before:from-[#0000001a] before:to-[#00000003] before:content-[""] before:sm:hidden before:sm:h-36',
                {
                    'before:sm:block': !isBottom,
                }
            )}
        >
            {modalType === 'Create' ? (
                <div className="sm:rounded-r-2.5xl dark:bg-dark flex w-full items-center justify-between bg-white px-6 py-5 sm:h-[110px] sm:px-14">
                    <CustomButton
                        type="button"
                        variant="Discard"
                        onClick={handleCancel}
                    />
                    <div className="flex gap-x-2 self-center">
                        <CustomButton
                            onClick={handleDraft}
                            type="button"
                            variant="Draft"
                        >
                            Save as Draft
                        </CustomButton>

                        <CustomButton variant="Save">Save & Send</CustomButton>
                    </div>
                </div>
            ) : (
                <div
                    className={cn(
                        'sm:rounded-r-2.5xl dark:bg-dark flex w-full  justify-end bg-white py-5 pr-6 sm:h-[110px] sm:pr-14'
                    )}
                >
                    <div className="flex gap-x-2 self-center">
                        <CustomButton
                            type="button"
                            variant="Cancel"
                            onClick={handleCancel}
                        />
                        <CustomButton variant="Save" type="submit">
                            Save Changes
                        </CustomButton>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FormEnd
