import React from 'react'
import { Status } from '../Utils/Types'
import useStore from './useStore'

const useFilter = () => {
    const { data } = useStore()
    const [filteredDatas, setFilteredDatas] = React.useState(data)

    const filterDatas = (status: Status | '') => {
        if (status) {
            setFilteredDatas(data.filter((item) => item.status === status))
        } else setFilteredDatas(data)
    }

    React.useEffect(() => {
        setFilteredDatas(data)
    }, [data])
    return { filteredDatas, filterDatas }
}

export default useFilter
