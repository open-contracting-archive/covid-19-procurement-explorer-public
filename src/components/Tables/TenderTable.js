import React, { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import { get, pickBy, identity } from 'lodash'
import { Link, useHistory } from 'react-router-dom'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'
import Loader from '../Loader/Loader'
import VisualizationServices from '../../services/visualizationServices'
import useTrans from '../../hooks/useTrans'
import { formatDate } from '../../helpers/date'

function TenderTable({ homepage, params }) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]
    const [tenderList, setTenderList] = useState([])
    const [pagination, setPagination] = useState('')
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()
    const queryParams = identity(pickBy(params))
    const history = useHistory()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        LoadContractList()
    }, [params])

    // ===========================================================================
    // Helpers and functions
    // ===========================================================================
    const showDetail = (id) => {
        let path = `/contracts/${id}`
        history.push(path)
    }

    const LoadContractList = () => {
        VisualizationServices.ContractList({
            ...queryParams
        }).then((response) => {
            if (response) {
                setTenderList([...tenderList, ...response.results])
                setPagination(response.next)
            }
            setLoading(false)
        })
    }

    const hasCountry = () => {
        return (
            params.country !== undefined &&
            params.country !== null &&
            params.country !== ''
        )
    }

    const tableRowClass = (hasRedFlags) => {
        return hasRedFlags
            ? 'table-row has-red-flag cursor-pointer'
            : 'table-row cursor-pointer'
    }

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div
                        className={`mb-12 flex gap-8 justify-between ${
                            homepage ? 'hidden' : ''
                        }`}>
                        {!hasCountry ? (
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
                        ) : (
                            ''
                        )}

                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Contract title
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
                                Buyer
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
                                Product category
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
                    </div>
                    <div className="custom-scrollbar table-scroll">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ width: '25%' }}>
                                        <span className="flex items-center">
                                            {trans('Contract Title')}{' '}
                                            <SortIcon className="ml-1 cursor-pointer" />
                                        </span>
                                    </th>
                                    {!get(params, 'buyer') && (
                                        <th>
                                            <span className="flex items-center">
                                                {trans('Buyer')}{' '}
                                                <SortIcon className="ml-1 cursor-pointer" />
                                            </span>
                                        </th>
                                    )}
                                    {!get(params, 'supplier') && (
                                        <th>
                                            <span className="flex items-center">
                                                {trans('Supplier')}{' '}
                                                <SortIcon className="ml-1 cursor-pointer" />
                                            </span>
                                        </th>
                                    )}
                                    <th style={{ width: '10%' }}>
                                        <span className="flex items-center">
                                            {trans('Method')}{' '}
                                            <SortIcon className="ml-1 cursor-pointer" />
                                        </span>
                                    </th>
                                    <th style={{ width: '20%' }}>
                                        <span className="flex items-center">
                                            {trans('Product Category')}{' '}
                                            <SortIcon className="ml-1 cursor-pointer" />
                                        </span>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <span className="flex items-center">
                                            {trans('Date')}{' '}
                                            <SortIcon className="ml-1 cursor-pointer" />
                                        </span>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <span className="flex items-center">
                                            {trans('Value (USD)')}{' '}
                                            <SortIcon className="ml-1 cursor-pointer" />
                                        </span>
                                    </th>
                                    <th />
                                </tr>
                            </thead>

                            {homepage ? (
                                <tbody>
                                    {tenderList &&
                                        tenderList
                                            .slice(0, 10)
                                            .map((tender, index) => {
                                                return (
                                                    <tr
                                                        key={index}
                                                        onClick={() =>
                                                            showDetail(
                                                                tender.id
                                                            )
                                                        }
                                                        className={tableRowClass(
                                                            tender.red_flag
                                                        )}>
                                                        <td className="uppercase">
                                                            {
                                                                tender.contract_title
                                                            }
                                                        </td>
                                                        {!get(
                                                            params,
                                                            'buyer'
                                                        ) && (
                                                            <td className="uppercase">
                                                                {get(
                                                                    tender,
                                                                    'buyer.buyer_name'
                                                                )}
                                                            </td>
                                                        )}
                                                        {!get(
                                                            params,
                                                            'supplier'
                                                        ) && (
                                                            <td className="uppercase">
                                                                {get(
                                                                    tender,
                                                                    'supplier.supplier_name'
                                                                )}
                                                            </td>
                                                        )}
                                                        <td className="capitalize">
                                                            {
                                                                tender.procurement_procedure
                                                            }
                                                        </td>
                                                        <td>
                                                            {get(
                                                                tender,
                                                                'product.product_name'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatDate(
                                                                tender.contract_date
                                                            )}
                                                        </td>
                                                        <td>
                                                            {tender.contract_value_usd &&
                                                                tender.contract_value_usd.toLocaleString(
                                                                    'en'
                                                                )}
                                                        </td>
                                                        <td>
                                                            {tender.red_flag && (
                                                                <span className="mr-4">
                                                                    <FlagIcon />
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                </tbody>
                            ) : (
                                <tbody>
                                    {tenderList &&
                                        tenderList.map((tender, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    onClick={() =>
                                                        showDetail(tender.id)
                                                    }
                                                    className={tableRowClass(
                                                        tender.red_flag
                                                    )}>
                                                    <td className="uppercase">
                                                        {tender.contract_title}
                                                    </td>
                                                    {!get(params, 'buyer') && (
                                                        <td className="uppercase">
                                                            {get(
                                                                tender,
                                                                'buyer.buyer_name'
                                                            )}
                                                        </td>
                                                    )}
                                                    {!get(
                                                        params,
                                                        'supplier'
                                                    ) && (
                                                        <td className="uppercase">
                                                            {get(
                                                                tender,
                                                                'supplier.supplier_name'
                                                            )}
                                                        </td>
                                                    )}
                                                    <td className="capitalize">
                                                        {
                                                            tender.procurement_procedure
                                                        }
                                                    </td>
                                                    <td>
                                                        {get(
                                                            tender,
                                                            'product.product_name'
                                                        )}
                                                    </td>
                                                    <td>
                                                        {formatDate(
                                                            tender.contract_date
                                                        )}
                                                    </td>
                                                    <td>
                                                        {tender.contract_value_usd &&
                                                            tender.contract_value_usd.toLocaleString(
                                                                'en'
                                                            )}
                                                    </td>
                                                    <td>
                                                        {tender.red_flag && (
                                                            <span className="mr-4">
                                                                <FlagIcon />
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            )}
                        </table>
                    </div>

                    {homepage ? (
                        <div className="text-center my-8">
                            <Link
                                to="/global-overview/contracts"
                                className="text-primary-blue">
                                View all
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center mt-8">
                            <button
                                className="text-primary-blue"
                                onClick={LoadContractList}>
                                Load more
                            </button>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    )
}

export default TenderTable
