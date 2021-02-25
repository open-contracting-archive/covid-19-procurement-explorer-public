import React from 'react'
import { Link } from 'react-router-dom'
import MetaInformation from '../MetaInformation/MetaInformation'

function NotFound() {
    return (
        <section className="-mt-10 error-container flex items-center justify-center py-20 pb-10 lg:py-0">
            <MetaInformation
                title="404"
                description="Welcome Covid-19 Contract Explorer"
            />
            <div className="container mx-auto">
                <div className="flex items-center flex-wrap text-center lg:text-left justify-center">
                    <div className="error-text flex items-center justify-center leading-none lg:mr-16">
                        <div className="text-white text-center">
                            <h3 className="text-3xl md:text-4xl font-bold mb-2">
                                404
                            </h3>
                            <span className="text-2xl md:text-2xl">error</span>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
                            Page Not Found
                        </h2>
                        <p className="text-lg text-blue-40 mb-5">
                            Sorry, we can’t find the page you’re looking for.
                        </p>
                        <Link
                            className="inline-block bg-primary-blue hover:bg-primary-dark hover:text-white py-4 px-6 rounded-full text-white transition"
                            to="/">
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound
