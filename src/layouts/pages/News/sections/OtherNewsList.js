import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import CmsPageService from '../../../../services/CmsPageService'
import Loader from '../../../../components/Loader/Loader'
import { transformNews } from "../../../../helpers/transformers"
import useTrans from "../../../../hooks/useTrans"

const OtherNewsList = () => {
    const [otherNewsList, setOtherNewsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [pagination, setPagination] = useState(() => {
        return { limit: 6, total: 0, offset: 0 }
    })
    const [search, setSearch] = useState(null)
    const { trans } = useTrans()

    useEffect(() => {
        loadNews()

        return () => {
            setOtherNewsList([])
        }
    }, [search])

    function loadMoreNews() {
        setLoadingMore(true)
        loadNews()
    }

    function loadNews() {
        const queryParams = {
            featured: false,
            limit: pagination.limit,
            offset: otherNewsList.length
        }

        if (search) {
            queryParams['search'] = search
        }

        CmsPageService.NewsList(queryParams)
            .then((response) => {
                setOtherNewsList((previous) => {
                    return [
                        ...previous,
                        ...response.items.map((item) => transformNews(item))
                    ]
                })
                setPagination((previous) => {
                    return { ...previous, total: get(response, 'meta.total_count', 0) }
                })
                setLoading(false)
                setLoadingMore(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSearch = (event) => {
        const search = event.target.value.toLowerCase()
        if (search.length > 2) {
            setSearch(search)
        }
    }

    return (
        <section className="px-4 py-24">
            <div className="container mx-auto">
                <div className="flex md: flex-nowrap flex-wrap justify-between pb-10">
                    <p className="text-xl blue-50">{trans('Other News')}</p>
                    {/*<div className="relative">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        className="mt-4 md:mt-0 flex justify-between items-center form-search px-5 py-4 rounded bg-gray"*/}
                    {/*        onKeyPress={handleSearch}*/}
                    {/*        placeholder="Search" />*/}
                    {/*    <svg*/}
                    {/*        width="20"*/}
                    {/*        height="20"*/}
                    {/*        viewBox="0 0 20 20"*/}
                    {/*        fill="none"*/}
                    {/*        xmlns="http://www.w3.org/2000/svg"*/}
                    {/*        className="absolute mr-4 mt-4 right-0 top-0">*/}
                    {/*        <path*/}
                    {/*            d="M15.7832 14.3911L20 18.6069L18.6069 20L14.3911 15.7832C12.8224 17.0407 10.8713 17.7246 8.86088 17.7218C3.96968 17.7218 0 13.7521 0 8.86088C0 3.96968 3.96968 0 8.86088 0C13.7521 0 17.7218 3.96968 17.7218 8.86088C17.7246 10.8713 17.0407 12.8224 15.7832 14.3911ZM13.8082 13.6605C15.0577 12.3756 15.7555 10.6532 15.7527 8.86088C15.7527 5.05267 12.6681 1.96909 8.86088 1.96909C5.05267 1.96909 1.96909 5.05267 1.96909 8.86088C1.96909 12.6681 5.05267 15.7527 8.86088 15.7527C10.6532 15.7555 12.3756 15.0577 13.6605 13.8082L13.8082 13.6605Z"*/}
                    {/*            fill="#1FBBEC"*/}
                    {/*        />*/}
                    {/*    </svg>*/}
                    {/*</div>*/}
                </div>

                {loading ? (<Loader />) : otherNewsList.length ? (
                    <Fragment>
                        <div className="grid grid-cols-12 gap-x-0 gap-y-10 sm:gap-10 mb-10">
                            {otherNewsList.map((news) => (
                                <Link
                                    className="news-thumbnail"
                                    to={news.detailUrl}
                                    key={news.id}>
                                    {news.image && (
                                        <div className="img-wrapper ">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={news.image}
                                                alt={news.title}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="news-caption__title">
                                            {news.title}
                                        </h3>
                                        <p className="news-caption__date">
                                            {news.formattedPublishDate}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {otherNewsList.length < pagination.total && (loadingMore ? (
                            <Loader sm />
                        ) : (
                            <div className="flex justify-center pt-10">
                                <span
                                    className="text-white bg-primary-blue px-32 py-4 rounded"
                                    onClick={() => {
                                        loadMoreNews()
                                    }}>
                                    {trans('Load more')}
                                </span>
                            </div>
                        ))}
                    </Fragment>
                ) : (
                    <p>{trans('No other news found')}</p>
                )}
            </div>
        </section>
    )
}
export default OtherNewsList
