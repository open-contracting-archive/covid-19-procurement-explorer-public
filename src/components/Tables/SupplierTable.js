import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { identity, get, pickBy } from 'lodash'
import ReactPaginate from 'react-paginate'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import TableLoader from '../Loader/TableLoader'
import useContractFilters from '../../hooks/useContractFilters'
import { hasValidProperty } from '../../helpers/general'
import { ReactComponent as FilterIcon } from '../../assets/img/icons/ic_filter.svg'
import { ReactComponent as FilterCloseIcon } from '../../assets/img/icons/ic_filter-close.svg'
import Default from '../../constants/Default'
import { formatDecimal } from '../../helpers/number'
import useTableSorting from '../../hooks/useTableSorting'
// import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'

const SupplierTable = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const [originalData, setOriginalData] = useState([])
    const [selectedFilters, setSelectedFilters] = useState(() =>
        identity(pickBy(params))
    )
    const [suppliersNameParameter, setSuppliersNameParameter] = useState('')
    const [loading, setLoading] = useState(true)
    const [limit] = useState(20)
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [tableLoading, setTableLoading] = useState(false)
    const {
        countrySelectList,
        productSelectList,
        valueRanges
    } = useContractFilters()
    const history = useHistory()
    const { trans } = useTrans()
    const [showFilter, setShowFilter] = useState('hidden')
    const { sortedItems, sorting, tableHeaderSpan } = useTableSorting({
        items: originalData,
        defaultSorting: {
            column: 'supplier_name',
            direction: ''
        },
        sortTableData: false
    })

    useEffect(() => {
        LoadSuppliersList()

        return () => {
            setOriginalData([])
        }
    }, [selectedFilters, sorting])

    // ===========================================================================
    // Helpers and functions
    // ===========================================================================
    const hasCountry = () => {
        return hasValidProperty(params, 'country')
    }

    const tableRowClass = (redFlagCount) => {
        return redFlagCount
            ? 'table-row has-red-flag cursor-pointer'
            : 'table-row cursor-pointer'
    }

    const LoadSuppliersList = (page) => {
        setTableLoading(true)
        setCurrentPage(get(page, 'selected', 0))
        VisualizationService.SupplierTableList({
            ...selectedFilters,
            order: sorting.direction + sorting.column,
            limit: limit,
            offset: page && page.selected * limit
        }).then((response) => {
            if (response) {
                setOriginalData([...response.results])
                setTotalItems(response.count)
                setTableLoading(false)
            }
            setLoading(false)
        })
    }

    const appendFilter = (selected) => {
        setTableLoading(true)
        setSelectedFilters((previous) => {
            return {
                ...previous,
                ...selected
            }
        })
    }

    const showDetail = (id) => {
        let path = `/suppliers/${id}`
        history.push(path)
    }

    const handleInputSubmit = (event, parameter) => {
        event.preventDefault()
        appendFilter({ supplier_name: parameter })
    }

    const handleFilterToggle = () => {
        setShowFilter(showFilter === 'hidden' ? 'block' : 'hidden')
    }

    const handleCloseFilter = () => {
        setShowFilter('hidden')
    }

    return loading ? (
        <Loader />
    ) : (
        <div className="relative">
            <div
                className="cursor-pointer md:hidden"
                onClick={handleFilterToggle}>
                <div className="filter-ui">
                    <FilterIcon />
                </div>
            </div>

            {showFilter ? (
                <div
                    className={`bg-primary-blue absolute top-0 filter-ui-content z-20 p-4 mr-10 ${showFilter}`}>
                    <div className="flex justify-between mb-4 text-white md:mb-0">
                        <span className="text-sm font-bold uppercase">
                            Filter
                        </span>
                        <span
                            className="text-sm font-bold uppercase cursor-pointer filter-close"
                            onClick={handleCloseFilter}>
                            <FilterCloseIcon />
                        </span>
                    </div>
                    <div className="flex flex-wrap -mx-2 -mb-5">
                        <div className="w-1/2 px-2 mb-5 md:w-40">
                            <p className="text-xs leading-none text-white uppercase opacity-50 md:text-primary-dark">
                                {trans('Suppliers')}
                            </p>
                            <form
                                className="mt-2 select-filter--input"
                                onSubmit={(event) =>
                                    handleInputSubmit(
                                        event,
                                        suppliersNameParameter
                                    )
                                }>
                                <input
                                    type="text"
                                    className="select-filter"
                                    placeholder="Enter contract name"
                                    value={suppliersNameParameter}
                                    onChange={(e) =>
                                        setSuppliersNameParameter(
                                            e.target.value
                                        )
                                    }
                                />
                            </form>
                        </div>
                        {!hasCountry() && (
                            <div className="w-1/2 px-2 mb-5 md:w-40">
                                <p className="text-xs leading-none text-white uppercase opacity-50 md:text-primary-dark">
                                    {trans('Country')}
                                </p>
                                <Select
                                    className="mt-2 text-sm select-filter"
                                    classNamePrefix="select-filter"
                                    options={countrySelectList}
                                    onChange={(selectedOption) =>
                                        appendFilter({
                                            country: selectedOption.value
                                        })
                                    }
                                />
                            </div>
                        )}
                        <div className="w-1/2 px-2 mb-5 md:w-40">
                            <p className="text-xs leading-none text-white uppercase opacity-50 md:text-primary-dark">
                                {trans('Product category')}
                            </p>
                            <Select
                                className="mt-2 text-sm select-filter"
                                classNamePrefix="select-filter"
                                options={productSelectList}
                                onChange={(selectedOption) =>
                                    appendFilter({
                                        product: selectedOption.value
                                    })
                                }
                            />
                        </div>

                        <div className="w-1/2 px-2 mb-5 md:w-40">
                            <p className="text-xs leading-none text-white uppercase opacity-50 md:text-primary-dark">
                                {trans('Value range')}
                            </p>
                            <Select
                                className="mt-2 text-sm select-filter"
                                classNamePrefix="select-filter"
                                options={valueRanges}
                                onChange={(selectedOption) =>
                                    appendFilter({
                                        contract_value_usd:
                                            selectedOption.value.value,
                                        value_comparison:
                                            selectedOption.value.sign
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}

            <div className="flex flex-wrap items-center justify-end mb-6 md:justify-between md:mb-12">
                <div className="hidden gap-8 md:flex">
                    <div className="w-40">
                        <p className="text-xs leading-none uppercase opacity-50">
                            {trans('Suppliers')}
                        </p>
                        <form
                            className="mt-2 select-filter--input"
                            onSubmit={(event) =>
                                handleInputSubmit(event, suppliersNameParameter)
                            }>
                            <input
                                type="text"
                                className="select-filter"
                                placeholder="Enter contract name"
                                value={suppliersNameParameter}
                                onChange={(e) =>
                                    setSuppliersNameParameter(e.target.value)
                                }
                            />
                        </form>
                    </div>
                    {!hasCountry() && (
                        <div className="w-40">
                            <p className="text-xs leading-none uppercase opacity-50">
                                {trans('Country')}
                            </p>
                            <Select
                                className="mt-2 text-sm select-filter"
                                classNamePrefix="select-filter"
                                options={countrySelectList}
                                onChange={(selectedOption) =>
                                    appendFilter({
                                        country: selectedOption.value
                                    })
                                }
                            />
                        </div>
                    )}
                    <div className="w-40">
                        <p className="text-xs leading-none uppercase opacity-50">
                            {trans('Product category')}
                        </p>
                        <Select
                            className="mt-2 text-sm select-filter"
                            classNamePrefix="select-filter"
                            options={productSelectList}
                            onChange={(selectedOption) =>
                                appendFilter({
                                    product: selectedOption.value
                                })
                            }
                        />
                    </div>

                    <div className="w-40">
                        <p className="text-xs leading-none uppercase opacity-50">
                            {trans('Value range')}
                        </p>
                        <Select
                            className="mt-2 text-sm select-filter"
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

                {/*<div>*/}
                {/*    <div className="flex items-center mt-4 text-sm text-primary-blue">*/}
                {/*        <DownloadIcon className="inline-block mr-2" />*/}
                {/*        <span>{trans('Download')}</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            <div className="relative overflow-hidden">
                <div className="custom-scrollbar table-scroll">
                    <table className="table">
                        <thead>
                            <tr className="whitespace-no-wrap">
                                <th style={{ width: '20%' }}>
                                    {tableHeaderSpan(
                                        'supplier_name',
                                        `${trans('Supplier')}`
                                    )}
                                </th>
                                <th style={{ width: '10%' }}>
                                    {tableHeaderSpan(
                                        'country_name',
                                        `${trans('Country')}`
                                    )}
                                </th>
                                <th style={{ width: '6%' }}>
                                    {tableHeaderSpan(
                                        'tender_count',
                                        `${trans('# of contracts')}`
                                    )}
                                </th>
                                <th style={{ width: '6%' }}>
                                    {tableHeaderSpan(
                                        'buyer_count',
                                        `${trans('# of buyers')}`
                                    )}
                                </th>
                                <th style={{ width: '10%' }}>
                                    {tableHeaderSpan(
                                        'product_category_count',
                                        `${trans('product categories')}`
                                    )}
                                </th>
                                <th style={{ width: '10%' }}>
                                    {tableHeaderSpan(
                                        'amount_usd',
                                        `${trans('value (usd)')}`
                                    )}
                                </th>
                                <th style={{ width: '8%' }}>
                                    {tableHeaderSpan(
                                        'red_flag_tender_percentage',
                                        `${trans('% red flags')}`
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedItems.map((supplier, index) => {
                                return (
                                    <tr
                                        key={index}
                                        onClick={() =>
                                            showDetail(supplier.supplier_id)
                                        }
                                        className={tableRowClass(
                                            supplier.red_flag_tender_count
                                        )}>
                                        <td className="hover:text-primary-blue">
                                            <p
                                                className="truncate-text"
                                                title={get(
                                                    supplier,
                                                    'supplier_name'
                                                )}>
                                                {get(supplier, 'supplier_name')}
                                            </p>
                                        </td>
                                        <td>
                                            {get(supplier, 'country_name', '-')}
                                        </td>
                                        <td>
                                            {get(
                                                supplier,
                                                Default.TENDER_COUNT
                                            )}
                                        </td>
                                        <td>
                                            {get(supplier, 'buyer_count', 0)}
                                        </td>
                                        <td>
                                            {get(
                                                supplier,
                                                'product_category_count',
                                                0
                                            )}
                                        </td>
                                        <td>
                                            {supplier[Default.AMOUNT_USD] &&
                                                supplier[
                                                    Default.AMOUNT_USD
                                                ].toLocaleString('en')}
                                        </td>
                                        <td className="text-center">
                                            {formatDecimal(
                                                get(
                                                    supplier,
                                                    'red_flag_tender_percentage',
                                                    0
                                                )
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {!originalData.length && (
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
                {tableLoading && <TableLoader />}
            </div>

            <div>
                <div className="mt-2 text-sm text-right">
                    <p className="text-opacity-50 text-primary-dark">
                        Showing{' '}
                        <span className="text-opacity-75 text-primary-dark">
                            {1 + currentPage * limit}
                        </span>{' '}
                        -{' '}
                        <span className="text-opacity-75 text-primary-dark">
                            {limit + currentPage * limit > totalItems
                                ? totalItems
                                : limit + currentPage * limit}
                        </span>{' '}
                        of{' '}
                        <span className="text-opacity-75 text-primary-dark">
                            {totalItems}
                        </span>{' '}
                        suppliers.
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
                        onPageChange={LoadSuppliersList}
                        containerClassName={'pagination-items'}
                        pageClassName={'pagination-item'}
                        previousClassName={'pagination-item prev'}
                        nextClassName={'pagination-item next'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    )
}

export default SupplierTable
