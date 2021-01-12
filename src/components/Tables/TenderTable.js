import React, { Fragment, useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { get, pickBy, identity } from 'lodash'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'
import Loader from '../Loader/Loader'
import VisualizationServices from '../../services/visualizationServices'
import useTrans from '../../hooks/useTrans'
import { formatDate } from '../../helpers/date'
import ContractServices from '../../services/ContractServices'

const options = [
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' }
]

const valueRange = [
    {
        value: {
            sign: 'lt',
            value: 1000
        },
        label: '< 1,000'
    },
    {
        value: {
            sign: 'gt',
            value: 1000
        },
        label: '> 1,000'
    },
    {
        value: {
            sign: 'lt',
            value: 10000
        },
        label: '< 10,000'
    },
    {
        value: {
            sign: 'gt',
            value: 10000
        },
        label: '> 10,000'
    },
    {
        value: {
            sign: 'lt',
            value: 100000
        },
        label: '< 100,000'
    },
    {
        value: {
            sign: 'gt',
            value: 100000
        },
        label: '> 100,000'
    },
    {
        value: {
            sign: 'lt',
            value: 1000000
        },
        label: '< 1,000,000'
    },
    {
        value: {
            sign: 'gt',
            value: 1000000
        },
        label: '> 1,000,000'
    },

    {
        value: {
            sign: 'lt',
            value: 100000000
        },
        label: '< 100,000,000'
    },
    {
        value: {
            sign: 'gt',
            value: 100000000
        },
        label: '> 100,000,000'
    }
]

function TenderTable({ homepage, params }) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const countries = useSelector((state) => state.general.countries)
    const [tenderList, setTenderList] = useState([])
    const [pagination, setPagination] = useState('')
    const [loading, setLoading] = useState(true)
    const [filterParameter, setFilterParameter] = useState({})
    const [filterOptions, setFilterOptions] = useState({})
    const [filterLoading, setFilterLoading] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})
    const [contractTitleParameter, setContractTitleParameter] = useState()
    const { trans } = useTrans()
    const history = useHistory()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        setSelectedFilters(identity(pickBy(params)))
    }, [params])

    // useEffect(() => {
    //     const data = countries.map((country) => {
    //         return {
    //             label: country.name,
    //             value: country.country_code_alpha_2
    //         }
    //     })
    //     setFilterOptions({ ...filterOptions, countries: data })
    // }, [countries])

    useEffect(() => {
        LoadContractList()
    }, [selectedFilters])

    // console.log(countries)

    useEffect(() => {
        const countryParameter = countries.map((country) => {
            return {
                label: country.name,
                value: country.country_code_alpha_2
            }
        })
        // console.log(countryParameter)

        ContractServices.FilterParameter().then((response) => {
            const data = response
            const productParameter =
                data.product &&
                data.product.map((product) => {
                    return {
                        label: product.name,
                        value: product.id
                    }
                })

            const methodParameter =
                data.contracts &&
                data.contracts.method.map((method) => {
                    return {
                        label: method.label,
                        value: method.value
                    }
                })
            setFilterOptions({
                ...filterOptions,
                products: productParameter,
                countries: countryParameter,
                methods: methodParameter
            })
        })
    }, [countries])
    // console.log(filterOptions)

    // ===========================================================================
    // Helpers and functions
    // ===========================================================================
    const showDetail = (id) => {
        let path = `/contracts/${id}`
        history.push(path)
    }

    const LoadContractList = () => {
        VisualizationServices.ContractList({
            ...selectedFilters
        }).then((response) => {
            if (response) {
                setTenderList([...response.results])
                setPagination(response.next)
                setFilterLoading(false)
            }
            setLoading(false)
        })
    }
    // console.log(selectedFilters)

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

    const handleFilter = (selected) => {
        setFilterLoading(true)
        // console.log(selected)
        setSelectedFilters((previous) => {
            return {
                ...previous,
                ...selected
            }
        })
    }

    const handleInputSubmit = (event, contractTitle) => {
        event.preventDefault()
        handleFilter({ title: contractTitle })
    }

    // console.log(dateRange)
    // console.log(selectedFilters)

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
                        {!hasCountry() ? (
                            <div className="w-40">
                                <p className="uppercase text-xs opacity-50 leading-none">
                                    Country
                                </p>
                                <Select
                                    className="select-filter text-sm"
                                    classNamePrefix="select-filter"
                                    options={filterOptions.countries}
                                    onChange={(selectedOption) =>
                                        handleFilter({
                                            country: selectedOption.value
                                        })
                                    }
                                />
                            </div>
                        ) : (
                            ''
                        )}

                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Contract title
                            </p>
                            <form
                                className="mt-2 select-filter--input"
                                onSubmit={(event) =>
                                    handleInputSubmit(
                                        event,
                                        contractTitleParameter
                                    )
                                }>
                                <input
                                    type="text"
                                    className="select-filter"
                                    placeholder="Enter contract name"
                                    value={contractTitleParameter}
                                    onChange={(e) =>
                                        setContractTitleParameter(
                                            e.target.value
                                        )
                                    }
                                />
                            </form>
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
                                options={filterOptions.methods}
                                onChange={(selectedOption) =>
                                    handleFilter({
                                        procurement_procedure:
                                            selectedOption.value
                                    })
                                }
                            />
                        </div>

                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none whitespace-no-wrap">
                                Product category
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={filterOptions.products}
                                onChange={(selectedOption) =>
                                    handleFilter({
                                        product: selectedOption.value
                                    })
                                }
                            />
                        </div>

                        {/* <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Data range
                            </p>
                            <div>
                                <div className="select-filter--input mt-2">
                                    <p className="field whitespace-no-wrap">
                                        {dateRange[0].startDate &&
                                        dateRange[0].endDate ? (
                                            `${formatDate(
                                                dateRange[0].startDate,
                                                'MMM YYYY'
                                            )} - ${formatDate(
                                                dateRange[0].endDate,
                                                'MMM YYYY'
                                            )}`
                                        ) : (
                                            <span className="opacity-50">
                                                Select date range
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div className="absolute z-10 shadow-lg">
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) =>
                                            setDateRange([item.selection])
                                        }
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                        startDatePlaceholder="Start date"
                                        endDatePlaceholder="End date"
                                    />
                                </div>
                            </div>
                        </div> */}
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Value range
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={valueRange}
                                // defaultValue={options[0]}
                                onChange={(selectedOption) =>
                                    handleFilter({
                                        contract_value_usd:
                                            selectedOption.value.value,
                                        value_comparison:
                                            selectedOption.value.sign
                                    })
                                }
                            />
                            {/* ?contract_value_usd=1200000&value_comparison=gt  */}
                        </div>
                    </div>
                    {filterLoading ? (
                        <Loader />
                    ) : (
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
                                                                'product_category'
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
                            {!tenderList.length && (
                                <div
                                    className="flex items-center justify-center bg-white rounded-md"
                                    style={{ height: '90%' }}>
                                    <p>No data available</p>
                                </div>
                            )}
                        </div>
                    )}

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
