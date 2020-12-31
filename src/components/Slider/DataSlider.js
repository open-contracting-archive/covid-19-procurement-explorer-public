import React from 'react'
import mexicanaImage from '../../assets/img/mexicana.svg'
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

const Slider = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            >
            <SwiperSlide>
                <div className="bg-white rounded p-4 simple-tab text-primary-dark">
                    <h3 className="uppercase font-bold  mb-6">
                        Country partner organization
                    </h3>
                    <h2 className="text-xl mb-2 ">Transparency Mexicana</h2>
                    <div className="flex justify-between px-12 md:flex-nowrap flex-wrap">
                        <div className="w-full md:w-1/2">
                            <p className="text-base  mb-6 md:mb-2">At the beginning of 1999, a group of Mexicans concerned about global
                            corruption problems, particularly those of our country, decided to create 
                            Transparencia Mexicana. It is a non-  governmental organization that faces the problem 
                            of corruption from a comprehensive perspective, through public policies and private attitudes
                            that go beyond the political slogan, to generate concrete changes in the institutional 
                            framework and in the culture of the legality in Mexico.</p>
                        </div>
                        <div className="text-sm mb-6">
                            <p className="">Website</p>
                            <a href="" className="mb-6 text-blue-20">https://www.tm.org.mx/</a>
                            <p className="">Email</p>
                            <a href="" className="mb-6 text-blue-20">info@tm.org.mx</a>
                        </div>
                        <div className="">
                            <img src={mexicanaImage} alt="" className=""/>
                        </div>

                    </div>
                    <Link to="/resources" className="text-blue-20 opacity-50">
                        &lt;-- Previous{' '}
                    </Link>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="bg-white rounded p-4 simple-tab text-primary-dark">
                    <h3 className="uppercase font-bold  mb-6">
                        Country partner organization
                    </h3>
                    <h2 className="text-xl mb-2 ">Transparency Mexicana</h2>
                    <div className="flex justify-between px-12 md:flex-nowrap flex-wrap">
                        <div className="w-full md:w-1/2">
                            <p className="text-base  mb-6 md:mb-2">At the beginning of 1999, a group of Mexicans concerned about global
                            corruption problems, particularly those of our country, decided to create 
                            Transparencia Mexicana. It is a non-  governmental organization that faces the problem 
                            of corruption from a comprehensive perspective, through public policies and private attitudes
                            that go beyond the political slogan, to generate concrete changes in the institutional 
                            framework and in the culture of the legality in Mexico.</p>
                        </div>
                        <div className="text-sm mb-6">
                            <p className="">Website</p>
                            <a href="" className="mb-6 text-blue-20">https://www.tm.org.mx/</a>
                            <p className="">Email</p>
                            <a href="" className="mb-6 text-blue-20">info@tm.org.mx</a>
                        </div>
                        <div className="">
                            <img src={mexicanaImage} alt="" className=""/>
                        </div>

                    </div>
                    <Link to="/resources" className="text-blue-20 opacity-50">
                        &lt;-- Previous{' '}
                    </Link>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}
export default Slider