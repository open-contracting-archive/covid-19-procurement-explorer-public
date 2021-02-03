import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { get, identity, pickBy } from 'lodash'
import ReactPaginate from 'react-paginate'
import ContractService from '../../services/ContractService'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { formatDate } from '../../helpers/date'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'
import TableLoader from '../Loader/TableLoader'
import 'react-datepicker/dist/react-datepicker.css'
import { hasValidProperty } from "../../helpers/general"
import ContractFilter from "./ContractFilter"

const TenderTable = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const [tenderList, setTenderList] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState(() => identity(pickBy(params)))
    const [limit, setLimit] = useState(20)
    const [sorting, setSorting] = useState(() => {
        return { column: 'contract_title', direction: '' }
    })
    const [totalItems, setTotalItems] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [tableLoading, setTableLoading] = useState(false)
    const { trans } = useTrans()
    const history = useHistory()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        LoadContractList()
    }, [selectedFilters, sorting])

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
            order: sorting.direction + sorting.column,
            limit: limit,
            offset: page && page.selected * limit
        })
            .then((response) => {
                if (response.results) {
                    setTenderList([...response.results])
                    setTotalItems(response.count)
                    setTableLoading(false)
                }
                setLoading(false)
                setTableLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                setTableLoading(false)
            })
    }
    const hasCountry = () => {
        return hasValidProperty(params, 'country')
    }
    const hasBuyer = () => {
        return hasValidProperty(params, 'buyer')
    }
    const hasSupplier = () => {
        return hasValidProperty(params, 'supplier')
    }
    const hasProduct = () => {
        return hasValidProperty(params, 'product')
    }
    const tableRowClass = (hasRedFlags) => {
        return hasRedFlags
            ? 'table-row has-red-flag cursor-pointer'
            : 'table-row cursor-pointer'
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

    return (
        <div>
            <Fragment>
                <ContractFilter
                    params={params}
                    appendFilter={appendFilter}
                    hasCountry={hasCountry}
                    hasBuyer={hasBuyer}
                    hasSupplier={hasSupplier}
                    hasProduct={hasProduct}
                />

                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <div className="relative">
                            <div className="custom-scrollbar table-scroll">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th style={{ width: '25%' }}>
                                                <span className="flex items-center cursor-pointer" onClick={() => appendSort('contract_title')}>
                                                    {trans('Contract Title')}{' '}
                                                    <SortIcon className="ml-1" />
                                                </span>
                                        </th>
                                        {!hasCountry() && (
                                            <th style={{ width: '10%' }}>
                                                    <span className="flex items-center cursor-pointer" onClick={() => appendSort('country')}>
                                                        {trans('Country')}{' '}
                                                        <SortIcon className="ml-1" />
                                                    </span>
                                            </th>
                                        )}
                                        {!hasBuyer() && (
                                            <th style={{ width: '15%' }}>
                                                    <span className="flex items-center cursor-pointer" onClick={() => appendSort('buyer')}>
                                                        {trans('Buyer')}{' '}
                                                        <SortIcon className="ml-1" />
                                                    </span>
                                            </th>
                                        )}
                                        {!hasSupplier() && (
                                            <th style={{ width: '15%' }}>
                                                    <span className="flex items-center cursor-pointer" onClick={() => appendSort('supplier')}>
                                                        {trans('Supplier')}{' '}
                                                        <SortIcon className="ml-1" />
                                                    </span>
                                            </th>
                                        )}
                                        <th style={{ width: '10%' }}>
                                                <span className="flex items-center cursor-pointer" onClick={() => appendSort('procurement_procedure')}>
                                                    {trans('Method')}{' '}
                                                    <SortIcon className="ml-1" />
                                                </span>
                                        </th>
                                        {!hasProduct() && (
                                            <th style={{ width: '15%' }}>
                                                <span className="flex items-center">
                                                    {trans('Product Category')}{' '}
                                                    <SortIcon className="ml-1" />
                                                </span>
                                            </th>
                                        )}
                                        <th style={{ width: '10%' }}>
                                                <span className="flex items-center cursor-pointer" onClick={() => appendSort('contract_date')}>
                                                    {trans('Date')}{' '}
                                                    <SortIcon className="ml-1" />
                                                </span>
                                        </th>
                                        <th style={{ width: '10%' }}>
                                                <span className="flex items-center" onClick={() => appendSort('contract_value_usd')}>
                                                    {trans('Value (USD)')}{' '}
                                                    <SortIcon className="ml-1" />
                                                </span>
                                        </th>
                                        <th style={{ width: '3%' }} />
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
                            {tableLoading && <TableLoader />}
                        </div>
                        {tenderList.length > 0 && (
                            <div>
                                <div className="text-right mt-2 text-sm">
                                    <p className="text-primary-dark text-opacity-50">
                                        Showing{' '}
                                        <span className="text-opacity-75">
                                            {1 + currentPage * limit}
                                        </span>{' '}
                                        -{' '}
                                        <span className="text-opacity-75">
                                            {limit + currentPage * limit >
                                            totalItems
                                                ? totalItems
                                                : limit + currentPage * limit}
                                        </span>{' '}
                                        of{' '}
                                        <span className="text-opacity-75">
                                            {totalItems}
                                        </span>{' '}
                                        contracts
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
                    </Fragment>
                )}
            </Fragment>
        </div>
    )
}

export default TenderTable
