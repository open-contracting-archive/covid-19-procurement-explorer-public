import React, { useState, useEffect, Fragment } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { identity, pickBy, get } from 'lodash'
import VisualizationServices from '../../services/visualizationServices'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'

const BuyerTable = (props) => {
    const { params } = props
    const [buyersList, setBuyersList] = useState([])
    const [pagination, setPagination] = useState('')
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const { trans } = useTrans()
    const queryParams = identity(pickBy(params))

    useEffect(() => {
        LoadBuyersList()
    }, [params])

    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

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
            setLoading(false)
        })
    }

    const showDetail = (id) => {
        let path = `/buyers/${id}`
        history.push(path)
    }

    return loading ? (<Loader />) : (
        <Fragment>
            <div className="mb-12 flex gap-8">
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        {trans('Buyers')}
                    </p>
                    <input type="text" name="buyer" className="text-field text-sm" placeholder="Buyer Name" />
                </div>
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        {trans('Product category')}
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
                        {trans('Country')}
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
                        {trans('Value range')}
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
                            % red flags
                            <SortIcon className="ml-1 cursor-pointer" />
                        </span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {buyersList && buyersList.map((buyer, index) => {
                    return (
                        <tr key={index}
                            onClick={() => showDetail(buyer.buyer_id)}
                            className={tableRowClass(buyer.red_flag)}>
                            <td>{get(buyer, 'buyer_name')}</td>
                            <td>{get(buyer, 'country_name')}</td>
                            <td>{get(buyer, 'tender_count')}</td>
                            <td>{get(buyer, 'supplier_count')}</td>
                            <td>{get(buyer, 'product_category_count')}</td>
                            <td>{buyer.amount_usd && buyer.amount_usd.toLocaleString('en')}</td>
                            <td>{get(buyer, 'average_red_flag')}</td>
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
        </Fragment>
    )
}

export default BuyerTable
