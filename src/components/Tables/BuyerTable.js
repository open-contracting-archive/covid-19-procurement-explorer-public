import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { identity, pickBy, get } from 'lodash'
import ReactPaginate from 'react-paginate'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import TableLoader from '../Loader/TableLoader'
import useContractFilters from '../../hooks/useContractFilters'
import { hasValidProperty } from '../../helpers/general'
import { ReactComponent as FilterIcon } from '../../assets/img/icons/ic_filter.svg'
import { ReactComponent as FilterCloseIcon } from '../../assets/img/icons/ic_filter-close.svg'

const BuyerTable = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const [originalData, setOriginalData] = useState([])
    const [selectedFilters, setSelectedFilters] = useState(() =>
        identity(pickBy(params))
    )
    const [buyersNameParameter, setBuyersNameParameter] = useState('')
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(20)
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

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        LoadBuyersList()

        return () => {
            setOriginalData([])
        }
    }, [selectedFilters])

    // ===========================================================================
    // Helpers and functions
    // ===========================================================================
    const hasCountry = () => {
        return hasValidProperty(params, 'country')
    }

    const tableRowClass = (hasRedFlags) => {
        return hasRedFlags
            ? 'table-row has-red-flag cursor-pointer'
            : 'table-row cursor-pointer'
    }

    const LoadBuyersList = (page) => {
        setTableLoading(true)
        setCurrentPage(get(page, 'selected') || 0)
        VisualizationService.BuyerTableList({
            ...selectedFilters,
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
        let path = `/buyers/${id}`
        history.push(path)
    }

    const handleInputSubmit = (event, parameter) => {
        event.preventDefault()
        appendFilter({ buyer_name: parameter })
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
                                {trans('Buyers')}
                            </p>
                            <form
                                className="mt-2 select-filter--input"
                                onSubmit={(event) =>
                                    handleInputSubmit(
                                        event,
                                        buyersNameParameter
                                    )
                                }>
                                <input
                                    type="text"
                                    className="select-filter"
                                    placeholder="Enter contract name"
                                    value={buyersNameParameter}
                                    onChange={(e) =>
                                        setBuyersNameParameter(e.target.value)
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
                                    className="select-filter text-sm"
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
                                className="select-filter text-sm"
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
                                className="select-filter text-sm"
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

            <div className="hidden mb-12 md:flex gap-8">
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        {trans('Buyers')}
                    </p>
                    <form
                        className="mt-2 select-filter--input"
                        onSubmit={(event) =>
                            handleInputSubmit(event, buyersNameParameter)
                        }>
                        <input
                            type="text"
                            className="select-filter"
                            placeholder="Enter contract name"
                            value={buyersNameParameter}
                            onChange={(e) =>
                                setBuyersNameParameter(e.target.value)
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
                                appendFilter({ country: selectedOption.value })
                            }
                        />
                    </div>
                )}
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        {trans('Product category')}
                    </p>
                    <Select
                        className="select-filter text-sm"
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
                        className="select-filter text-sm"
                        classNamePrefix="select-filter"
                        options={valueRanges}
                        onChange={(selectedOption) =>
                            appendFilter({
                                contract_value_usd: selectedOption.value.value,
                                value_comparison: selectedOption.value.sign
                            })
                        }
                    />
                </div>
            </div>

            <div className="relative">
                <div className="custom-scrollbar table-scroll">
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>
                                    <span className="flex items-center">
                                        Buyer{' '}
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        Country{' '}
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span className="flex items-center">
                                        # of contracts{' '}
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span className="flex items-center">
                                        # of suppliers{' '}
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        product categories
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        value (usd)
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                                <th style={{ width: '8%' }}>
                                    <span className="flex items-center">
                                        % red flags
                                        <span className="icon-sort">
                                            <span className="icon-sort-arrow-up"></span>
                                            <span className="icon-sort-arrow-down"></span>
                                        </span>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {originalData &&
                                originalData.map((buyer, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            onClick={() =>
                                                showDetail(buyer.buyer_id)
                                            }
                                            className={tableRowClass(
                                                buyer.red_flag
                                            )}>
                                            <td className="hover:text-primary-blue">
                                                <p
                                                    className="truncate-text"
                                                    title={get(
                                                        buyer,
                                                        'buyer_name'
                                                    )}>
                                                    {get(buyer, 'buyer_name')}{' '}
                                                </p>{' '}
                                            </td>
                                            <td>
                                                {get(buyer, 'country_name')}
                                            </td>
                                            <td>
                                                {get(buyer, 'tender_count')}
                                            </td>
                                            <td>
                                                {get(buyer, 'supplier_count')}
                                            </td>
                                            <td>
                                                {get(
                                                    buyer,
                                                    'product_category_count'
                                                )}
                                            </td>
                                            <td>
                                                {buyer.amount_usd &&
                                                    buyer.amount_usd.toLocaleString(
                                                        'en'
                                                    )}
                                            </td>
                                            <td>
                                                {get(buyer, 'average_red_flag')}
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
                        onPageChange={LoadBuyersList}
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

export default BuyerTable
