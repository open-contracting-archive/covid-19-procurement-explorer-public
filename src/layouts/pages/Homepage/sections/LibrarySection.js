import React, {useEffect, useState} from 'react'
import {useHistory, Link, useParams} from 'react-router-dom'
import InsightServices from '../../../../services/insightServices'
import {formatDate} from "../../../../helpers/date";
import Loader from "../../../../components/Loader/Loader";

const LibrarySection = () => {
    const [newsData, setNewsData] = useState([])
    const [blogsData, setBlogsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    let history = useHistory()
    let {id: newsId} = useParams()
    let {id: blogsId} = useParams()

    useEffect(
        () => {
            InsightServices.NewsData().then((newsresponse) => {
                InsightServices.BlogsData().then((blogsresponse) => {
                    setBlogsData(blogsresponse.items)
                    setNewsData(newsresponse.items)
                    setData(newsresponse.items, blogsresponse.items)
                    setLoading(false)
                })
            })
        },
        [newsId],
        [blogsId]
    )

    return (
        <section className="bg-primary-gray py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-20">
                    <h3 className="uppercase text-3xl font-bold leading-none">
                        <span className="block text-base font-bold">
                            Explore
                        </span>
                        Library
                    </h3>
                    <p className="text-base text-opacity-50  text-primary-dark">
                        Find insights, analysis and best practices
                    </p>
                </div>
                {loading ? (
                    <Loader sm/>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {data &&
                        data.slice(0, 6).map((eachdata) => {
                            return (
                                <Link
                                    to={eachdata.contents_type === "News" ? `/news-detail/${eachdata.id}` : `/blogs-detail/${eachdata.id}`}
                                    key={eachdata.id}>
                                    <div>
                                        <div className="library__tag">
                                            <p className="uppercase">{eachdata.contents_type}</p>
                                        </div>
                                        <h4 className="library__heading ">
                                            {eachdata.title}
                                        </h4>
                                        <p className="library__date">
                                            {formatDate(eachdata.published_date, 'MMM DD, YYYY')}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}
export default LibrarySection
