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
        <footer className="relative px-4 py-10 overflow-hidden text-sm text-white md:pt-16 md:pb-20 bg-yellow-50">
            <div className="container relative z-10 mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 mb-8 md:col-span-4">
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
                    <div className="col-span-4 mb-8 md:col-span-2">
                        <h4 className="mb-2">{trans('Explore')}</h4>
                        <ul>
                            <li className="mb-1 transition opacity-50 hover:opacity-75">
                                <Link to="/global-overview/data">
                                    {trans('Data')}
                                </Link>
                            </li>
                            <li className="mb-1 transition opacity-50 hover:opacity-75">
                                <Link to="/global-overview/contracts">
                                    {trans('Contracts')}
                                </Link>
                            </li>
                            <li className="mb-1 transition opacity-50 hover:opacity-75">
                                <Link to="/global-overview/suppliers">
                                    {trans('List of Suppliers')}
                                </Link>
                            </li>
                            <li className="mb-1 transition opacity-50 hover:opacity-75">
                                <Link to="/global-overview/buyers">
                                    {trans('List of Buyers')}
                                </Link>
                            </li>
                            <li className="mb-1 transition opacity-50 hover:opacity-75">
                                <Link to="/global-overview/products">
                                    {trans('Products')}
                                </Link>
                            </li>
                            <li className="transition opacity-50 hover:opacity-75">
                                <Link to="/resources">
                                    {trans('Resources')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-4 md:col-span-2">
                        <ul className="pt-1 mt-6">
                            {showFooterMenu.map((menu, index) => (
                                <li
                                    key={index}
                                    className="mb-1 transition opacity-50 hover:opacity-75">
                                    <Link
                                        to={`/pages/${menu.meta.slug}`}
                                        className="capitalize">
                                        {trans(menu.title)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <p className="mb-3">
                            {trans('Subscribe and get weekly updates')}
                        </p>
                        <form>
                            <div className="relative flex items-center">
                                {/* <input
                                    type="text"
                                    placeholder="Type your email address"
                                    className="w-full px-3 py-4 rounded-sm text-primary-dark"
                                />
                                <button className="absolute right-0 h-full p-4 rounded-sm rounded-l-none subscribe bg-blue-20">
                                    {trans('Subscribe')}
                                </button> */}

                                <iframe
                                    src="https://opencontracting.substack.com/embed"
                                    width="480"
                                    height="320"
                                    style={{
                                        border: '1px solid #EEE',
                                        background: 'white'
                                    }}
                                    frameBorder="0"
                                    scrolling="no"></iframe>
                            </div>
                        </form>
                        <div className="mt-8">
                            <p className="mb-3">
                                {trans('Portal developed by')}
                            </p>
                            <div className="flex flex-wrap items-center">
                                <Link
                                    to={{
                                        pathname:
                                            'https://www.open-contracting.org/'
                                    }}
                                    target="_blank">
                                    <img
                                        src={OpenContractingPartner}
                                        alt="Open contracting partner logo"
                                        className="inline-block mb-4 mr-6"
                                    />
                                </Link>

                                <Link
                                    to={{
                                        pathname:
                                            'https://www.transparency.org/en/'
                                    }}
                                    target="_blank">
                                    <img
                                        src={TransparencyInternational}
                                        alt="Transparency international logo"
                                        className="inline-block mb-4"
                                    />
                                </Link>
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
