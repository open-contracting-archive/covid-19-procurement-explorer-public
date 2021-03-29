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
    const [sorting, setSorting] = useState(() => {
        return { column: 'supplier_name', direction: '' }
    })

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

    const appendSort = (columnName) => {
        setSorting((previous) => {
            if (previous.column === columnName) {
                return {
                    ...previous,
                    direction: previous.direction === '-' ? '' : '-'
                }
            }
            return {
                column: columnName,
                direction: ''
            }
        })
    }

    const columnSorting = (columnName) => {
        return (
            <span className="icon-sort">
                <span
                    className={`icon-sort-arrow-up ${
                        sorting.column === columnName &&
                        sorting.direction === '' &&
                        'active'
                    }`}
                />
                <span
                    className={`icon-sort-arrow-down ${
                        sorting.column === columnName &&
                        sorting.direction === '-' &&
                        'active'
                    }`}
                />
            </span>
        )
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
                className="md:hidden cursor-pointer"
                onClick={handleFilterToggle}>
                <div className="filter-ui">
                    <FilterIcon />
                </div>
            </div>

            {showFilter ? (
                <div
                    className={`bg-primary-blue absolute top-0 filter-ui-content z-20 p-4 mr-10 ${showFilter}`}>
                    <div className="flex justify-between text-white mb-4 md:mb-0">
                        <span className="text-sm uppercase font-bold">
                            Filter
                        </span>
                        <span
                            className="filter-close text-sm uppercase font-bold cursor-pointer"
                            onClick={handleCloseFilter}>
                            <FilterCloseIcon />
                        </span>
                    </div>
                    <div className="flex -mx-2 -mb-5 flex-wrap">
                        <div className="w-1/2 md:w-40 px-2 mb-5">
                            <p className="text-white md:text-primary-dark uppercase text-xs opacity-50 leading-none">
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
                            <div className="w-1/2 md:w-40 px-2 mb-5">
                                <p className="text-white md:text-primary-dark uppercase text-xs opacity-50 leading-none">
                                    {trans('Country')}
                                </p>
                                <Select
                                    className="mt-2 select-filter text-sm"
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
                        <div className="w-1/2 md:w-40 px-2 mb-5">
                            <p className="text-white md:text-primary-dark uppercase text-xs opacity-50 leading-none">
                                {trans('Product category')}
                            </p>
                            <Select
                                className="mt-2 select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={productSelectList}
                                onChange={(selectedOption) =>
                                    appendFilter({
                                        product: selectedOption.value
                                    })
                                }
                            />
                        </div>

                        <div className="w-1/2 md:w-40 px-2 mb-5">
                            <p className="text-white md:text-primary-dark uppercase text-xs opacity-50 leading-none">
                                {trans('Value range')}
                            </p>
                            <Select
                                className="mt-2 select-filter text-sm"
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

            <div className="flex flex-wrap items-center justify-end md:justify-between mb-6 md:mb-12">
                <div className="hidden md:flex gap-8">
                    <div className="w-40">
                        <p className="uppercase text-xs opacity-50 leading-none">
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
                            <p className="uppercase text-xs opacity-50 leading-none">
                                {trans('Country')}
                            </p>
                            <Select
                                className="mt-2 select-filter text-sm"
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
                        <p className="uppercase text-xs opacity-50 leading-none">
                            {trans('Product category')}
                        </p>
                        <Select
                            className="mt-2 select-filter text-sm"
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
                        <p className="uppercase text-xs opacity-50 leading-none">
                            {trans('Value range')}
                        </p>
                        <Select
                            className="mt-2 select-filter text-sm"
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
                {/*    <div className=" mt-4 text-primary-blue flex items-center text-sm">*/}
                {/*        <DownloadIcon className="mr-2 inline-block" />*/}
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
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('supplier_name')
                                        }>
                                        {trans('Supplier')}
                                        {columnSorting('supplier_name')}
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('country_name')
                                        }>
                                        {trans('Country')}
                                        {columnSorting('country_name')}
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('tender_count')
                                        }>
                                        {trans('# of contracts')}
                                        {columnSorting('tender_count')}
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('buyer_count')
                                        }>
                                        {trans('# of buyers')}
                                        {columnSorting('buyer_count')}
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('product_category_count')
                                        }>
                                        {trans('product categories')}
                                        {columnSorting(
                                            'product_category_count'
                                        )}
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('amount_usd')
                                        }>
                                        {trans('value (usd)')}
                                        {columnSorting('amount_usd')}
                                    </span>
                                </th>
                                <th style={{ width: '8%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort(
                                                'red_flag_tender_percentage'
                                            )
                                        }>
                                        {trans('% red flags')}
                                        {columnSorting(
                                            'red_flag_tender_percentage'
                                        )}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {originalData &&
                                originalData.map((supplier, index) => {
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
                                                    {get(
                                                        supplier,
                                                        'supplier_name'
                                                    )}
                                                </p>
                                            </td>
                                            <td>
                                                {get(
                                                    supplier,
                                                    'country_name',
                                                    '-'
                                                )}
                                            </td>
                                            <td>
                                                {get(
                                                    supplier,
                                                    Default.TENDER_COUNT
                                                )}
                                            </td>
                                            <td>
                                                {get(
                                                    supplier,
                                                    'buyer_count',
                                                    0
                                                )}
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
                <div className="text-right mt-2 text-sm">
                    <p className="text-primary-dark text-opacity-50">
                        Showing{' '}
                        <span className="text-primary-dark text-opacity-75">
                            {1 + currentPage * limit}
                        </span>{' '}
                        -{' '}
                        <span className="text-primary-dark text-opacity-75">
                            {limit + currentPage * limit > totalItems
                                ? totalItems
                                : limit + currentPage * limit}
                        </span>{' '}
                        of{' '}
                        <span className="text-primary-dark text-opacity-75">
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
