import React from 'react'
import newsImage from '../assets/img/news.jpg'
import { Link } from 'react-router-dom'


const News = () => {
    return (
        <div>
            <section className=" news__list pt-24 px-4">
                <div className="container mx-auto">
                    <p className="text-2xl mb-10">
                        News
                    </p>
                    <p className="text-xl mb-6 ">
                       Featured News
                    </p>
                    <div className="grid grid-cols-12 gap-x-10">
                        <div className="display__item col-span-8">
                            <div className="news__item h-full">
                                <div className="img-wrapper relative">
                                    <img className="w-full h-full object-cover" src={newsImage} alt="" />
                                    <div className="news__caption px-6 py-6 text-white">
                                        <h3 className="news-caption__title">
                                            How COVID-19 has advanced the case for
                                            procurement reform
                                        </h3>
                                        <p className="news-caption__date mt-2">Nov 19, 2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list__item col-span-4">
                            <div className="news__item">
                                <div className="img-wrapper w-full h-auto">
                                    <img className="w-full"src={newsImage} alt="" />
                                </div>
                                <div className="news__caption pt-6">
                                    <h3 className="news-caption__title">
                                        How COVID-19 has advanced the case for
                                        procurement reform
                                    </h3>
                                    <p className="news-caption__date mt-2">Nov 19, 2020</p>
                                </div>
                            </div>
                            <div className="news__item">
                                <div className="img-wrapper w-full h-auto">
                                    <img src={newsImage} alt="" />
                                </div>
                                <div className="news__caption pt-6">
                                    <h3 className="news-caption__title">
                                        How COVID-19 has advanced the case for
                                        procurement reform
                                    </h3>
                                    <p className="news-caption__date mt-2">Nov 19, 2020</p>
                                </div>
                            </div>
                            
                        </div>
                            
                       
                    </div>
                </div>
            </section>

            <section className="px-4 py-24">
                <div className="container mx-auto">
                    <div className="text-left">
                        <p className="text-xl blue-50 pb-10">
                            Other News
                        </p>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-2 gap-x-10 gap-y-10 card">
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50">
                                <h3 className="card__title mt-4 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50">
                                <h3 className="card__title mt-4 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50">
                                <h3 className="card__title mt-4 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50">
                                <h3 className="card__title mt-4 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50">
                                <h3 className="card__title mt-4 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50">
                                <h3 className="card__title mt-4 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="flex justify-center pt-10">
                        <Link to="/news" className="text-white bg-primary-blue px-32 py-4 rounded">
                            Load More
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default News
