import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Link, useHistory } from 'react-router-dom'
import { identity, pickBy, get } from 'lodash'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import useTrans from '../../hooks/useTrans'
import VisualizationServices from '../../services/visualizationServices'
import { formatDate } from '../../helpers/date'
import Loader from '../Loader/Loader'

function BuyerTable({ params }) {
    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    const [buyersList, setBuyersList] = useState([])
    const [pagination, setPagination] = useState('')
    const [loading, setLoading] = useState(false)
    const { trans } = useTrans()
    const history = useHistory()
    const queryParams = identity(pickBy(params))

    useEffect(() => {
        LoadBuyersList()
    }, [params])

    const tableRowClass = (hasRedFlags) => {
        return hasRedFlags ? 'table-row has-red-flag cursor-pointer' : 'table-row cursor-pointer'
    }

    const LoadBuyersList = () => {
        VisualizationServices.BuyerTableList({
            ...queryParams
        }).then((response) => {
            if (response) {
                setBuyersList([...buyersList, ...response.results])
                setPagination(response.next)
            }
            setLoading(true)
        })
    }

    const showDetail = (id) => {
        let path = `/buyers/${id}`
        history.push(path)
    }

    return (
        <div>
            {loading ? (
                <>
                    <div className="mb-12 flex gap-8">
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Buyers
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Products
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Country
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Value range
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>
                                    <span className="flex items-center">
                                        Buyer{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        Country{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span className="flex items-center">
                                        # of contracts{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span className="flex items-center">
                                        # of suppliers{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        product categories
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        value (usd)
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        value (local)
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        % red flags
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyersList && buyersList.map((buyer, index) => {
                                return (
                                    <tr
                                        key={index}
                                        onClick={() => showDetail(buyer.buyer_id)}
                                        className={tableRowClass(
                                            buyer.red_flag
                                        )}>
                                        <td className="uppercase">
                                            {get(buyer, 'buyer_name')}
                                        </td>
                                        <td className="uppercase">
                                            {get(buyer, 'country_name')}
                                        </td>
                                        <td className="uppercase">
                                            {get(buyer, 'tender_count')}
                                        </td>
                                        <td className="capitalize">
                                            {get(buyer, 'supplier_count')}
                                        </td>
                                        <td>
                                            {get(
                                                buyer,
                                                'product_category_count'
                                            )}
                                        </td>
                                        <td>
                                            {buyer.amount_usd && buyer.amount_usd.toLocaleString(
                                                'en'
                                            )}
                                        </td>
                                        <td>
                                            {buyer.amount_local && buyer.amount_local.toLocaleString(
                                                'en'
                                            )}
                                        </td>
                                        <td>
                                            {get(buyer, 'average_red_flag')}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="text-center mt-8">
                        <button
                            className="text-primary-blue"
                            onClick={LoadBuyersList}>
                            Load more
                        </button>
                    </div>
                </>
            ) : (
                    <Loader />
                )}
        </div>
    )
}

export default BuyerTable
