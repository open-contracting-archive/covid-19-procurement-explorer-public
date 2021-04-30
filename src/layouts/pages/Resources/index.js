import React, { useEffect, useState, Fragment } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { get, identity, pickBy } from 'lodash'
import { T } from '@transifex/react'
import ReactPaginate from 'react-paginate'
import CmsPageService from '../../../services/CmsPageService'
import useCountries from '../../../hooks/useCountries'
import useContentFilters from '../../../hooks/useContentFilters'
import {
    Loader,
    MetaInformation,
    Breadcrumb,
    TableLoader
} from '../../../components/Utilities'
import Default from '../../../constants/Default'
import Icon from '../../../assets/img/icons'

const limit = Default.PAGE_SIZE

const Resources = () => {
    const [resourceList, setResourceList] = useState([])
    const [selectedFilters, setSelectedFilters] = useState({})
    const [totalItems, setTotalItems] = useState(0)
    const [sorting, setSorting] = useState(() => {
        return { column: 'title', direction: '' }
    })
    const [currentPage, setCurrentPage] = useState(0)
    const { countryNameById } = useCountries()
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const { countrySelectList, resourceTypeSelectList } = useContentFilters()
    const [showFilter, setShowFilter] = useState('hidden')
    const history = useHistory()
    window.scrollTo(0, 0)

    function showDetail(id) {
        let path = `/resources/${id}`
        history.push(path)
    }

    useEffect(() => {
        LoadResourceList()
    }, [selectedFilters, sorting])

    const LoadResourceList = (page) => {
        setTableLoading(true)
        setCurrentPage(get(page, 'selected') || 0)
        CmsPageService.ResourceList({
            ...selectedFilters,
            order: sorting.direction + sorting.column,
            limit: limit,
            offset: page && page.selected * limit
        }).then((response) => {
            setResourceList(response.items)
            setTotalItems(response.meta.total_count)
            setLoading(false)
            setTableLoading(false)
        })

        return () => {
            setResourceList([])
        }
    }

    const appendFilter = (selected) => {
        setTableLoading(true)
        setSelectedFilters((previous) => {
            return identity(
                pickBy({
                    ...previous,
                    ...selected
                })
            )
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
        <div className=" resources">
            <MetaInformation
                title="Resources"
                description="Welcome Covid-19 Contract Explorer"
            />
            <section className="px-4 resources__cards pt-12 md:pt-24 pb-4 md:pb-12 -mt-8">
                <div className="container mx-auto">
                    <Breadcrumb />

                    <h2 className="text-xl md:text-2xl">
                        <T _str="Resources" />
                    </h2>
                </div>
            </section>
            <section className="resources__table p-4 md:py-12 bg-primary-gray">
                <div className="container mx-auto">
                    <h2 className="font-normal text-lg mb-6">
                        <T _str="Best practices and solutions from our database" />
                    </h2>

                    <div className="relative">
                        <div
                            className="md:hidden cursor-pointer"
                            onClick={handleFilterToggle}>
                            <div className="filter-ui">
                                <Icon.Filter />
                            </div>
                        </div>
                        {showFilter ? (
                            <div
                                className={`mt-24 bg-primary-blue absolute left-0 right-0 top-0 filter-ui-content z-20 p-4 mr-10 ${showFilter}`}>
                                <div className="flex justify-between text-white mb-4 md:mb-0">
                                    <span className="text-sm uppercase font-bold">
                                        <T _str="Filter" />
                                    </span>
                                    <span
                                        className="filter-close text-sm uppercase font-bold cursor-pointer"
                                        onClick={handleCloseFilter}>
                                        <Icon.FilterClose />
                                    </span>
                                </div>
                                <div className="flex -mx-2 -mb-5 flex-wrap">
                                    <div className="w-1/2 md:w-40 px-2 mb-5">
                                        <p className="text-white md:text-primary-dark uppercase text-xs opacity-50 leading-none">
                                            <T _str="Country" />
                                        </p>
                                        <Select
                                            className="select-filter text-sm"
                                            classNamePrefix="select-filter"
                                            options={countrySelectList}
                                            onChange={(selectedOption) =>
                                                handleCountryFilter(
                                                    selectedOption.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="w-1/2 md:w-40 px-2 mb-5">
                                        <p className="text-white md:text-primary-dark uppercase text-xs opacity-50 leading-none">
                                            <T _str="Type" />
                                        </p>
                                        <Select
                                            className="select-filter text-sm"
                                            classNamePrefix="select-filter"
                                            options={resourceTypeSelectList}
                                            onChange={(selectedOption) => {
                                                appendFilter({
                                                    resource_type:
                                                        selectedOption.value
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    <div className="flex flex-wrap items-center justify-end md:justify-between md:mt-0 md:mb-12">
                        <div className="hidden md:flex gap-8">
                            <div className="w-40">
                                <p className="uppercase text-xs opacity-50 leading-none">
                                    <T _str="Country" />
                                </p>
                                <Select
                                    className="select-filter text-sm"
                                    classNamePrefix="select-filter"
                                    options={countrySelectList}
                                    onChange={(selectedOption) =>
                                        handleCountryFilter(
                                            selectedOption.value
                                        )
                                    }
                                />
                            </div>
                            <div className="w-40">
                                <p className="uppercase text-xs opacity-50 leading-none">
                                    <T _str="Type" />
                                </p>
                                <Select
                                    className="select-filter text-sm"
                                    classNamePrefix="select-filter"
                                    options={resourceTypeSelectList}
                                    onChange={(selectedOption) => {
                                        appendFilter({
                                            resource_type: selectedOption.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <Fragment>
                            <div className="relative overflow-hidden">
                                <div className="custom-scrollbar table-scroll">
                                    <table className="table table__resources">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '35%' }}>
                                                    <span
                                                        className="flex items-center cursor-pointer"
                                                        onClick={() =>
                                                            appendSort('title')
                                                        }>
                                                        <T _str="Title" />
                                                        {columnSorting('title')}
                                                    </span>
                                                </th>
                                                <th style={{ width: '15%' }}>
                                                    <span className="flex items-center">
                                                        <T _str="Country" />
                                                    </span>
                                                </th>
                                                <th style={{ width: '10%' }}>
                                                    <span
                                                        className="flex items-center cursor-pointer"
                                                        onClick={() =>
                                                            appendSort(
                                                                'resource_type'
                                                            )
                                                        }>
                                                        <T _str="Type" />
                                                        {columnSorting(
                                                            'resource_type'
                                                        )}
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resourceList &&
                                                resourceList.map(
                                                    (resource, index) => {
                                                        return (
                                                            <tr
                                                                className="table-row cursor-pointer"
                                                                key={index}
                                                                onClick={() =>
                                                                    showDetail(
                                                                        resource.id
                                                                    )
                                                                }>
                                                                <td>
                                                                    <p className="hover:text-primary-blue focus:text-primary-blue">
                                                                        {
                                                                            resource.title
                                                                        }
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    {countryNameById(
                                                                        get(
                                                                            resource,
                                                                            'country.id',
                                                                            null
                                                                        )
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        resource.resource_type
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )}
                                        </tbody>
                                    </table>
                                    {!resourceList.length > 0 && (
                                        <div
                                            className="flex items-center justify-center bg-white rounded-md"
                                            style={{
                                                height: '75%',
                                                minHeight: '250px'
                                            }}>
                                            <p>
                                                <T _str="No data available" />
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {tableLoading && <TableLoader />}
                            </div>
                            {resourceList.length > 0 && (
                                <div>
                                    <div className="text-right mt-2 text-sm">
                                        <p className="text-primary-dark text-opacity-50">
                                            <T _str="Showing" />{' '}
                                            <span className="text-primary-dark text-opacity-75">
                                                {1 + currentPage * limit}
                                            </span>{' '}
                                            -{' '}
                                            <span className="text-primary-dark text-opacity-75">
                                                {limit + currentPage * limit >
                                                totalItems
                                                    ? totalItems
                                                    : limit +
                                                      currentPage * limit}
                                            </span>{' '}
                                            <T _str="of" />{' '}
                                            <span className="text-primary-dark text-opacity-75">
                                                {totalItems}
                                            </span>{' '}
                                            <T _str="items" />
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
                                            onPageChange={LoadResourceList}
                                            containerClassName={
                                                'pagination-items'
                                            }
                                            pageClassName={'pagination-item'}
                                            previousClassName={
                                                'pagination-item prev'
                                            }
                                            nextClassName={
                                                'pagination-item next'
                                            }
                                            activeClassName={'active'}
                                        />
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Resources
