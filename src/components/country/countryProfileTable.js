import React, { useState } from 'react'
import { useEffect } from 'react'
import CountryProfileServices from '../../services/countryProfileServices'
import { useParams } from 'react-router-dom'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import Select from 'react-select'

const CountryProfileTable = () => {
    const [tenderData, setTenderData] = useState([])
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
    let { id } = useParams()

    useEffect(() => {
        CountryProfileServices.CountryProfileTenderData(id).then((response) => {
            if (response) {
                setTenderData(response)
            }
            setLoading(true)
        })
    }, [id])

    return (
        <div style={{ color: '#293E45' }}>
            {loading ? (
                <>
                    <div
                        style={{ color: '#293E45' }}
                        className="mb-12 flex gap-8 justify-between">
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
                                <th>
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
                                <th>
                                    <span className="flex items-center">
                                        Status{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th>
                                    <span className="flex items-center">
                                        Value (USD){' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenderData &&
                                tenderData.map((tender, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="uppercase">
                                                {tender.project_title}
                                            </td>
                                            <td>{tender.procurement_method}</td>
                                            <td className="uppercase">
                                                {tender.supplier_name}
                                            </td>
                                            <td className="capitalize">
                                                <span
                                                    className={`status-indicator ${tender.status}`}></span>
                                                {tender.status}
                                            </td>
                                            <td>
                                                {tender.value_usd.toLocaleString(
                                                    'en'
                                                )}
                                            </td>
                                            <td>
                                                {tender.red_flag && (
                                                    <span className="bg-gray-300 inline-block px-4 rounded-full text-orange-500 text-xs">
                                                        {tender.red_flag}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </>
            ) : (
                ''
            )}
        </div>
    )
}

export default CountryProfileTable
