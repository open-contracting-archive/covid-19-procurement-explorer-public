import React, { Fragment, useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { get, has, identity, pickBy } from 'lodash'
import ReactPaginate from 'react-paginate'
import ContractService from '../../services/ContractService'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { formatDate } from '../../helpers/date'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'

const TenderTable = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const countries = useSelector((state) => state.general.countries)
    const contractMethods = useSelector(
        (state) => state.general.contractMethods
    )
    const productCategories = useSelector(
        (state) => state.general.productCategories
    )
    const [tenderList, setTenderList] = useState([])
    const [pagination, setPagination] = useState('')
    const [loading, setLoading] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState(() =>
        identity(pickBy(params))
    )
    const [contractTitleParameter, setContractTitleParameter] = useState('')
    const [limit, setLimit] = useState(20)
    const [totalItems, setTotalItems] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [tableLoading, setTableLoading] = useState(false)

    const countrySelectList = useMemo(() => {
        return [
            { label: 'All ', value: '' },
            ...countries
                .filter((country) => country.name !== 'Global')
                .map((country) => {
                    return {
                        label: country.name,
                        value: country.country_code_alpha_2
                    }
                })
                .sort((a, b) => {
                    return a.label < b.label ? -1 : 0
                })
        ]
    }, [countries])
    const contractMethodSelectList = useMemo(() => {
        return [{ label: 'All', value: '' }, ...contractMethods]
    }, [contractMethods])
    const productSelectList = useMemo(() => {
        return [
            { label: 'All', value: '' },
            ...productCategories
                .map((productCategory) => {
                    return {
                        label: productCategory.name,
                        value: productCategory.id
                    }
                })
                .sort((a, b) => {
                    return a.label < b.label ? -1 : 0
                })
        ]
    }, [productCategories])
    const valueRanges = useMemo(() => {
        return [
            { label: 'All', value: '' },
            ...[
                { sign: 'lt', value: 1000 },
                { sign: 'gt', value: 1000 },
                { sign: 'gt', value: 10000 },
                { sign: 'gt', value: 100000 },
                { sign: 'gt', value: 1000000 },
                { sign: 'gt', value: 100000000 }
            ].map((item) => {
                return {
                    value: item,
                    label: `${
                        item.sign === 'gt' ? '>' : '<'
                    } ${item.value.toLocaleString()}`
                }
            })
        ]
    }, [])

    const [buyersFilterOption, setBuyersFilterOption] = useState([])
    const [suppliersFilterOption, setSuppliersFilterOption] = useState([])
    const { trans } = useTrans()
    const history = useHistory()
    let { countrySlug } = useParams()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        LoadContractList()
    }, [selectedFilters])

    useEffect(() => {
        if (countrySlug && countrySlug != 'global') {
            getBuyersFilterParameter({
                country: params.country
            })
            getSuppliersFilterParameter({
                country: params.country
            })
        }
    }, [params])

    // ===========================================================================
    // Helpers and functions
    // ===========================================================================
    const showDetail = (id) => {
        history.push(`/contracts/${id}`)
    }
    const LoadContractList = (page) => {
        setTableLoading(true)
        setCurrentPage(get(page, 'selected') || 0)
        ContractService.ContractList({
            ...selectedFilters,
            limit: limit,
            offset: page && page.selected * limit
        }).then((response) => {
            if (response) {
                setTenderList([...response.results])
                setPagination(response.next)
                setTotalItems(response.count)
                setTableLoading(false)
            }
            setLoading(false)
        })
    }
    const hasCountry = () => {
        return (
            has(params, 'country') &&
            params.country !== undefined &&
            params.country !== null &&
            params.country !== ''
        )
    }
    const hasBuyer = () => {
        return (
            has(params, 'buyer') &&
            params.buyer !== undefined &&
            params.buyer !== null &&
            params.buyer !== ''
        )
    }
    const hasSupplier = () => {
        return (
            has(params, 'supplier') &&
            params.supplier !== undefined &&
            params.supplier !== null &&
            params.supplier !== ''
        )
    }
    const hasProduct = () => {
        return (
            has(params, 'product') &&
            params.product !== undefined &&
            params.product !== null &&
            params.product !== ''
        )
    }
    const tableRowClass = (hasRedFlags) => {
        return hasRedFlags
            ? 'table-row has-red-flag cursor-pointer'
            : 'table-row cursor-pointer'
    }
    const appendFilter = (selected) => {
        setLoading(true)
        setSelectedFilters((previous) => {
            return {
                ...previous,
                ...selected
            }
        })
    }
    const getBuyersFilterParameter = (params) => {
        ContractService.FilterBuyersParameter(params).then((response) => {
            const options = response.map((buyer) => {
                return {
                    label: buyer.name,
                    value: buyer.id
                }
            })
            setBuyersFilterOption(options)
        })
    }
    const getSuppliersFilterParameter = (params) => {
        ContractService.FilterSuppliersParameter(params).then((response) => {
            const options = response.map((supplier) => {
                return {
                    label: supplier.name,
                    value: supplier.id
                }
            })
            setSuppliersFilterOption(options)
        })
    }
    const handleCountryFilter = (country) => {
        getBuyersFilterParameter({ country })
        getSuppliersFilterParameter({ country })
        appendFilter({ country, buyer: '', supplier: '' })
    }
    const handleInputSubmit = (event, contractTitle) => {
        event.preventDefault()
        appendFilter({ title: contractTitle })
    }

    // console.log(currentPage)

    return (
        <div>
            <Fragment>
                <div className="mb-12 flex gap-8 justify-between">
                    <div className="w-40">
                        <p className="uppercase text-xs opacity-50 leading-none">
                            Contract title
                        </p>
                        <form
                            className="mt-2 select-filter--input"
                            onSubmit={(event) =>
                                handleInputSubmit(event, contractTitleParameter)
                            }>
                            <input
                                type="text"
                                className="select-filter"
                                placeholder="Enter contract name"
                                value={contractTitleParameter}
                                onChange={(e) =>
                                    setContractTitleParameter(e.target.value)
                                }
                            />
                        </form>
                    </div>

                    {!hasCountry() && (
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                {trans('Country')}
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={countrySelectList}
                                onChange={(selectedOption) =>
                                    handleCountryFilter(selectedOption.value)
                                }
                            />
                        </div>
                    )}
                    {!hasBuyer() && (
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Buyer
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={buyersFilterOption}
                                onChange={(selectedOption) =>
                                    appendFilter({
                                        buyer: selectedOption.value
                                    })
                                }
                            />
                        </div>
                    )}
                    {!hasSupplier() && (
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Supplier
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={suppliersFilterOption}
                                onChange={(selectedOption) =>
                                    appendFilter({
                                        supplier: selectedOption.value
                                    })
                                }
                            />
                        </div>
                    )}
                    <div className="w-40">
                        <p className="uppercase text-xs opacity-50 leading-none">
                            Method
                        </p>
                        <Select
                            className="select-filter text-sm"
                            classNamePrefix="select-filter"
                            options={contractMethodSelectList}
                            onChange={(selectedOption) =>
                                appendFilter({
                                    procurement_procedure: selectedOption.value
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
                            options={productSelectList}
                            onChange={(selectedOption) =>
                                appendFilter({
                                    product_id: selectedOption.value
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
                            options={valueRanges}
                            onChange={(selectedOption) =>
                                appendFilter({
                                    contract_value_usd:
                                        selectedOption.value.value,
                                    value_comparison: selectedOption.value.sign
                                })
                            }
                        />
                    </div>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="relative">
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
                                            {!hasCountry() && (
                                                <th style={{ width: '10%' }}>
                                                    <span className="flex items-center">
                                                        {trans('Country')}{' '}
                                                        <SortIcon className="ml-1 cursor-pointer" />
                                                    </span>
                                                </th>
                                            )}
                                            {!hasBuyer() && (
                                                <th style={{ width: '15%' }}>
                                                    <span className="flex items-center">
                                                        {trans('Buyer')}{' '}
                                                        <SortIcon className="ml-1 cursor-pointer" />
                                                    </span>
                                                </th>
                                            )}
                                            {!hasSupplier() && (
                                                <th style={{ width: '15%' }}>
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
                                            <th style={{ width: '15%' }}>
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
                                                        <td>
                                                            {
                                                                tender.contract_title
                                                            }
                                                        </td>
                                                        {!hasCountry() && (
                                                            <td>
                                                                {
                                                                    tender.country_name
                                                                }
                                                            </td>
                                                        )}
                                                        {!hasBuyer() && (
                                                            <td>
                                                                {get(
                                                                    tender,
                                                                    'buyer.buyer_name'
                                                                )}
                                                            </td>
                                                        )}
                                                        {!hasSupplier() && (
                                                            <td>
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
                                                        {!hasProduct() && (
                                                            <td>
                                                                {get(
                                                                    tender,
                                                                    'product_category'
                                                                )}
                                                            </td>
                                                        )}
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
                                </table>

                                {!tenderList.length && (
                                    <div
                                        className="flex items-center justify-center bg-white rounded-md"
                                        style={{
                                            height: '75%',
                                            minHeight: '250px'
                                        }}>
                                        <p>No data available</p>
                                    </div>
                                )}
                            </div>
                            {tableLoading && (
                                <div
                                    style={{ height: 'calc(100% - 46px)' }}
                                    className="absolute bottom-0 left-0 w-full rounded-md bg-opacity-50 bg-primary-dark text-lg font-bold flex items-center justify-center text-white">
                                    Loading...
                                </div>
                            )}
                        </div>
                        {tenderList.length > 0 && (
                            <div>
                                <div className="text-right mt-2 text-sm">
                                    <p className="text-primary-dark text-opacity-50">
                                        Showing{' '}
                                        <span className="text-primary-dark text-opacity-75">
                                            {1 + currentPage * limit}
                                        </span>{' '}
                                        -{' '}
                                        <span className="text-primary-dark text-opacity-75">
                                            {limit + currentPage * limit >
                                            totalItems
                                                ? totalItems
                                                : limit + currentPage * limit}
                                        </span>{' '}
                                        of{' '}
                                        <span className="text-primary-dark text-opacity-75">
                                            {totalItems}
                                        </span>{' '}
                                        rows
                                    </p>
                                </div>

                                <div className="pagination-container">
                                    <ReactPaginate
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={totalItems / limit}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={10}
                                        onPageChange={LoadContractList}
                                        containerClassName={'pagination-items'}
                                        pageClassName={'pagination-item'}
                                        previousClassName={
                                            'pagination-item prev'
                                        }
                                        nextClassName={'pagination-item next'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Fragment>
        </div>
    )
}

export default TenderTable
