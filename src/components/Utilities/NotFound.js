import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { t } from '@transifex/native'
import { T, useLocale } from '@transifex/react'
import { MetaInformation } from './index'

function NotFound() {
    const [metaInfo, setMetaInfo] = useState({ title: '', description: '' })
    const locale = useLocale()

    useEffect(() => {
        setMetaInfo({
            title: t('Page Not Found'),
            description: t('Welcome Covid-19 Contract Explorer')
        })
    }, [locale])

    return (
        <section className="-mt-10 error-container flex items-center justify-center py-20 pb-10 lg:py-0">
            <MetaInformation
                title={metaInfo.title}
                description={metaInfo.description}
            />
            <div className="container mx-auto">
                <div className="flex items-center flex-wrap text-center lg:text-left justify-center">
                    <div className="error-text flex items-center justify-center leading-none lg:mr-16">
                        <div className="text-white text-center">
                            <h3 className="text-3xl md:text-4xl font-bold mb-2">
                                404
                            </h3>
                            <span className="text-2xl md:text-2xl">
                                <T _str={'error'} />
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
                            <T _str="Page Not Found" />
                        </h2>
                        <p className="text-lg text-blue-40 mb-5">
                            <T _str="Sorry, we can’t find the page you’re looking for." />
                        </p>
                        <Link
                            className="inline-block bg-primary-blue hover:bg-primary-dark hover:text-white py-4 px-6 rounded-full text-white transition"
                            to="/"
                        >
                            <T _str="Back to Homepage" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound
