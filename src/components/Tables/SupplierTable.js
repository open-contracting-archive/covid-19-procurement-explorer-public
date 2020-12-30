import React from "react"
import { ReactComponent as SortIcon } from "../../assets/img/icons/ic_sort.svg";
import Select from 'react-select'

function SupplierTable() {
    const options = [
        {value: 'option-1', label: 'Option 1'},
        {value: 'option-2', label: 'Option 2'},
        {value: 'option-3', label: 'Option 3'}
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
                    <th style={{width: '20%'}}>
                            <span className="flex items-center">
                                Buyer{' '}
                                <SortIcon className="ml-1 cursor-pointer" />
                            </span>
                    </th>
                    <th style={{width: '10%'}}>
                            <span className="flex items-center">
                                Country{' '}
                                <SortIcon className="ml-1 cursor-pointer" />
                            </span>
                    </th>
                    <th style={{width: '10%'}}>
                            <span className="flex items-center">
                                # of contracts{' '}
                                <SortIcon className="ml-1 cursor-pointer" />
                            </span>
                    </th>
                    <th style={{width: '10%'}}>
                            <span className="flex items-center">
                                # of suppliers{' '}
                                <SortIcon className="ml-1 cursor-pointer" />
                            </span>
                    </th>
                    <th style={{width: '10%'}}>
                            <span className="flex items-center">
                                product categories
                                <SortIcon className="ml-1 cursor-pointer" />
                            </span>
                    </th>
                    <th style={{width: '10%'}}>
                            <span className="flex items-center">
                                value (usd)
                                <SortIcon className="ml-1 cursor-pointer" />
                            </span>
                    </th>
                    <th style={{width: '10%'}}>
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

export default SupplierTable
