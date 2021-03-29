import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useTrans from '../../hooks/useTrans'
import FooterImage from '../../assets/img/icons/cc-img.png'
import { ReactComponent as FooterBlob } from '../../assets/img/icons/footer-blob.svg'
import { ReactComponent as FooterIcon } from '../../assets/img/icons/footer-virus-icon.svg'
import OpenContractingPartner from '../../assets/img/open-contracting-partnership.png'
import TransparencyInternational from '../../assets/img/transparency-international.png'
import CmsPageService from '../../services/CmsPageService'

const Footer = () => {
    const { trans } = useTrans()
    const [menuList, setMenuList] = useState([])

    useEffect(() => {
        CmsPageService.StaticMenuList().then((response) => {
            setMenuList(response.items)
        })

        return () => {
            setMenuList([])
        }
    }, [])

    const showFooterMenu = menuList.filter(
        (menu) => menu.show_in_footer_menu === 'Yes'
    )

    return (
        <footer className="relative py-10 md:pt-16 md:pb-20 px-4 text-white text-sm bg-yellow-50 overflow-hidden">
            <div className="container mx-auto relative z-10">
                <div className="grid-cols-12 grid">
                    <div className="col-span-12 md:col-span-4 mb-8">
                        <div className="flex justify-between md:block">
                            <p className="font-bold leading-tight">
                                Covid-19 <br /> Contract <br /> Explorer
                            </p>
                            <div className="md:mt-12">
                                <a href="https://creativecommons.org/">
                                    <img src={FooterImage} alt="" />
                                    <p className="mt-4 opacity-50">
                                        Creative Commons
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 mb-8">
                        <h4 className="mb-2">{trans('Explore')}</h4>
                        <ul>
                            <li className="opacity-50 mb-1 hover:opacity-75 transition">
                                <Link to="/global-overview/data">
                                    {trans('Data')}
                                </Link>
                            </li>
                            <li className="opacity-50 mb-1 hover:opacity-75 transition">
                                <Link to="/global-overview/contracts">
                                    {trans('Contracts')}
                                </Link>
                            </li>
                            <li className="opacity-50 mb-1 hover:opacity-75 transition">
                                <Link to="/global-overview/suppliers">
                                    {trans('List of Suppliers')}
                                </Link>
                            </li>
                            <li className="opacity-50 mb-1 hover:opacity-75 transition">
                                <Link to="/global-overview/buyers">
                                    {trans('List of Buyers')}
                                </Link>
                            </li>
                            <li className="opacity-50 mb-1 hover:opacity-75 transition">
                                <Link to="/global-overview/products">
                                    {trans('Products')}
                                </Link>
                            </li>
                            <li className="opacity-50 hover:opacity-75 transition">
                                <Link to="/resources">
                                    {trans('Resources')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-4 md:col-span-2">
                        <ul className="mt-6 pt-1">
                            {showFooterMenu.map((menu, index) => (
                                <li
                                    key={index}
                                    className="opacity-50 mb-1 hover:opacity-75 transition">
                                    <Link
                                        to={`/pages/${menu.meta.slug}`}
                                        className="capitalize">
                                        {trans(menu.title)}
                                    </Link>
                                </li>
                            ))}

                            {/* <li className="opacity-50 mb-1 hover:opacity-75 transition">
                                <Link to="/pages/about">{trans('About')}</Link>
                            </li>
                            <li className="opacity-50 mb-1 hover:opacity-75 transition">
                                <Link to="/pages/terms-of-use">
                                    {trans('Terms of use')}
                                </Link>
                            </li>
                            <li className="opacity-50 hover:opacity-75 transition">
                                <Link to="/pages/privacy-policy">
                                    {trans('Privacy policy')}
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <p className="mb-3">
                            {trans('Subscribe and get weekly updates')}
                        </p>
                        <form>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Type your email address"
                                    className="px-3 py-4 w-full rounded-sm  text-primary-dark"
                                />
                                <button className=" subscribe absolute right-0 bg-blue-20 h-full p-4 rounded-sm rounded-l-none">
                                    {trans('Subscribe')}
                                </button>
                            </div>
                        </form>
                        <div className="mt-8">
                            <p className="mb-3">
                                {trans('Portal developed by')}
                            </p>
                            <div className="flex items-center flex-wrap">
                                <img
                                    src={OpenContractingPartner}
                                    alt="Open contracting partner logo"
                                    className="mr-6 mb-4 inline-block"
                                />
                                <img
                                    src={TransparencyInternational}
                                    alt="Transparency international logo"
                                    className="mb-4 inline-block"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <FooterIcon
                    className="absolute z-negative"
                    style={{ bottom: '-70px', right: '-30px' }}
                />
            </div>
            <FooterBlob className="absolute bottom-0 left-0" />
        </footer>
    )
}

export default Footer
