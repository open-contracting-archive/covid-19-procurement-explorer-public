import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { identity, pickBy, get } from 'lodash'
import ReactPaginate from 'react-paginate'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import TableLoader from '../Loader/TableLoader'
import useContractFilters from '../../hooks/useContractFilters'
import { hasValidProperty } from '../../helpers/general'

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

    return loading ? (
        <Loader />
    ) : (
        <>
            <div className="mb-12 flex gap-8">
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
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                            </th>
                            <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        Country{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                            </th>
                            <th style={{ width: '6%' }}>
                                    <span className="flex items-center">
                                        # of contracts{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                            </th>
                            <th style={{ width: '6%' }}>
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
                            <th style={{ width: '8%' }}>
                                    <span className="flex items-center">
                                        % red flags
                                        <SortIcon className="ml-1 cursor-pointer" />
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
        </>
    )
}

export default BuyerTable
