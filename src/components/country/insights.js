import React, { useEffect,  useState } from 'react'
import Select from 'react-select'
import { useHistory, Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import { API_URL } from '../../helpers'
import InsightServices from '../../services/insightServices'

const Insights = () => {
    const [insightsDetail, setInsightsDetail] = useState({})
    const [insightsData, setInsightsData] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let { id: insightsId } = useParams()

    useEffect(() => {
        InsightServices.InsightsData().then((response) => {
            setInsightsData(response.items)
            setLoading(false)
        })
    }, [])
    
    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    let tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const tempTableData = tempArray.map((index) => {
        return (
            <tr className="table-row" key={index}>
                <td className="uppercase">
                    Health sector emergency response plan
                </td>
                <td>Mexico</td>
                <td className="uppercase">Open</td>
            </tr>
        )
    })

    return (
        <div>
            <h2 className="font-normal text-lg mb-6">Library</h2>
            <div className="grid grid-cols-12 grid-rows-3 gap-x-16 gap-y-10 main-news mb-12">
                {insightsData &&
                    insightsData.slice(0, 4).map((insights) => {
                        return (
                            <Link
                                className="main-news__item relative"
                                to={`/insights-detail/${insights.id}`}
                                key={insights.id}>
                                {/* <div className="main-news__item relative"> */}
                                {get(
                                    insights,
                                    'content_image.meta.download_url'
                                ) && (
                                    <div className="img-wrapper img-gradient">
                                        <img
                                            src={`${API_URL}${get(
                                                insights,
                                                'content_image.meta.download_url'
                                            )}`}
                                            alt=""
                                        />
                                    </div>
                                )}
                                <div className="main-news__caption">
                                    <h3 className="news-caption__title">
                                        {insights.title}
                                    </h3>
                                    <p className="news-caption__date">
                                        {insights.published_date}
                                    </p>
                                </div>

                                {/* </div> */}
                            </Link>
                        )
                    })}
            </div>
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
                    <tr className="table-row">
                        <td className="uppercase">
                            Health sector emergency response plan
                        </td>
                        <td>Mexico</td>
                        <td className="uppercase">Open</td>
                    </tr>
                    {tempTableData}
                </tbody>
            </table>
            <div className="text-center mt-8">
                <button className="text-primary-blue">Load more</button>
            </div>
        </div>
    )
}

export default Insights
