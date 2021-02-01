import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const useContractFilters = () => {
    const countries = useSelector((state) => state.general.countries)
    const contractMethods = useSelector((state) => state.general.contractMethods)
    const productCategories = useSelector((state) => state.general.productCategories)
    return {
        countrySelectList: useMemo(() => {
            return [
                { label: 'All ', value: '' },
                ...countries
                    .filter((country) => country.name !== 'Global')
                    .map((country) => {
                        return {
                            label: country.name,
                            value: country.country_code_alpha_2
                        }
                    })
                    .sort((a, b) => {
                        return a.label < b.label ? -1 : 0
                    })
            ]
        }, [countries]),
        contractMethodSelectList: useMemo(() => {
            return [{ label: 'All', value: '' }, ...contractMethods]
        }, [contractMethods]),
        productSelectList: useMemo(() => {
            return [
                { label: 'All', value: '' },
                ...productCategories
                    .map((productCategory) => {
                        return {
                            label: productCategory.name,
                            value: productCategory.id
                        }
                    })
                    .sort((a, b) => {
                        return a.label < b.label ? -1 : 0
                    })
            ]
        }, [productCategories]),
        valueRanges: useMemo(() => {
            return [
                { label: 'All', value: '' },
                ...[
                    { sign: 'lt', value: 1000 },
                    { sign: 'gt', value: 1000 },
                    { sign: 'gt', value: 10000 },
                    { sign: 'gt', value: 100000 },
                    { sign: 'gt', value: 1000000 },
                    { sign: 'gt', value: 100000000 }
                ].map((item) => {
                    return {
                        value: item,
                        label: `${
                            item.sign === 'gt' ? '>' : '<'
                        } ${item.value.toLocaleString()}`
                    }
                })
            ]
        }, [])
    }
}

export default useContractFilters
