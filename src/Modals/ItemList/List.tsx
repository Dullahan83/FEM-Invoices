import React from 'react'
import Row from './Row'
import { InvoiceItem } from '../../Utils/Types'
import CustomButton from '../../Components/Shared/CustomButton'

type ListProps = {
    itemList: InvoiceItem[]
    AddItem: () => void
    DeleteItem: (index: number) => void
    handleChangeItem: (
        index: number,
        property: keyof InvoiceItem,
        value: string
    ) => void
    handleBlur: (index: number, property: keyof InvoiceItem) => void
    displayError: boolean
}

const List = ({ itemList, AddItem, ...props }: ListProps) => {
    return (
        <div className="w-full">
            <h3 className=" mb-5.5 text-lg leading-8">Item List</h3>
            <div className=" w-full flex-col gap-y-8 rounded-t-lg   ">
                <div className=" text-body-variant my-3.5 hidden flex-wrap gap-x-4 sm:flex">
                    <p className=" flex-[0_1_214px]">Item Name</p>
                    <p className=" flex-[0_1_46px]">Qty.</p>
                    <p className=" flex-[0_1_100px]">Price</p>
                    <p className=" flex-[0_1_70px]">Total</p>
                </div>
                <div className="flex flex-col gap-y-[49px] sm:gap-y-[18px]">
                    {itemList?.map((item, index) => {
                        return (
                            <Row
                                {...props}
                                key={index}
                                index={index}
                                item={item}
                            />
                        )
                    })}
                </div>
            </div>
            <CustomButton onClick={AddItem} type="button" variant="Add Item" />
        </div>
    )
}

export default List
