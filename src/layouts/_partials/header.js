import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { T } from '@transifex/react'
import CmsPageService from '../../services/CmsPageService'
import { LanguageSwitcher } from '../../components/Utilities'

const fixedMenuItems = [
    { title: 'Data', route: '/global-overview/data' },
    { title: 'Library', route: '/library' },
    { title: 'Resources', route: '/resources' }
]

const Header = () => {
    const [isHome, setIsHome] = useState(true)
    const [menuList, setMenuList] = useState([])
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsHome(false)
        } else {
            setIsHome(true)
        }
    }, [location])

    useEffect(() => {
        CmsPageService.StaticMenuList().then((response) => {
            setMenuList(response.items)
        })

        return () => {
            setMenuList([])
        }
    }, [])

    const showHeaderMenu = menuList.filter(
        (menu) => menu.show_in_header_menu === 'Yes'
    )

    return (
        <div
            className={`overflow-hidden ${
                isHome ? 'header-container' : 'header-inner-container'
            }`}>
            <header
                className={`py-4 px-4 absolute top-0 w-full z-10 ${
                    isHome ? 'header-home' : 'header-inner'
                } `}>
                <div className="container text-white [ mx-auto ] [ flex justify-between items-center ]">
                    <div className="w-24 leading-none">
                        <NavLink to="/" className="leading-tight font-bold">
                            <span className="block text-yellow-20">
                                Covid-19
                            </span>
                            <span className="block text-blue-20">Contract</span>
                            <span className="text-white">Explorer</span>
                        </NavLink>
                    </div>
                    <div className="flex items-center text-sm">
                        <ul className="flex">
                            {showHeaderMenu.map((menu, index) => (
                                <li key={index} className="mr-2 md:mr-8">
                                    <NavLink
                                        activeClassName="active"
                                        to={`/pages/${menu.meta.slug}`}
                                        className="capitalize">
                                        <T _str={menu.title} />
                                    </NavLink>
                                </li>
                            ))}

                            {fixedMenuItems.map((item, index) => (
                                <li className="mr-2 md:mr-8" key={index}>
                                    <NavLink
                                        activeClassName="active"
                                        to={item.route}>
                                        <T _str={item.title} />
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <LanguageSwitcher />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
