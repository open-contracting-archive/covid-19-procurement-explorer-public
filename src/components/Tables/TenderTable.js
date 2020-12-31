import React, { Fragment, useState, useEffect } from "react"
import Select from 'react-select'
import { get, pickBy, identity } from 'lodash'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as SortIcon } from "../../assets/img/icons/ic_sort.svg";
import CountryProfileServices from "../../services/countryProfileServices";
import { ReactComponent as FlagIcon } from "../../assets/img/icons/ic_flag.svg";
import Loader from "../Loader/Loader";
import VisualizationServices from "../../services/visualizationServices";

function TenderTable(params) {
    const options = [
        {value: 'option-1', label: 'Option 1'},
        {value: 'option-2', label: 'Option 2'},
        {value: 'option-3', label: 'Option 3'}
    ]
    const [tenderList, setTenderList] = useState([])
    const [pagination, setPagination] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        VisualizationServices.TenderList(identity(pickBy(params)))
            .then(
                (response) => {
                    if (response) {
                        setTenderList(response.results)
                        setPagination(response.next)
                    }
                    setLoading(true)
                }
            )
    }, [])

    const LoadMoreTenderData = () => {
        CountryProfileServices.LoadMoreTenderData(pagination)
            .then(
                (response) => {
                    if (response) {
                        setTenderList([...tenderList, ...response.results])
                        setPagination(response.next)
                    }
                }
            )
    }
    return (
        <div>
            {loading ? (
                <Fragment>
                    <div className="mb-12 flex gap-8 justify-between">
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Project title
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
                            <th style={{width: '35%'}}>
                        <span className="flex items-center">
                            Project Title{' '}
                            <SortIcon className="ml-1 cursor-pointer" />
                        </span>
                            </th>
                            <th style={{width: '20%'}}>
                        <span className="flex items-center">
                            Procurement Method{' '}
                            <SortIcon className="ml-1 cursor-pointer" />
                        </span>
                            </th>
                            <th>
                        <span className="flex items-center">
                            Supplier{' '}
                            <SortIcon className="ml-1 cursor-pointer" />
                        </span>
                            </th>
                            <th style={{width: '10%'}}>
                        <span className="flex items-center">
                            Status{' '}
                            <SortIcon className="ml-1 cursor-pointer" />
                        </span>
                            </th>
                            <th style={{width: '10%'}}>
                        <span className="flex items-center">
                            Value (USD){' '}
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
                                    className={`table-row ${
                                        tender.red_flag
                                            ? 'has-red-flag'
                                            : ''
                                    }`}>
                                    <td className="uppercase">
                                        {tender.contract_title}
                                    </td>
                                    <td>
                                        {tender.procurement_procedure}
                                    </td>
                                    <td className="uppercase">
                                        {get(
                                            tender,
                                            'supplier.supplier_name'
                                        )}
                                        {/* {tender.supplier &&
                                                    tender.supplier
                                                        .supplier_name} */}
                                    </td>
                                    <td className="capitalize">
                                                <span
                                                    className={`status-indicator ${tender.status}`}></span>
                                        {tender.status}
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
                                </Link>
                            )
                        })}
                        </tbody>
                    </table>
                    <div className="text-center mt-8">
                        <button
                            className="text-primary-blue">
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
