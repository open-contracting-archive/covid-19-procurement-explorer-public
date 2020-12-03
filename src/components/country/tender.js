import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import CountryProfileServices from '../../services/countryProfileServices'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'
import Select from 'react-select'
import Loader from '../loader/Loader'

const Tender = () => {
    // const [tenderData, setTenderData] = useState({})
    const [tenderList, setTenderList] = useState([])
    const [pagination, setPagination] = useState('')
    const [loading, setLoading] = useState(false)

    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    // const filterStyle = {
    //     control: () => ({
    //         backgroundColor: 'none',
    //         border: 'none',
    //         borderBottom: '2px solid #1fbbec',
    //         borderRadius: 0
    //     })
    // }
    let { slug } = useParams()

    useEffect(() => {
        CountryProfileServices.CountryProfileTenderData(slug).then((response) => {
            if (response) {
                // setTenderData(response)
                setTenderList(response.results)
                setPagination(response.next)
            }
            setLoading(true)
        })
    }, [slug])

    const LoadMoreTenderData = () => {
        CountryProfileServices.LoadMoreTenderData(pagination).then(
            (response) => {
                if (response) {
                    // setTenderData(tenderData, ...response)
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
                                <th style={{ width: '35%' }}>
                                    <span className="flex items-center">
                                        Project Title{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '20%' }}>
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
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        Status{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        Value (USD){' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenderList &&
                                tenderList.map((tender, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={`/country/${slug}/tender/${tender.id}`}
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
                                                {tender.supplier.supplier_name}
                                            </td>
                                            <td className="capitalize">
                                                <span
                                                    className={`status-indicator ${tender.status}`}></span>
                                                {tender.status}
                                            </td>
                                            <td>
                                                {tender.contract_value_usd.toLocaleString(
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
                            className="text-primary-blue"
                            onClick={LoadMoreTenderData}>
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

export default Tender
