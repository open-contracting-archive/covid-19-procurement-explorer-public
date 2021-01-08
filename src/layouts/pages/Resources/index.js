import React, { useEffect, Fragment, useState } from 'react'
import { ReactComponent as SortIcon } from '../../../assets/img/icons/ic_sort.svg'
import Select from 'react-select'
import { useHistory, Link, useParams } from 'react-router-dom'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import { formatDate } from "../../../helpers/date";

const Resources = () => {
    const [resourcesDetail, setResourcesDetail] = useState({})
    const [resourcesData, setResourcesData] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let { id: resourcesId } = useParams()
    window.scrollTo(0, 0)

    const previousPage = () => {
        history.goBack()
    }

    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    useEffect(() => {
        CmsPageService.ResourceList().then((response) => {
            setResourcesData(response.items)
            setLoading(false)
        })
    }, [])
    
    return (
        <div className=" resources">
            <section className="px-4 resources__cards pt-24 pb-12 -mt-8">
                <div className="container mx-auto">
                    <div className="text-sm mb-4 text-blue-5">
                            <span
                                className="cursor-pointer text-primary-blue"
                                onClick={previousPage}>
                                Library
                            </span>{' '}
                        /
                    </div>
                    <h2 className="text-2xl">
                        Resources
                    </h2>
                </div>
            </section>
            <section className="resources__table py-12 bg-primary-gray">
                <div className="container mx-auto">
                    <h2 className="font-normal text-lg mb-6">
                        Best practices and solutions from our database
                    </h2>
                    <div className="mb-12 flex gap-8 ">
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Titles
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
                                Country
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
                                Type
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
                                Sector
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>
                    </div>
                    <table className="table table__resources">
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
                        {resourcesData &&
                            resourcesData.map((resources) => {
                                return (
                                <tr className="table-row" key={resources.id}>
                                    <Link
                                        to={`/resources/${resources.id}`}
                                        >
                                        <td className="uppercase">
                                            {resources.title}
                                        </td>
                                    </Link>
                                    <td>{resources.location}</td>
                                     <td className="uppercase">Open</td>
                                </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </section>
        </div>
    )
}

export default Resources
