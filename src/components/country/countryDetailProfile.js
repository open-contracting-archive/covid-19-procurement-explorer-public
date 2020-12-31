import React from 'react'
import Select from 'react-select'
import 'react-accessible-accordion/dist/fancy-example.css'
import ContractsIndicator from '../ContractsIndicator/ContractsIndicator'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'

const CountryDetailProfile = ({ profileData }) => {
    const { trans } = useTrans()

    return (
        <div>
            <div className="w-full px-2 mb-12 global-profile">
                <ContractsIndicator />
            </div>

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
                <tr>
                    <td className="uppercase">
                        Global Contracts
                    </td>
                    <td>
                        Covid-19
                    </td>
                    <td className="uppercase">
                        YIPL
                    </td>
                    <td className="capitalize">
                        N/A
                    </td>
                    <td>
                        100
                    </td>
                    <td>
                        N/A
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="text-center mt-8">
                <button
                    className="text-primary-blue">
                    Load more
                </button>
            </div>

        </div>
    )
}

export default CountryDetailProfile
