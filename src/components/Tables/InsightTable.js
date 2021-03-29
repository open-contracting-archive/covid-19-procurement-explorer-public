import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { identity, pickBy, get } from 'lodash'
import Select from 'react-select'
import CmsPageService from '../../services/CmsPageService'
import Loader from '../Loader/Loader'
import ReactPaginate from 'react-paginate'
import TableLoader from '../Loader/TableLoader'
import { hasValidProperty } from '../../helpers/general'
import useCountries from '../../hooks/useCountries'
import { ReactComponent as FilterIcon } from '../../assets/img/icons/ic_filter.svg'
import useTrans from '../../hooks/useTrans'
import useContentFilters from '../../hooks/useContentFilters'
import { ReactComponent as FilterCloseIcon } from '../../assets/img/icons/ic_filter-close.svg'

const limit = 20

const InsightTable = (props) => {
    const { params } = props
    const [insightList, setInsightList] = useState([])
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})
    const [sorting, setSorting] = useState(() => {
        return { column: 'title', direction: '' }
    })
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const { countryNameById } = useCountries()
    const [showFilter, setShowFilter] = useState('hidden')
    const { contentsTypeSelectList, countrySelectList } = useContentFilters()
    const history = useHistory()
    const { trans } = useTrans()

    useEffect(() => {
        let queryParams = {
            ...identity(pickBy(selectedFilters)),
            ...identity(pickBy(params)),
            order: sorting.direction + sorting.column,
            limit: limit,
            offset: currentPage * limit
        }

        setTableLoading(true)
        CmsPageService.InsightList(queryParams)
            .then((result) => {
                if (result.items) {
                    setInsightList(result.items)
                }
                setTotalItems(result.meta.total_count)
                setLoading(false)
                setTableLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setTableLoading(false)
            })

        return () => {
            setInsightList([])
            setTotalItems(0)
        }
    }, [params?.country, selectedFilters, currentPage, sorting])

    const handlePageChange = (page) => {
        setCurrentPage(get(page, 'selected') || 0)
    }

    const showDetail = (type, id) => {
        let path =
            type.toLowerCase() === 'news' ? `/news/${id}` : `/blogs/${id}`
        history.push(path)
    }
    const hasCountry = () => {
        return hasValidProperty(params, 'country')
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

    const handleCountryFilter = (country) => {
        appendFilter({ country })
    }

    const handleFilterToggle = () => {
        setShowFilter(showFilter === 'hidden' ? 'block' : 'hidden')
    }

    const handleCloseFilter = () => {
        setShowFilter('hidden')
    }

    return (
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
                    className={`mt-24 bg-primary-blue absolute left-0 right-0 top-0 filter-ui-content z-20 p-4 mr-10 ${showFilter}`}>
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
                        {!hasCountry() && (
                            <div className="w-1/2 md:w-40 px-2 mb-5">
                                <p className="uppercase text-xs opacity-50 leading-none">
                                    {trans('Country')}
                                </p>
                                <Select
                                    className="mt-2 select-filter text-sm"
                                    classNamePrefix="select-filter"
                                    options={countrySelectList}
                                    onChange={(selectedOption) =>
                                        handleCountryFilter(
                                            selectedOption.value
                                        )
                                    }
                                />
                            </div>
                        )}
                        <div className="w-1/2 md:w-40 px-2 mb-5">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                {trans('Type')}
                            </p>
                            <Select
                                className="mt-2 select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={contentsTypeSelectList}
                                onChange={(selectedFilter) => {
                                    appendFilter({
                                        contents_type: selectedFilter.value
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}

            <div className="flex flex-wrap items-center justify-end md:justify-between mb-6 mt-12 md:mt-0 md:mb-12">
                <div className="hidden md:flex gap-8">
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
                                    handleCountryFilter(selectedOption.value)
                                }
                            />
                        </div>
                    )}
                    <div className="w-40">
                        <p className="uppercase text-xs opacity-50 leading-none">
                            {trans('Type')}
                        </p>
                        <Select
                            className="mt-2 select-filter text-sm"
                            classNamePrefix="select-filter"
                            options={contentsTypeSelectList}
                            onChange={(selectedFilter) => {
                                appendFilter({
                                    contents_type: selectedFilter.value
                                })
                            }}
                        />
                    </div>
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
                                        <th style={{ width: '35%' }}>
                                            <span
                                                className="flex items-center cursor-pointer"
                                                onClick={() =>
                                                    appendSort('title')
                                                }>
                                                {trans('Title')}
                                                {columnSorting('title')}
                                            </span>
                                        </th>
                                        <th style={{ width: '15%' }}>
                                            <span className="flex items-center">
                                                {trans('Country')}
                                            </span>
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            <span
                                                className="flex items-center cursor-pointer"
                                                onClick={() =>
                                                    appendSort('contents_type')
                                                }>
                                                {trans('Type')}
                                                {columnSorting('contents_type')}
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {insightList &&
                                        insightList.map((insight, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    onClick={() =>
                                                        showDetail(
                                                            insight.contents_type,
                                                            insight.id
                                                        )
                                                    }
                                                    className="cursor-pointer">
                                                    <td>
                                                        <p className="hover:text-primary-blue focus:text-primary-blue">
                                                            {insight.title}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        {countryNameById(
                                                            get(
                                                                insight,
                                                                'country.id',
                                                                null
                                                            )
                                                        )}
                                                    </td>
                                                    <td>
                                                        {insight.contents_type}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                            {!insightList.length && (
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
                    {insightList.length > 0 && (
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
                                    items.
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
                                    onPageChange={handlePageChange}
                                    containerClassName={'pagination-items'}
                                    pageClassName={'pagination-item'}
                                    previousClassName={'pagination-item prev'}
                                    nextClassName={'pagination-item next'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default InsightTable
