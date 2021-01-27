import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { identity, pickBy, get, has } from 'lodash'
import Select from 'react-select'
import CmsPageService from '../../services/CmsPageService'
import Loader from '../Loader/Loader'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import ReactPaginate from 'react-paginate'
import TableLoader from '../Loader/TableLoader'

const InsightTable = ({ params }) => {
    const countries = useSelector((state) => state.general.countries)
    const [insightList, setInsightList] = useState([])
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState(() =>
        identity(pickBy(params))
    )
    const [limit, setLimit] = useState(20)
    const [totalItems, setTotalItems] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const history = useHistory()

    useEffect(() => {
        LoadInsightList()
    }, [params, selectedFilters])

    const LoadInsightList = (page) => {
        setTableLoading(true)
        setCurrentPage(get(page, 'selected') || 0)
        CmsPageService.InsightList({
            ...selectedFilters,
            limit: limit,
            offset: page && page.selected * limit
        })
            .then((result) => {
                setInsightList(result)
                setLoading(false)
                setTotalItems(result.meta.total_count)
                setTableLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setTableLoading(false)
            })
    }

    const countrySelectList = useMemo(() => {
        return [
            { label: 'All ', value: '8' },
            ...countries
                .filter((country) => country.name !== 'Global')
                .map((country) => {
                    return {
                        label: country.name,
                        value: country.id
                    }
                })
                .sort((a, b) => {
                    return a.label < b.label ? -1 : 0
                })
        ]
    }, [countries])

    const typeSelectList = [
        { value: 'news', label: 'News' },
        { value: 'blog', label: 'Blog' }
    ]

    const getCountryName = (insight) => {
        const countryId = get(insight, 'country.id', null)

        if (!countryId) {
            return ''
        }

        const country = countries.find((country) => country.id === countryId)
        return country ? country.name : countryId
    }

    const showDetail = (type, id) => {
        let path =
            type.toLowerCase() === 'news' ? `/news/${id}` : `/blogs/${id}`
        history.push(path)
    }

    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    const hasCountry = () => {
        return (
            has(params, 'country') &&
            params.country !== undefined &&
            params.country !== null &&
            params.country !== ''
        )
    }

    const appendFilter = (selected) => {
        // setLoading(true)
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

    return (
        <>
            <div className="mb-12 flex gap-8 ">
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        Title
                    </p>
                    <input
                        type="text"
                        name="title"
                        className="text-field text-sm"
                        placeholder="ALL"
                    />
                </div>
                {!hasCountry() && (
                    <div className="w-40">
                        <p className="uppercase text-xs opacity-50 leading-none">
                            Country
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
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        Type
                    </p>
                    <Select
                        className="select-filter text-sm"
                        classNamePrefix="select-filter"
                        options={typeSelectList}
                    />
                </div>
                {/* <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        Topic
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
                        Year
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
                        Language
                    </p>
                    <Select
                        className="select-filter text-sm"
                        classNamePrefix="select-filter"
                        options={options}
                        defaultValue={options[0]}
                    />
                </div> */}
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
                                            <span className="flex items-center">
                                                Title{' '}
                                                <SortIcon className="ml-1 cursor-pointer" />
                                            </span>
                                        </th>
                                        <th style={{ width: '15%' }}>
                                            <span className="flex items-center">
                                                Country{' '}
                                                <SortIcon className="ml-1 cursor-pointer" />
                                            </span>
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            <span className="flex items-center">
                                                Type{' '}
                                                <SortIcon className="ml-1 cursor-pointer" />
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {insightList.items &&
                                        insightList.items.map(
                                            (insight, index) => {
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
                                                        <td>{insight.title}</td>
                                                        <td>
                                                            {getCountryName(
                                                                insight
                                                            )}
                                                        </td>
                                                        <td>
                                                            {
                                                                insight.contents_type
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )}
                                </tbody>
                            </table>
                            {!insightList.items.length && (
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
                    {insightList.items.length > 0 && (
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
                                    onPageChange={LoadInsightList}
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
        </>
    )
}

export default InsightTable
