import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useHistory, useParams } from 'react-router-dom'
import { get, identity, pickBy } from 'lodash'
import ContractService from '../../services/ContractService'
import { t } from '@transifex/native'
import { TableLoader } from '../Utilities'
import useContractFilters from '../../hooks/useContractFilters'
import useTableSorting from '../../hooks/useTableSorting'
import { hasValidProperty } from '../../helpers/general'
import { ReactComponent as FilterIcon } from '../../assets/img/icons/ic_filter.svg'
import { ReactComponent as FilterCloseIcon } from '../../assets/img/icons/ic_filter-close.svg'
import Default from '../../constants/Default'

const ProductTable = (props) => {
    const { params } = props
    const { countrySlug } = useParams()
    const [loading, setLoading] = useState(false)
    const [originalData, setOriginalData] = useState([])
    const [selectedFilters, setSelectedFilters] = useState({})
    const history = useHistory()
    const [showFilter, setShowFilter] = useState('hidden')
    const [totalItems, setTotalItems] = useState(0)
    const { countrySelectList } = useContractFilters()

    const { sortedItems, sorting, tableHeaderSpan } = useTableSorting({
        items: originalData,
        defaultSorting: {
            column: 'product_name',
            direction: ''
        },
        columnTypeMapping: {
            tender_count: 'number',
            amount_usd: 'number',
            buyer_count: 'number',
            supplier_count: 'number'
        },
        sortTableData: true
    })

    useEffect(() => {
        const filterParams = {
            ...identity(pickBy(params)),
            ...selectedFilters,
            order: sorting.direction + sorting.column
        }
        setLoading(true)
        ContractService.ProductList(filterParams)
            .then((result) => {
                if (result) {
                    setOriginalData(result)
                    setTotalItems(result.length)
                    setLoading(false)
                }
            })
            .catch(() => {
                setLoading(false)
            })

        return () => {
            setOriginalData([])
        }
    }, [params?.country, selectedFilters, sorting])

    const showDetail = (id) => {
        if (countrySlug) {
            history.push(`/country/${countrySlug}/products/${id}`)
        } else {
            history.push(`/global-overview/products/${id}`)
        }
    }

    const appendFilter = (selected) => {
        setLoading(true)
        setSelectedFilters((previous) => {
            return {
                ...previous,
                ...selected
            }
        })
    }

    const hasCountry = () => {
        return hasValidProperty(params, 'country')
    }

    const handleFilterToggle = () => {
        setShowFilter(showFilter === 'hidden' ? 'block' : 'hidden')
    }

    const handleCloseFilter = () => {
        setShowFilter('hidden')
    }

    return (
        <div className="relative">
            <div
                className="cursor-pointer md:hidden"
                onClick={handleFilterToggle}>
                <div className="filter-ui">
                    <FilterIcon />
                </div>
            </div>

            {showFilter ? (
                <div
                    className={`mt-24 bg-primary-blue absolute left-0 right-0 top-0 filter-ui-content z-20 p-4 mr-10 ${showFilter}`}
                    style={{ minWidth: '250px' }}>
                    <div className="flex justify-between mb-4 text-white md:mb-0">
                        <span className="text-sm font-bold uppercase">
                            Filter
                        </span>
                        <span
                            className="text-sm font-bold uppercase cursor-pointer filter-close"
                            onClick={handleCloseFilter}>
                            <FilterCloseIcon />
                        </span>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        {!hasCountry() && (
                            <div className="w-full px-2">
                                <p className="text-xs leading-none text-white uppercase opacity-50 md:text-primary-dark">
                                    {t('Country')}
                                </p>
                                <Select
                                    className="text-sm select-filter"
                                    classNamePrefix="select-filter"
                                    options={countrySelectList}
                                    onChange={(selectedOption) =>
                                        appendFilter({
                                            country: selectedOption.value
                                        })
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                ''
            )}

            {!hasCountry() && (
                <div className="hidden gap-8 mb-8 md:flex">
                    <div className="w-40">
                        <p className="text-xs leading-none uppercase opacity-50">
                            {t('Country')}
                        </p>
                        <Select
                            className="text-sm select-filter"
                            classNamePrefix="select-filter"
                            options={countrySelectList}
                            onChange={(selectedOption) =>
                                appendFilter({ country: selectedOption.value })
                            }
                        />
                    </div>
                </div>
            )}

            <div className="relative overflow-hidden">
                <div className="custom-scrollbar table-scroll">
                    <table className="table">
                        <thead>
                            <tr className="whitespace-no-wrap">
                                <th style={{ width: '20%' }}>
                                    {tableHeaderSpan(
                                        'product_name',
                                        `${t('Product Category')}`
                                    )}
                                </th>
                                <th style={{ width: '6%' }}>
                                    {tableHeaderSpan(
                                        'tender_count',
                                        `${t('# of contracts')}`
                                    )}
                                </th>
                                <th style={{ width: '10%' }}>
                                    {tableHeaderSpan(
                                        'amount_usd',
                                        `${t('value (usd)')}`
                                    )}
                                </th>
                                <th style={{ width: '6%' }}>
                                    {tableHeaderSpan(
                                        'supplier_count',
                                        `${t('# of suppliers')}`
                                    )}
                                </th>
                                <th style={{ width: '6%' }}>
                                    {tableHeaderSpan(
                                        'buyer_count',
                                        `${t('# of buyers')}`
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedItems.map((product, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            showDetail(product.product_id)
                                        }>
                                        <td className="hover:text-primary-blue">
                                            {get(product, 'product_name')}
                                        </td>
                                        <td>
                                            {get(product, Default.TENDER_COUNT)}
                                        </td>
                                        <td>
                                            {product[Default.AMOUNT_USD] &&
                                                product[
                                                    Default.AMOUNT_USD
                                                ].toLocaleString('en')}
                                        </td>
                                        <td>
                                            {get(product, 'supplier_count')}
                                        </td>
                                        <td>{get(product, 'buyer_count')}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {!originalData.length && (
                        <div
                            className="flex items-center justify-center bg-white rounded-md"
                            style={{
                                height: '75%',
                                minHeight: '250px'
                            }}>
                            <p>No data available</p>
                        </div>
                    )}
                </div>
                {loading && <TableLoader />}
            </div>
            <div>
                <div className="mt-2 text-sm text-right">
                    <p className="text-opacity-50 text-primary-dark">
                        Showing{' '}
                        <span className="text-opacity-75 text-primary-dark">
                            {totalItems}
                        </span>{' '}
                        items.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductTable
