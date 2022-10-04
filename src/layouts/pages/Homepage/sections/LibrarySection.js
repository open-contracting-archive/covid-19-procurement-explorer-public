import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { T } from '@transifex/react'
import CmsPageService from '../../../../services/CmsPageService'
import { dateDiff, formatDate } from '../../../../helpers/date'
import { Loader } from '../../../../components/Utilities'

const showItems = 6

const LibrarySection = () => {
    const [loading, setLoading] = useState(true)
    const [itemsLoading, setItemsLoading] = useState({
        blog: true,
        resource: true
    })
    const [insightList, setInsightList] = useState([])
    const [itemList, setItemList] = useState([])

    useEffect(() => {
        CmsPageService.BlogList({
            fields: '_,title,id,slug,contents_type,news_date,language',
            limit: showItems
        }).then((response) => {
            if (response.items && response.items.length) {
                let mappedItems = response.items.map((item) => ({
                    ...item,
                    date: item.news_date,
                    type: item.contents_type,
                    detail_url: `/blogs/${item.id}`
                }))
                setItemList((previous) => [...previous, ...mappedItems])
            }
            setItemsLoading((previous) => ({ ...previous, blog: false }))
        })
        CmsPageService.ResourceList({
            fields: '_,title,id,slug,resource_type,published_date,lang',
            limit: showItems
        }).then((response) => {
            if (response.items && response.items.length) {
                let mappedItems = response.items.map((item) => ({
                    ...item,
                    date: item.published_date,
                    type: item.resource_type,
                    language: item.lang,
                    detail_url: `/resources/${item.id}`
                }))
                setItemList((previous) => [...previous, ...mappedItems])
            }
            setItemsLoading((previous) => ({ ...previous, resource: false }))
        })

        return () => {
            setItemList([])
        }
    }, [])

    useEffect(() => {
        if (!itemsLoading.resource && !itemsLoading.blog) {
            let items = itemList
                .sort((a, b) => dateDiff(b.date, a.date))
                .slice(0, showItems)

            setInsightList(items)
            setLoading(false)
        }

        return () => {
            setInsightList([])
        }
    }, [itemsLoading])

    return (
        <section className="py-8 md:py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-6 md:mb-20">
                    <h3 className="uppercase text-2xl md:text-3xl font-bold leading-none">
                        <span className="block text-base font-bold">
                            <T _str="Explore" />
                        </span>
                        <T _str="Library" />
                    </h3>
                    <p className="text-xs md:text-base text-opacity-50  text-primary-dark">
                        <T _str="Find insights, analysis and best practices" />
                    </p>
                </div>
                {loading ? (
                    <Loader sm />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                        {insightList.length ? (
                            insightList.map((insightItem) => (
                                <Link
                                    key={insightItem.id}
                                    to={insightItem.detail_url}
                                >
                                    <div>
                                        <div className="library__tag">
                                            <p className="uppercase">
                                                {insightItem.type}
                                            </p>
                                        </div>
                                        <h4 className="library__heading hover:text-primary-blue focus:text-primary-blue ">
                                            {insightItem.title}
                                        </h4>
                                        <p className="library__date">
                                            {formatDate(insightItem.date)}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center">
                                <T _str="No records" />
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div className="text-right md:text-center mt-6 md:mt-12">
                <Link to="/library" className="text-blue-20">
                    <T _str="View library" /> --&gt;{' '}
                </Link>
            </div>
        </section>
    )
}
export default LibrarySection
