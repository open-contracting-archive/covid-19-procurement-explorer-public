import React from 'react'
import newsImage from '../assets/img/news.jpg'
import { Link } from 'react-router-dom'


const Blogs = () => {
    return (
        <div>
            <section className="py-24 px-4 blogs-list -mt-8">
                <div className="container mx-auto">
                    <p className="text-2xl mb-10">
                        Blogs
                    </p>
                    <div className="grid grid-cols-2 gap-x-10 mb-16">
                        <div className="img-wrapper">
                            <img src={newsImage} alt="" />
                        </div>
                        <div className="blog__caption">
                            <h3 className="blog-caption__title text-xl">
                                How COVID-19 has advanced the case for
                                procurement reform
                            </h3>
                            <div className="blog-caption__date mt-2 text-sm opacity-50 flex">
                            <p className="mr-4">By <span className="text-blue-20">Kaye Sklar</span></p>
                            <p>Nov 19, 2020</p>
                            </div>
                            <p className="blog-caption__details mt-4">Local governments are big buyers. Here in the U.S., our state and city governments 
                                collectively spend 1.6 trillion dollars per year. But for too long,
                                how and with whom our local governments spend their money has reinforced economic inequities in our country.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 mb-16">
                        <div className="img-wrapper">
                            <img src={newsImage} alt="" />
                        </div>
                        <div className="blog__caption">
                            <h3 className="blog-caption__title text-xl">
                                How COVID-19 has advanced the case for
                                procurement reform
                            </h3>
                            <div className="blog-caption__date mt-2 text-sm opacity-50 flex">
                            <p className="mr-4">By <span className="text-blue-20">Kaye Sklar</span></p>
                            <p>Nov 19, 2020</p>
                            </div>
                            <p className="blog-caption__details mt-4">Local governments are big buyers. Here in the U.S., our state and city governments 
                                collectively spend 1.6 trillion dollars per year. But for too long,
                                how and with whom our local governments spend their money has reinforced economic inequities in our country.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 mb-16">
                        <div className="img-wrapper">
                            <img src={newsImage} alt="" />
                        </div>
                        <div className="blog__caption">
                            <h3 className="blog-caption__title text-xl">
                                How COVID-19 has advanced the case for
                                procurement reform
                            </h3>
                            <div className="blog-caption__date mt-2 text-sm opacity-50 flex">
                            <p className="mr-4">By <span className="text-blue-20">Kaye Sklar</span></p>
                            <p>Nov 19, 2020</p>
                            </div>
                            <p className="blog-caption__details mt-4">Local governments are big buyers. Here in the U.S., our state and city governments 
                                collectively spend 1.6 trillion dollars per year. But for too long,
                                how and with whom our local governments spend their money has reinforced economic inequities in our country.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link to="/blogs" className="text-white bg-primary-blue px-32 py-4 rounded">
                            Load More
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Blogs
