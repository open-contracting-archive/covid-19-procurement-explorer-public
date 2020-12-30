import React, { Fragment, useState } from 'react'
import CountryProfileServices from '../../../../services/countryProfileServices'
import { Link } from 'react-router-dom'
import { ReactComponent as SortIcon } from '../../../../assets/img/icons/ic_sort.svg'
import { ReactComponent as FlagIcon } from '../../../..//assets/img/icons/ic_flag.svg'
import Select from 'react-select'
import newsImage from '../../../../assets/img/news.jpg'
import AreaChart from '../../../../components/charts/AreaChart/AreaChart'
import SimpleBarChart from '../../../../components/charts/SimpleBarChart/SimpleBarChart'

const barColorValue = '#ABBABF'

// Add Bar Chart data
const bar_chart_data = [
    {
        method: 'Open',
        value: 2025
    },
    {
        method: 'Limited',
        value: 1882
    },
    {
        method: 'Selective',
        value: 1809
    },
    {
        method: 'Direct',
        value: 1322
    }
]

// Add Area Chart data
const area_chart_data = [
    {
        month: 'FEB',
        value: 22324,
        expenses: 21.1
    },
    {
        month: 'MAR',
        value: 45990,
        expenses: 30.5
    },
    {
        month: 'APR',
        value: 10003,
        expenses: 34.9
    },
    {
        month: 'MAY',
        value: 77070,
        expenses: 23.1
    },
    {
        month: 'JUN',
        value: 23489,
        expenses: 28.2
    },
    {
        month: 'JUL',
        value: 58902,
        expenses: 31.9
    },
    {
        month: 'AUG',
        value: 29190,
        expenses: 31.9
    },
    {
        month: 'SEP',
        value: 45908,
        expenses: 31.9
    }
]

const GlobalSuppliers = () => {
    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    let tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const tempTableData = tempArray.map((index) => {
        return (
            <tr className="table-row" key={index}>
                <td className="uppercase">SERVICIOS DE LABORATORIO CLÍNICO</td>
                <td>Mexico</td>
                <td>21</td>
                <td>3</td>
                <td>5</td>
                <td>2,352,045</td>
                <td className="uppercase">1.2</td>
            </tr>
        )
    })

    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <div className="bg-white rounded p-4">
                        <h3 className="uppercase font-bold  text-primary-dark">
                            Suppliers
                        </h3>
                        <div className="flex items-end">
                            <div className=" text-primary-dark w-2/5">
                                <AreaChart data={area_chart_data} />
                                <p>
                                    <strong className="text-xl inline-block mr-3">
                                        21,800
                                    </strong>
                                </p>
                                <p className="text-sm text-red-30 font-bold">
                                    -11%
                                </p>
                            </div>
                            <div className="flex-1"></div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <div className="bg-white rounded p-4">
                        <h3 className="uppercase font-bold  text-primary-dark">
                            Total Spending
                        </h3>
                        <div className="flex items-end">
                            <div className=" text-primary-dark pb-4 w-2/5">
                                <AreaChart data={area_chart_data} />
                                <p>
                                    <strong className="text-xl inline-block mr-3">
                                        87M
                                    </strong>
                                    USD
                                </p>
                                <p className="text-sm text-green-30 font-bold">
                                    +8%
                                </p>
                            </div>
                            <div className="flex-1">
                                <SimpleBarChart
                                    data={bar_chart_data}
                                    barColorValue={barColorValue}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <div className="bg-white rounded p-4">
                        <h3 className="uppercase font-bold  text-primary-dark">
                            Total contracts
                        </h3>
                        <div className="flex items-end">
                            <div className=" text-primary-dark pb-4 w-2/5">
                                <AreaChart data={area_chart_data} />
                                <p>
                                    <strong className="text-xl inline-block mr-3">
                                        218
                                    </strong>
                                </p>
                                <p className="text-sm text-red-30 font-bold">
                                    -8%
                                </p>
                            </div>
                            <div className="flex-1">
                                <SimpleBarChart
                                    data={bar_chart_data}
                                    barColorValue={barColorValue}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-12 flex gap-8">
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        Suppliers
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
                        <th style={{ width: '10%' }}>
                            <span className="flex items-center">
                                # of contracts{' '}
                                <SortIcon className="ml-1 cursor-pointer" />
                            </span>
                        </th>
                        <th style={{ width: '10%' }}>
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
                <tbody>{tempTableData}</tbody>
            </table>
            <div className="text-center mt-8">
                <button className="text-primary-blue">Load more</button>
            </div>
        </div>
    )
}

export default GlobalSuppliers
