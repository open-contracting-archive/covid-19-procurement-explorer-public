import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Select from 'react-select'
import { useHistory, useParams } from 'react-router-dom'
import { get, identity, pickBy } from 'lodash'
import ContractService from '../../services/ContractService'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import 'react-datepicker/dist/react-datepicker.css'
import useContractFilters from '../../hooks/useContractFilters'
import { hasValidProperty } from '../../helpers/general'
import { ReactComponent as FilterIcon } from '../../assets/img/icons/ic_filter.svg'
import { ReactComponent as FilterCloseIcon } from '../../assets/img/icons/ic_filter-close.svg'

const ProductTable = (props) => {
    const { params } = props
    const { countrySlug } = useParams()
    const [originalData, setOriginalData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState(() =>
        identity(pickBy(params))
    )
    const { countrySelectList } = useContractFilters()
    const { trans } = useTrans()
    const history = useHistory()
    const [showFilter, setShowFilter] = useState('hidden')

    useEffect(() => {
        setLoading(true)
        ContractService.ProductList({
            ...selectedFilters
        })
            .then((response) => {
                if (response) {
                    setOriginalData(response)
                }
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
            })

        return () => {
            setOriginalData([])
        }
    }, [selectedFilters])

    const showDetail = (id) => {
        if (countrySlug) {
            history.push(`/country/${countrySlug}/products/${id}`)
        } else {
            history.push(`/global-overview/products/${id}`)
        }
    }
    const appendFilter = (selected) => {
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
                className="md:hidden cursor-pointer"
                onClick={handleFilterToggle}>
                <div className="filter-ui">
                    <FilterIcon />
                </div>
            </div>

            {showFilter ? (
                <div
                    className={`bg-primary-blue absolute top-0 filter-ui-content z-20 p-4 mr-10 ${showFilter}`}
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

            <div className="relative">
                <div className="custom-scrollbar table-scroll">
                    <table className="table">
                        <thead>
                            <tr className="whitespace-no-wrap">
                                <th style={{ width: '20%' }}>
                                    <span className="flex items-center">
                                        {trans('Product Category')}{' '}
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span className="flex items-center">
                                        # of contracts{' '}
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        value (usd)
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span className="flex items-center">
                                        # of suppliers{' '}
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span className="flex items-center">
                                        # of buyers{' '}
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5}>
                                        <Loader sm />
                                    </td>
                                </tr>
                            ) : originalData.length ? (
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
                                                {get(product, 'tender_count')}
                                            </td>
                                            <td>
                                                {product.amount_usd &&
                                                    product.amount_usd.toLocaleString(
                                                        'en'
                                                    )}
                                            </td>
                                            <td>
                                                {get(product, 'supplier_count')}
                                            </td>
                                            <td>
                                                {get(product, 'buyer_count')}
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        <p>No data available</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductTable
