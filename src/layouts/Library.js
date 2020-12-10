import React from 'react'
import newsImage from '../assets/img/news.jpg'
import { Link } from 'react-router-dom'


function Library() {
    return (
        <div className="">
            <section className="news px-4 py-24 bg-primary-gray -mt-8">
                <div className="container mx-auto">
                    <p className="text-2xl mb-10">
                        Library
                    </p>
                    <div className="grid grid-cols-2 gap-x-20">
                        <div className="display__item">
                            <p className="text-xl mb-6 ">
                                News
                            </p>
                            <div className="news__item">
                                <div className="img-wrapper relative">
                                    <img src={newsImage} alt="" />
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
                        <div className="list__item">
                        <p className="text-lg mb-6 mt-4 uppercase">
                            Recent Posts
                        </p>
                            <div className="news__item flex">
                                <div className="img-wrapper h-auto">
                                    <img src={newsImage} alt="" />
                                </div>
                                <div className="news__caption pl-6">
                                    <h3 className="news-caption__title">
                                        How COVID-19 has advanced the case for
                                        procurement reform
                                    </h3>
                                    <p className="news-caption__date mt-2">Nov 19, 2020</p>
                                </div>
                            </div>
                            <div className="news__item flex">
                                <div className="img-wrapper h-auto">
                                    <img src={newsImage} alt="" />
                                </div>
                                <div className="news__caption pl-6">
                                    <h3 className="news-caption__title">
                                        How COVID-19 has advanced the case for
                                        procurement reform
                                    </h3>
                                    <p className="news-caption__date mt-2">Nov 19, 2020</p>
                                </div>
                            </div>
                            <div className="news__item flex">
                                <div className="img-wrapper h-auto">
                                    <img src={newsImage} alt="" />
                                </div>
                                <div className="news__caption pl-6">
                                    <h3 className="news-caption__title">
                                        How COVID-19 has advanced the case for
                                        procurement reform
                                    </h3>
                                    <p className="news-caption__date mt-2">Nov 19, 2020</p>
                                </div>
                            </div>
                        </div>
                            
                       
                    </div>
                    <div className="flex justify-end pt-10">
                            <Link to="/news" className="text-blue-20">
                                View all news --&gt;{' '}
                            </Link>
                    </div>
                </div>
            </section>
            
            <section className="px-4 py-24 blog">
                <div className="container mx-auto">
                    <div className="text-center">
                        <p className="text-xl blue-50 pb-10">
                            Blogs
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
                        <Link to="/blogs" className="text-blue-20">
                            View all blogs --&gt;{' '}
                        </Link>
                    </div>
                </div>
            </section>
            <section className="px-4 events bg-primary-gray py-24">
                <div className="container mx-auto">
                    <div className="text-center">
                        <p className="text-xl blue-50 pb-10">
                            Upcoming Events
                        </p>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-x-4 gap-y-4 card">
                        <div className="card__item px-8 py-8">
                            <div className="card__day text-4xl">
                                13
                            </div>
                            <div className="card__month text-base uppercase">
                                Dec
                            </div>
                            <div className="card__caption">
                                <h3 className="card__title mt-8 mb-4 text-lg">
                                    A Procurement Path to Equity: Virtual Report Launch
                                </h3>
                                <p className="card__time opacity-50 text-base mb-4">8A.M - 5P.M</p>
                                <p className="card__venue text-base">Aspen Institute Center for Urban Innovation.</p>
                            </div>
                        </div>
                        <div className="card__item px-8 py-8">
                            <div className="card__day text-4xl">
                                13
                            </div>
                            <div className="card__month text-base uppercase">
                                Dec
                            </div>
                            <div className="card__caption">
                                <h3 className="card__title mt-8 mb-4 text-lg">
                                    A Procurement Path to Equity: Virtual Report Launch
                                </h3>
                                <p className="card__time opacity-50 text-base mb-4">8A.M - 5P.M</p>
                                <p className="card__venue text-base">Aspen Institute Center for Urban Innovation.</p>
                            </div>
                        </div>
                        <div className="card__item px-8 py-8">
                            <div className="card__day text-4xl">
                                13
                            </div>
                            <div className="card__month text-base uppercase">
                                Dec
                            </div>
                            <div className="card__caption">
                                <h3 className="card__title mt-8 mb-4 text-lg">
                                    A Procurement Path to Equity: Virtual Report Launch
                                </h3>
                                <p className="card__time opacity-50 text-base mb-4">8A.M - 5P.M</p>
                                <p className="card__venue text-base">Aspen Institute Center for Urban Innovation.</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex justify-center pt-10">
                        <Link to="/events" className="text-blue-20">
                            View all Events --&gt;{' '}
                        </Link>
                    </div>
                </div>
            </section>
            <section className="px-4 resources py-24">
                <div className="container mx-auto">
                    <div className="text-center">
                        <p className="text-xl blue-50 pb-10">
                            Resources
                        </p>
                    </div>
                    <div className="grid grid-cols-4 grid-rows-2 gap-x-6 gap-y-6 card">
                        <div className="card__item rounded px-6 py-6">
                            <div className="card__caption">
                                <h3 className="card__title mb-4 text-lg">
                                    A Procurement Path to Equity: Strategies for Government and the Business Ecosystem
                                </h3>
                                <div className="download flex">
                                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z" fill="#1FBBEC"/>
                                    </svg>
                                    <a className="text-blue-20 test-sm ml-1" href="#"> Download </a>
                                </div>
                            </div> 
                        </div>
                        <div className="card__item rounded px-6 py-6">
                            <div className="card__caption">
                                <h3 className="card__title mb-4 text-lg">
                                    A Procurement Path to Equity: Strategies for Government and the Business Ecosystem
                                </h3>
                                <div className="download flex">
                                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z" fill="#1FBBEC"/>
                                    </svg>
                                    <a className="text-blue-20 test-sm ml-1" href="#"> Download </a>
                                </div>
                            </div> 
                        </div>
                        <div className="card__item rounded px-6 py-6">
                            <div className="card__caption">
                                <h3 className="card__title mb-4 text-lg">
                                    A Procurement Path to Equity: Strategies for Government and the Business Ecosystem
                                </h3>
                                <div className="download flex">
                                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z" fill="#1FBBEC"/>
                                    </svg>
                                    <a className="text-blue-20 test-sm ml-1" href="#"> Download </a>
                                </div>
                            </div> 
                        </div>
                        <div className="card__item rounded px-6 py-6">
                            <div className="card__caption">
                                <h3 className="card__title mb-4 text-lg">
                                    A Procurement Path to Equity: Strategies for Government and the Business Ecosystem
                                </h3>
                                <div className="download flex">
                                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z" fill="#1FBBEC"/>
                                    </svg>
                                    <a className="text-blue-20 test-sm ml-1" href="#"> Download </a>
                                </div>
                            </div> 
                        </div>
                        <div className="card__item rounded px-6 py-6">
                            <div className="card__caption">
                                <h3 className="card__title mb-4 text-lg">
                                    A Procurement Path to Equity: Strategies for Government and the Business Ecosystem
                                </h3>
                                <div className="download flex">
                                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z" fill="#1FBBEC"/>
                                    </svg>
                                    <a className="text-blue-20 test-sm ml-1" href="#"> Download </a>
                                </div>
                            </div> 
                        </div>
                        <div className="card__item rounded px-6 py-6">
                            <div className="card__caption">
                                <h3 className="card__title mb-4 text-lg">
                                    A Procurement Path to Equity: Strategies for Government and the Business Ecosystem
                                </h3>
                                <div className="download flex">
                                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z" fill="#1FBBEC"/>
                                    </svg>
                                    <a className="text-blue-20 test-sm ml-1" href="#"> Download </a>
                                </div>
                            </div> 
                        </div>
                        <div className="card__item rounded px-6 py-6">
                            <div className="card__caption">
                                <h3 className="card__title mb-4 text-lg">
                                    A Procurement Path to Equity: Strategies for Government and the Business Ecosystem
                                </h3>
                                <div className="download flex">
                                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z" fill="#1FBBEC"/>
                                    </svg>
                                    <a className="text-blue-20 test-sm ml-1" href="#"> Download </a>
                                </div>
                            </div> 
                        </div>
                        <div className="card__item rounded px-6 py-6">
                            <div className="card__caption">
                                <h3 className="card__title mb-4 text-lg">
                                    A Procurement Path to Equity: Strategies for Government and the Business Ecosystem
                                </h3>
                                <div className="download flex">
                                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z" fill="#1FBBEC"/>
                                    </svg>
                                    <a className="text-blue-20 test-sm ml-1" href="#"> Download </a>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="flex justify-center pt-10">
                        <Link to="#" className="text-blue-20">
                            View all Resources --&gt;{' '}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Library