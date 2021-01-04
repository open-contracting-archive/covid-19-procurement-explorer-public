import React, { Fragment, useState, useEffect } from "react"
import Select from 'react-select'
import { get, pickBy, identity } from 'lodash'
import { Link } from 'react-router-dom'
import { ReactComponent as SortIcon } from "../../assets/img/icons/ic_sort.svg";
import { ReactComponent as FlagIcon } from "../../assets/img/icons/ic_flag.svg";
import Loader from "../Loader/Loader";
import VisualizationServices from "../../services/visualizationServices";
import useTrans from "../../hooks/useTrans";
import { formatDate } from "../../helpers/date";

function TenderTable(props) {
    const options = [
        {value: 'option-1', label: 'Option 1'},
        {value: 'option-2', label: 'Option 2'},
        {value: 'option-3', label: 'Option 3'}
    ]
    const [tenderList, setTenderList] = useState([])
    const [pagination, setPagination] = useState('')
    const [loading, setLoading] = useState(false)
    const {trans} = useTrans()
    const queryParams = identity(pickBy(props))

    useEffect(() => {
        LoadTenderList()
    }, [])

    const LoadTenderList = () => {
        VisualizationServices.TenderList({...queryParams, ...pagination})
            .then((response) => {
                    if (response) {
                        setTenderList([...tenderList, ...response.results])
                        setPagination(response.next)
                    }
                    setLoading(true)
                }
            )
    }

    const hasCountry = () => {
        return props.country !== undefined && props.country !== null && props.country !== ""
    }

    const tableRowClass = (hasRedFlags) => {
        return hasRedFlags ? 'table-row has-red-flag' : 'table-row'
    }

    return (
        <div>
            <h1>{props.country}</h1>
            <h1>{hasCountry()}</h1>
            {loading ? (
                <Fragment>
                    <div className="mb-12 flex gap-8 justify-between">
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Project title
                            </p>
                            <input type="text" className="select-filter text-sm" />
                        </div>
                        {!hasCountry ? (<div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Country
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>) : ('')}

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
                                Supplier
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
                                Method
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
                                Data range
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
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Status
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
                            <th style={{width: '25%'}}>
                                <span className="flex items-center">
                                    {trans('Project Title')}{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th>
                                <span className="flex items-center">
                                    {trans('Buyer')}{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th>
                                <span className="flex items-center">
                                    {trans('Supplier')}{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th style={{width: '10%'}}>
                                <span className="flex items-center">
                                    {trans('Method')}{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th style={{width: '20%'}}>
                                <span className="flex items-center">
                                    {trans('Product Category')}{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th style={{width: '10%'}}>
                                <span className="flex items-center">
                                    {trans('Date')}{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th style={{width: '10%'}}>
                                <span className="flex items-center">
                                    {trans('Value (USD)')}{' '}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {tenderList &&
                        tenderList.map((tender, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={`/tender/${tender.id}`}
                                    className={tableRowClass(tender.red_flag)}>
                                    <td className="uppercase">
                                        {tender.contract_title}
                                    </td>
                                    <td className="uppercase">
                                        {get(tender, 'buyer.buyer_name')}
                                    </td>
                                    <td className="uppercase">
                                        {get(tender, 'supplier.supplier_name')}
                                    </td>
                                    <td className="capitalize">
                                        {tender.procurement_procedure}
                                    </td>
                                    <td>
                                        {get(tender, 'product.product_name')}
                                    </td>
                                    <td>
                                        {formatDate(tender.contract_date)}
                                    </td>
                                    <td>
                                        {tender.contract_value_usd && tender.contract_value_usd.toLocaleString('en')}
                                    </td>
                                    <td>
                                        {tender.red_flag && (
                                            <span className="mr-4"><FlagIcon /></span>
                                        )}
                                    </td>
                                </Link>
                            )
                        })}
                        </tbody>
                    </table>
                    <div className="text-center mt-8">
                        <button
                            className="text-primary-blue"
                            onClick={LoadTenderList}>
                            Load more
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default TenderTable
