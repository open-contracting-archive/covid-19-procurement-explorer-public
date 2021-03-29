import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { get, identity, pickBy } from 'lodash'
import ReactPaginate from 'react-paginate'
import ContractService from '../../services/ContractService'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { formatDate } from '../../helpers/date'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'
import TableLoader from '../Loader/TableLoader'
import 'react-datepicker/dist/react-datepicker.css'
import { hasValidProperty } from '../../helpers/general'
import ContractFilter from './ContractFilter'

const limit = 20

const ContractTable = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const [originalData, setOriginalData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState({})
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

        return () => {
            setOriginalData([])
        }
    }, [params?.country, selectedFilters, sorting])

    // ===========================================================================
    // Helpers and functions
    // ===========================================================================
    const showDetail = (id) => {
        history.push(`/contracts/${id}`)
    }
    const LoadContractList = (page) => {
        const filterParams = {
            ...identity(pickBy(params)),
            ...selectedFilters,
            order: sorting.direction + sorting.column,
            limit: limit,
            offset: page && page.selected * limit
        }
        setTableLoading(true)
        setCurrentPage(get(page, 'selected') || 0)
        ContractService.ContractList(filterParams)
            .then((response) => {
                if (response.results) {
                    setOriginalData([...response.results])
                    setTotalItems(response.count)
                    setTableLoading(false)
                }
                setLoading(false)
                setTableLoading(false)
            })
            .catch(() => {
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
    const tableRowClass = (redFlagCount) => {
        return redFlagCount
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

    return (
        <div className="relative">
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
                    <div className="relative overflow-hidden">
                        <div className="custom-scrollbar table-scroll">
                            <table className="table">
                                <thead>
                                    <tr className="whitespace-no-wrap">
                                        <th style={{ width: '25%' }}>
                                            <span
                                                className="flex items-center cursor-pointer"
                                                onClick={() =>
                                                    appendSort('contract_title')
                                                }>
                                                {trans('Contract Title')}{' '}
                                                {columnSorting(
                                                    'contract_title'
                                                )}
                                            </span>
                                        </th>
                                        {!hasCountry() && (
                                            <th style={{ width: '10%' }}>
                                                <span
                                                    className="flex items-center cursor-pointer"
                                                    onClick={() =>
                                                        appendSort('country')
                                                    }>
                                                    {trans('Country')}{' '}
                                                    {columnSorting('country')}
                                                </span>
                                            </th>
                                        )}
                                        {!hasBuyer() && (
                                            <th style={{ width: '15%' }}>
                                                <span
                                                    className="flex items-center cursor-pointer"
                                                    onClick={() =>
                                                        appendSort('buyer')
                                                    }>
                                                    {trans('Buyer')}{' '}
                                                    {columnSorting('buyer')}
                                                </span>
                                            </th>
                                        )}
                                        {!hasSupplier() && (
                                            <th style={{ width: '15%' }}>
                                                <span
                                                    className="flex items-center cursor-pointer"
                                                    onClick={() =>
                                                        appendSort('supplier')
                                                    }>
                                                    {trans('Supplier')}{' '}
                                                    {columnSorting('supplier')}
                                                </span>
                                            </th>
                                        )}
                                        <th style={{ width: '10%' }}>
                                            <span
                                                className="flex items-center cursor-pointer"
                                                onClick={() =>
                                                    appendSort(
                                                        'procurement_procedure'
                                                    )
                                                }>
                                                {trans('Method')}{' '}
                                                {columnSorting(
                                                    'procurement_procedure'
                                                )}
                                            </span>
                                        </th>
                                        {!hasProduct() && (
                                            <th style={{ width: '15%' }}>
                                                <span className="flex items-center cursor-pointer">
                                                    {trans('Product Category')}{' '}
                                                    {columnSorting(
                                                        'product_category'
                                                    )}
                                                </span>
                                            </th>
                                        )}
                                        <th style={{ width: '10%' }}>
                                            <span
                                                className="flex items-center cursor-pointer"
                                                onClick={() =>
                                                    appendSort('contract_date')
                                                }>
                                                {trans('Date')}{' '}
                                                {columnSorting('contract_date')}
                                            </span>
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            <span
                                                className="flex items-center cursor-pointer"
                                                onClick={() =>
                                                    appendSort(
                                                        'contract_value_usd'
                                                    )
                                                }>
                                                {trans('Value (USD)')}{' '}
                                                {columnSorting(
                                                    'contract_value_usd'
                                                )}
                                            </span>
                                        </th>
                                        <th style={{ width: '3%' }} />
                                    </tr>
                                </thead>

                                <tbody>
                                    {originalData &&
                                        originalData.map((contract, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    onClick={() =>
                                                        showDetail(contract.id)
                                                    }
                                                    className={tableRowClass(
                                                        contract.red_flag &&
                                                            contract.red_flag
                                                                .length
                                                    )}>
                                                    <td className="hover:text-primary-blue">
                                                        <p
                                                            className="truncate-text"
                                                            title={
                                                                contract.contract_title
                                                            }>
                                                            {
                                                                contract.contract_title
                                                            }
                                                        </p>
                                                    </td>
                                                    {!hasCountry() && (
                                                        <td>
                                                            {
                                                                contract.country_name
                                                            }
                                                        </td>
                                                    )}
                                                    {!hasBuyer() && (
                                                        <td>
                                                            <p
                                                                className="truncate-text"
                                                                title={
                                                                    contract.buyer_name
                                                                }>
                                                                {
                                                                    contract.buyer_name
                                                                }
                                                            </p>
                                                        </td>
                                                    )}
                                                    {!hasSupplier() && (
                                                        <td>
                                                            <p
                                                                className="truncate-text"
                                                                title={
                                                                    contract.supplier_name
                                                                }>
                                                                {
                                                                    contract.supplier_name
                                                                }
                                                            </p>
                                                        </td>
                                                    )}
                                                    <td className="capitalize">
                                                        {
                                                            contract.procurement_procedure
                                                        }
                                                    </td>
                                                    {!hasProduct() && (
                                                        <td>
                                                            {get(
                                                                contract,
                                                                'product_category'
                                                            )}
                                                        </td>
                                                    )}
                                                    <td>
                                                        {formatDate(
                                                            contract.contract_date
                                                        )}
                                                    </td>
                                                    <td>
                                                        {contract.contract_value_usd &&
                                                            contract.contract_value_usd.toLocaleString(
                                                                'en'
                                                            )}
                                                    </td>
                                                    <td>
                                                        {contract.red_flag
                                                            .length > 0 && (
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
                    {originalData.length > 0 && (
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
                                    previousClassName={'pagination-item prev'}
                                    nextClassName={'pagination-item next'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    )
}

export default ContractTable
