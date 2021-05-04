import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { identity, pickBy, get } from 'lodash'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { T } from '@transifex/react'
import CmsPageService from '../../services/CmsPageService'
import useCountries from '../../hooks/useCountries'
import useContentFilters from '../../hooks/useContentFilters'
import useTableSorting from '../../hooks/useTableSorting'
import { hasValidProperty } from '../../helpers/general'
import { formatDate } from '../../helpers/date'
import { Loader, TableLoader } from '../Utilities'
import Default from '../../constants/Default'
import Icon from '../../assets/img/icons'

const limit = Default.PAGE_SIZE

const InsightTable = (props) => {
    const { params } = props
    const [insightList, setInsightList] = useState([])
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const { countryNameById } = useCountries()
    const [showFilter, setShowFilter] = useState('hidden')
    const {
        contentsTypeSelectList,
        countrySelectList,
        yearSelectList
    } = useContentFilters()
    const history = useHistory()
    const { sortedItems, sorting, tableHeaderSpan } = useTableSorting({
        items: insightList,
        defaultSorting: {
            column: 'title',
            direction: ''
        },
        sortTableData: false
    })

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
                className="cursor-pointer md:hidden"
                onClick={handleFilterToggle}>
                <div className="filter-ui">
                    <Icon.Filter />
                </div>
            </div>

            {showFilter ? (
                <div
                    className={`mt-24 bg-primary-blue absolute left-0 right-0 top-0 filter-ui-content z-20 p-4 mr-10 ${showFilter}`}>
                    <div className="flex justify-between mb-4 text-white md:mb-0">
                        <span className="text-sm font-bold uppercase">
                            Filter
                        </span>
                        <span
                            className="text-sm font-bold uppercase cursor-pointer filter-close"
                            onClick={handleCloseFilter}>
                            <Icon.FilterClose />
                        </span>
                    </div>
                    <div className="flex flex-wrap -mx-2 -mb-5">
                        {!hasCountry() && (
                            <div className="w-1/2 px-2 mb-5 md:w-40">
                                <p className="text-xs leading-none uppercase opacity-50">
                                    <T _str="Country" />
                                </p>
                                <Select
                                    className="mt-2 text-sm select-filter"
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
                        <div className="w-1/2 px-2 mb-5 md:w-40">
                            <p className="text-xs leading-none uppercase opacity-50">
                                <T _str="Type" />
                            </p>
                            <Select
                                className="mt-2 text-sm select-filter"
                                classNamePrefix="select-filter"
                                options={contentsTypeSelectList}
                                onChange={(selectedFilter) => {
                                    appendFilter({
                                        contents_type: selectedFilter.value
                                    })
                                }}
                            />
                        </div>
                        <div className="w-1/2 px-2 mb-5 md:w-40">
                            <p className="text-xs leading-none uppercase opacity-50">
                                <T _str="Year" />
                            </p>
                            <Select
                                className="mt-2 text-sm select-filter"
                                classNamePrefix="select-filter"
                                options={yearSelectList}
                                // onChange={(selectedFilter) => {
                                //     appendFilter({
                                //         news_date__gte: `${selectedFilter.value}-1-1`,
                                //         news_date__lt: `${selectedFilter.value}-12-31`
                                //     })
                                // }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}

            <div className="flex flex-wrap items-center justify-end mt-12 mb-6 md:justify-between md:mt-0 md:mb-12">
                <div className="hidden gap-8 md:flex">
                    {!hasCountry() && (
                        <div className="w-40">
                            <p className="text-xs leading-none uppercase opacity-50">
                                <T _str="Country" />
                            </p>
                            <Select
                                className="mt-2 text-sm select-filter"
                                classNamePrefix="select-filter"
                                options={countrySelectList}
                                onChange={(selectedOption) =>
                                    handleCountryFilter(selectedOption.value)
                                }
                            />
                        </div>
                    )}
                    <div className="w-40">
                        <p className="text-xs leading-none uppercase opacity-50">
                            <T _str="Type" />
                        </p>
                        <Select
                            className="mt-2 text-sm select-filter"
                            classNamePrefix="select-filter"
                            options={contentsTypeSelectList}
                            onChange={(selectedFilter) => {
                                appendFilter({
                                    contents_type: selectedFilter.value
                                })
                            }}
                        />
                    </div>
                    <div className="w-40">
                        <p className="text-xs leading-none uppercase opacity-50">
                            <T _str="Year" />
                        </p>
                        <Select
                            className="mt-2 text-sm select-filter"
                            classNamePrefix="select-filter"
                            options={yearSelectList}
                            // onChange={(selectedFilter) => {
                            //     appendFilter({
                            //         news_date__gte: `${selectedFilter.value}-1-1`,
                            //         news_date__lt: `${selectedFilter.value}-12-31`
                            //     })
                            // }}
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="relative">
                        <div className="custom-scrollbar table-scroll">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '35%' }}>
                                            {tableHeaderSpan(
                                                'title',
                                                <T _str="Title" />
                                            )}
                                        </th>
                                        <th style={{ width: '15%' }}>
                                            <span className="flex items-center">
                                                <T _str="Country" />
                                            </span>
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            {tableHeaderSpan(
                                                'contents_type',
                                                <T _str="Type" />
                                            )}
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            {tableHeaderSpan(
                                                'news_date',
                                                <T _str="Year" />
                                            )}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedItems.map((insight, index) => {
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
                                                <td>{insight.contents_type}</td>
                                                <td>
                                                    {formatDate(
                                                        insight.news_date,
                                                        'YYYY'
                                                    )}
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
                            <div className="mt-2 text-sm text-right">
                                <p className="text-opacity-50 text-primary-dark">
                                    <T _str="Showing" />{' '}
                                    <span className="text-opacity-75 text-primary-dark">
                                        {1 + currentPage * limit}
                                    </span>{' '}
                                    -{' '}
                                    <span className="text-opacity-75 text-primary-dark">
                                        {limit + currentPage * limit >
                                        totalItems
                                            ? totalItems
                                            : limit + currentPage * limit}
                                    </span>{' '}
                                    of{' '}
                                    <span className="text-opacity-75 text-primary-dark">
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
                </Fragment>
            )}
        </div>
    )
}

export default InsightTable
