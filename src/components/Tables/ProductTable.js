import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Select from 'react-select'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { get, has, identity, pickBy } from 'lodash'
import ContractService from '../../services/ContractService'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import TableLoader from '../Loader/TableLoader'
import 'react-datepicker/dist/react-datepicker.css'

const ProductTable = (props) => {
    const { params } = props
    const { countrySlug } = useParams()
    const countries = useSelector((state) => state.general.countries)
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState(() => identity(pickBy(params)))
    const { trans } = useTrans()
    const history = useHistory()
    const countrySelectList = useMemo(() => {
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
    }, [countries])

    useEffect(() => {
        setLoading(true)
        ContractService.ProductList({
            ...selectedFilters
        })
            .then((response) => {
                if (response) {
                    setProductList(response)
                }
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
            })
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
        return (
            has(params, 'country') &&
            params.country !== undefined &&
            params.country !== null &&
            params.country !== ''
        )
    }

    return (
        <Fragment>
            {!hasCountry() && (
                <div className="mb-8 flex gap-8">
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
                        <tr>
                            <th style={{ width: '20%' }}>
                                <span className="flex items-center">
                                    {trans('Product Category')}{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th style={{ width: '6%' }}>
                                <span className="flex items-center">
                                    # of contracts{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th style={{ width: '10%' }}>
                                <span className="flex items-center">
                                    value (usd)
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th style={{ width: '6%' }}>
                                <span className="flex items-center">
                                    # of suppliers{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th style={{ width: '6%' }}>
                                <span className="flex items-center">
                                    # of buyers{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}><Loader sm /></td>
                            </tr>
                        ) : (productList.length ? productList.map((product, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="cursor-pointer"
                                        onClick={() => showDetail(product.product_id)}>
                                        <td>{get(product, 'product_name')}</td>
                                        <td>
                                            {get(product, 'tender_count')}
                                        </td>
                                        <td>
                                            {product.amount_usd && product.amount_usd.toLocaleString('en')}
                                        </td>
                                        <td>
                                            {get(product, 'supplier_count')}
                                        </td>
                                        <td>
                                            {get(product, 'buyer_count')}
                                        </td>
                                    </tr>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        <p>No data available</p>
                                    </td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductTable
