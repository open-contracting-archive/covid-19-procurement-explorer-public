import newsImage from '../assets/img/news.jpg'
import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import * as dayjs from 'dayjs'
import { API_URL } from '../helpers'

function Tags() {
    return (
        <div className="">
            <section className="px-4 py-24 tags -mt-8">
                <div className="container mx-auto">
                    
                   <p className="text-2xl mb-10">
                        Tags
                    </p>
                    <p className="mb-8">
                        37 <span className="opacity-50">results found</span> 
                    </p>
                    <div className="grid grid-cols-3 grid-rows-2 gap-x-10 gap-y-10 card">
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50  mt-4">
                                <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">Corona</label>
                                <h3 className="card__title mt-1 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50  mt-4">
                                <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">Corona</label>
                                <h3 className="card__title mt-1 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50  mt-4">
                                <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">Corona</label>
                                <h3 className="card__title mt-1 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50  mt-4">
                                <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">Corona</label>
                                <h3 className="card__title mt-1 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50  mt-4">
                                <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">Corona</label>
                                <h3 className="card__title mt-1 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50  mt-4">
                                <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">Corona</label>
                                <h3 className="card__title mt-1 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50  mt-4">
                                <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">Corona</label>
                                <h3 className="card__title mt-1 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50  mt-4">
                                <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">Corona</label>
                                <h3 className="card__title mt-1 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                        <div className="card__item">
                            <div className="img-wrapper">
                                <img src={newsImage} alt="" />
                            </div>
                            <div className="card__caption  text-blue-50  mt-4">
                                <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">Corona</label>
                                <h3 className="card__title mt-1 mb-2 text-lg">
                                    Improving disclosure and value for money in health procurement in Uganda
                                </h3>
                                <p className="card__date opacity-50 text-sm">Nov 19, 2020</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default Tags