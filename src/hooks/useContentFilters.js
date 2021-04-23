import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { range } from '../helpers/general'

const useContentFilters = () => {
    const countries = useSelector((state) => state.general.countries)

    return {
        countrySelectList: useMemo(() => {
            return [
                { label: 'All ', value: '' },
                ...countries
                    .map((country) => {
                        return {
                            label: country.name,
                            value: country.id
                        }
                    })
                    .sort((a, b) => {
                        return a.label < b.label ? -1 : 0
                    })
            ]
        }, [countries]),
        contentsTypeSelectList: useMemo(() => {
            return [
                { label: 'All', value: '' },
                { label: 'News', value: 'News' },
                { label: 'Blog', value: 'Blog' }
            ]
        }, []),
        resourceTypeSelectList: useMemo(() => {
            return [
                { value: '', label: 'All' },
                { value: 'Report', label: 'Report' },
                { value: 'Policy', label: 'Policy' },
                { value: 'Guide', label: 'Guide' },
                { value: 'Tools', label: 'Tools' },
                { value: 'Training Material', label: 'Training Material' }
            ]
        }, []),
        yearSelectList: useMemo(() => {
            return range(2019, new Date().getFullYear()).reduce(
                (acc, current) => [...acc, { value: current, label: current }],
                []
            )
        }, [])
    }
}

export default useContentFilters
