import React from 'react'
import EmptyIllustration from '../Shared/EmptyIllustration'

const EmptyData = () => {
    return (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
            <EmptyIllustration />
            <h2 className=" text-Heading-M text-important mt-10.5 mb-5.5 md:mt-16.5 dark:text-white">
                There is nothing here
            </h2>
            <p className=" text-paragraph whitespace-pre-wrap text-center dark:text-white">
                Create an invoice by clicking the <br />
                <strong>New Invoice</strong> button and get started
            </p>
        </div>
    )
}

export default EmptyData
