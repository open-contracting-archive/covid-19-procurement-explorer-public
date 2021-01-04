import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useTrans from '../../hooks/useTrans'
import LanguageSwitcherSelector from '../../components/LanguageSwitcher/LanguageSwitcherSelector'

const Header = () => {
    const [isHome, setIsHome] = useState(true)
    const { trans } = useTrans()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsHome(false)
        } else {
            setIsHome(true)
        }
    }, [location])

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
                            Explorer
                        </NavLink>
                    </div>
                    <div className="flex items-center text-sm">
                        <ul className="flex">
                            <li className="mr-8">
                                <NavLink
                                    activeClassName="active"
                                    to="/pages/about">
                                    {trans('About')}
                                </NavLink>
                            </li>
                            <li className="mr-8">
                                <NavLink
                                    activeClassName="active"
                                    to="/global-overview">
                                    {trans('Data')}
                                </NavLink>
                            </li>
                            <li className="mr-8">
                                <NavLink activeClassName="active" to="/library">
                                    {trans('Library')}
                                </NavLink>
                            </li>
                            <li className="mr-8">
                                <NavLink
                                    activeClassName="active"
                                    to="/resources">
                                    {trans('Resources')}
                                </NavLink>
                            </li>
                        </ul>
                        <LanguageSwitcherSelector />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
