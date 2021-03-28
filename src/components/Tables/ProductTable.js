import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useHistory, useParams } from 'react-router-dom'
import { get, identity, pickBy } from 'lodash'
import ContractService from '../../services/ContractService'
import useTrans from '../../hooks/useTrans'
import 'react-datepicker/dist/react-datepicker.css'
import TableLoader from '../Loader/TableLoader'
import useContractFilters from '../../hooks/useContractFilters'
import { hasValidProperty } from '../../helpers/general'
import { ReactComponent as FilterIcon } from '../../assets/img/icons/ic_filter.svg'
import { ReactComponent as FilterCloseIcon } from '../../assets/img/icons/ic_filter-close.svg'
import Default from '../../constants/Default'

const ProductTable = (props) => {
    const { params } = props
    const { countrySlug } = useParams()
    const [loading, setLoading] = useState(false)
    const [originalData, setOriginalData] = useState([])
    const [sorting, setSorting] = useState(() => ({
        column: 'product_name',
        direction: ''
    }))
    const [selectedFilters, setSelectedFilters] = useState({})
    const history = useHistory()
    const [showFilter, setShowFilter] = useState('hidden')
    const [totalItems, setTotalItems] = useState(0)
    const { countrySelectList } = useContractFilters()
    const { trans } = useTrans()

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
            .catch((error) => {
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

    const appendSort = (columnName) => {
        setSorting((previous) => {
            if (previous.column === columnName) {
                return {
                    ...previous,
                    direction: previous.direction === '-' ? '' : '-'
                }
            }
            return {
                column: columnName,
                direction: ''
            }
        })
    }

    const columnSorting = (columnName) => {
        return (
            <span className="icon-sort">
                <span
                    className={`icon-sort-arrow-up ${
                        sorting.column === columnName &&
                        sorting.direction === '' &&
                        'active'
                    }`}
                />
                <span
                    className={`icon-sort-arrow-down ${
                        sorting.column === columnName &&
                        sorting.direction === '-' &&
                        'active'
                    }`}
                />
            </span>
        )
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
                className="md:hidden cursor-pointer"
                onClick={handleFilterToggle}>
                <div className="filter-ui">
                    <FilterIcon />
                </div>
            </div>

            {showFilter ? (
                <div
                    className={`mt-24 bg-primary-blue absolute left-0 right-0 top-0 filter-ui-content z-20 p-4 mr-10 ${showFilter}`}
                    style={{ minWidth: '250px' }}>
                    <div className="flex justify-between text-white mb-4 md:mb-0">
                        <span className="text-sm uppercase font-bold">
                            Filter
                        </span>
                        <span
                            className="filter-close text-sm uppercase font-bold cursor-pointer"
                            onClick={handleCloseFilter}>
                            <FilterCloseIcon />
                        </span>
                    </div>
                    <div className="flex -mx-2 flex-wrap">
                        {!hasCountry() && (
                            <div className="w-full px-2">
                                <p className="text-white md:text-primary-dark uppercase text-xs opacity-50 leading-none">
                                    {trans('Country')}
                                </p>
                                <Select
                                    className="select-filter text-sm"
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
                <div className="hidden mb-8 md:flex gap-8">
                    <div className="w-40">
                        <p className="uppercase text-xs opacity-50 leading-none">
                            {trans('Country')}
                        </p>
                        <Select
                            className="select-filter text-sm"
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
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('product_name')
                                        }>
                                        {trans('Product Category')}{' '}
                                        {columnSorting('product_name')}
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('tender_count')
                                        }>
                                        {trans('# of contracts')}
                                        {columnSorting('tender_count')}
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('amount_usd')
                                        }>
                                        {trans('value (usd)')}
                                        {columnSorting('amount_usd')}
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('supplier_count')
                                        }>
                                        {trans('# of suppliers')}
                                        {columnSorting('supplier_count')}
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('buyer_count')
                                        }>
                                        {trans('# of buyers')}
                                        {columnSorting('buyer_count')}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {originalData &&
                                originalData.map((product, index) => {
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
                                                {get(
                                                    product,
                                                    Default.TENDER_COUNT
                                                )}
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
                                            <td>
                                                {get(product, 'buyer_count')}
                                            </td>
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
                <div className="text-right mt-2 text-sm">
                    <p className="text-primary-dark text-opacity-50">
                        Showing{' '}
                        <span className="text-primary-dark text-opacity-75">
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
