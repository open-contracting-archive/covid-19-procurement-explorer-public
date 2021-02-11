import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import {get} from 'lodash'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import Breadcrumb from '../../../components/website/Library/Breadcrumb'
import { ReactComponent as SortIcon } from '../../../assets/img/icons/ic_sort.svg'
import useCountries from "../../../hooks/useCountries"
import useTrans from '../../../hooks/useTrans'

const Resources = () => {
    const [resourceList, setResourceList] = useState([])
    const {countryNameById} = useCountries()
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const {trans} = useTrans()
    window.scrollTo(0, 0)

    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    function showDetail(id) {
        let path = `/resources/${id}`
        history.push(path)
    }

    useEffect(() => {
        CmsPageService.ResourceList().then((response) => {
            setResourceList(response.items)
            setLoading(false)
        })

        return () => {
            setResourceList([])
        }
    }, [])

    return (
        <div className=" resources">
            <section className="px-4 resources__cards pt-24 pb-12 -mt-8">
                <div className="container mx-auto">
                    <Breadcrumb />

                    <h2 className="text-2xl">{trans('Resources')}</h2>
                </div>
            </section>
            <section className="resources__table py-12 bg-primary-gray">
                <div className="container mx-auto">
                    <h2 className="font-normal text-lg mb-6">
                        {trans('Best practices and solutions from our database')}
                    </h2>
                    <div className="mb-12 flex gap-8 ">
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                {trans('Title')}
                            </p>
                            <input
                                type="text"
                                name="title"
                                className="text-field text-sm"
                                placeholder="ALL"
                            />
                        </div>
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                {trans('Country')}
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
                                {trans('Type')}
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
                        </div>
                    </div>
                    {loading ? (
                        <Loader />
                    ) : (
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
                            resourceList.map((resource, index) => {
                                return (
                                    <tr className="table-row cursor-pointer" key={index}
                                        onClick={() => showDetail(resource.id)}>
                                        <td>{resource.title}</td>
                                        <td>{ countryNameById(get(resource, 'country.id', null))}</td>
                                        <td>{resource.resource_type}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Resources
