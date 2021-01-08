import React, { Fragment, useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import CmsPageService from "../../services/CmsPageService"
import Loader from '../Loader/Loader'
import { ReactComponent as SortIcon } from "../../assets/img/icons/ic_sort.svg"

const InsightTable = (props) => {
    const countries = useSelector((state) => state.general.countries)
    const [insightList, setInsightList] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const queryParams = props.country !== undefined ? { country: props.country.id } : {}
        CmsPageService.InsightList(queryParams)
            .then((result) => {
                setInsightList(result)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, props)

    const getCountryName = (countryId) => {
        const country = countries.find((country) => country.id === countryId)
        return country ? country.name : countryId

    }

    const showDetail = (type, id) => {
        let path = type.toLowerCase() === 'news' ? `/news/${id}` : `/blogs/${id}`
        history.push(path)
    }

    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    return (
        <Fragment>
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
            {loading ? (<Loader />) : (
                <Fragment>
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
                        {insightList.items && insightList.items.map((insight, index) => {
                            return (
                                <tr key={index}
                                    onClick={() => showDetail(insight.contents_type, insight.id)}
                                    className={"cursor-pointer"}>
                                    <td>{insight.title}</td>
                                    <td>{getCountryName(insight.country.id)}</td>
                                    <td>{insight.contents_type}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <div className="text-center mt-8">
                        <button className="text-primary-blue">Load more</button>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default InsightTable
