import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { get, identity, pickBy } from 'lodash'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import Breadcrumb from '../../../components/website/Library/Breadcrumb'
import { ReactComponent as SortIcon } from '../../../assets/img/icons/ic_sort.svg'
import useCountries from '../../../hooks/useCountries'
import useTrans from '../../../hooks/useTrans'
import TableLoader from '../../../components/Loader/TableLoader'
import ReactPaginate from 'react-paginate'
import useContentFilters from '../../../hooks/useContentFilters'
import MetaInformation from '../../../components/MetaInformation/MetaInformation'

const limit = 10

const Resources = () => {
    const [resourceList, setResourceList] = useState([])
    const [selectedFilters, setSelectedFilters] = useState({})
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const { countryNameById } = useCountries()
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const { countrySelectList, resourceTypeSelectList } = useContentFilters()
    const history = useHistory()
    const { trans } = useTrans()
    window.scrollTo(0, 0)

    function showDetail(id) {
        let path = `/resources/${id}`
        history.push(path)
    }

    useEffect(() => {
        LoadResourceList()
    }, [selectedFilters])

    const LoadResourceList = (page) => {
        setTableLoading(true)
        setCurrentPage(get(page, 'selected') || 0)
        CmsPageService.ResourceList({
            ...selectedFilters,
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

    const handleCountryFilter = (country) => {
        appendFilter({ country })
    }

    return (
        <div className=" resources">
            <MetaInformation
                title="Resources"
                description="Welcome Covid-19 Contract Explorer"
            />
            <section className="px-4 resources__cards pt-24 pb-12 -mt-8">
                <div className="container mx-auto">
                    <Breadcrumb />

                    <h2 className="text-2xl">{trans('Resources')}</h2>
                </div>
            </section>
            <section className="resources__table py-12 bg-primary-gray">
                <div className="container mx-auto">
                    <h2 className="font-normal text-lg mb-6">
                        {trans(
                            'Best practices and solutions from our database'
                        )}
                    </h2>
                    <div className="mb-12 flex gap-8 ">
                        {/* <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                {trans('Title')}
                            </p>
                            <input
                                type="text"
                                name="title"
                                className="text-field text-sm"
                                placeholder="ALL"
                            />
                        </div> */}
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                {trans('Country')}
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
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                {trans('Type')}
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
                        {/* <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                {trans('Topic')}
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
                                {trans('Year')}
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
                                {trans('Language')}
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
                                    <table className="table table__resources">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '35%' }}>
                                                    <span className="flex items-center">
                                                        {trans('Title')}{' '}
                                                        <SortIcon className="ml-1 cursor-pointer" />
                                                    </span>
                                                </th>
                                                <th style={{ width: '15%' }}>
                                                    <span className="flex items-center">
                                                        {trans('Country')}{' '}
                                                        <SortIcon className="ml-1 cursor-pointer" />
                                                    </span>
                                                </th>
                                                <th style={{ width: '10%' }}>
                                                    <span className="flex items-center">
                                                        {trans('Type')}{' '}
                                                        <SortIcon className="ml-1 cursor-pointer" />
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
                                                                    {
                                                                        resource.title
                                                                    }
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
                                            <p>{trans('No data available')}</p>
                                        </div>
                                    )}
                                </div>
                                {tableLoading && <TableLoader />}
                            </div>
                            {resourceList.length > 0 && (
                                <div>
                                    <div className="text-right mt-2 text-sm">
                                        <p className="text-primary-dark text-opacity-50">
                                            {trans('Showing')}{' '}
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
                                            {trans('of')}{' '}
                                            <span className="text-primary-dark text-opacity-75">
                                                {totalItems}
                                            </span>{' '}
                                            {trans('rows')}
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
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Resources
