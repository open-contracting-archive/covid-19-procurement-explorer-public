import React from 'react'
import { NavLink } from 'react-router-dom'
import useTrans from '../../hooks/useTrans'
import LanguageSwitcherSelector from '../language-switcher/languageSwitcherSelector'
const Header = () => {
    const { trans } = useTrans()
    return (
        <div className="py-4 px-4 absolute top-0 w-full z-10">
            <div className="container text-white [ mx-auto ] [ flex justify-between items-center ]">
                <div className="w-24 leading-none">
                    <NavLink to="/" className="leading-snug font-bold">
                        <span className="block" style={{color: "#C8D419"}}>Covid-19</span>
                        <span className="block" style={{color: "#1FBBEC"}}>Procurement</span>
                        Explorer
                    </NavLink>
                </div>
                <div className="flex items-center text-sm">
                    <ul className="flex">
                        <li className="mr-8">
                            <NavLink activeClassName="active" to="/about">
                                {trans('About')}
                            </NavLink>
                        </li>
                        <li className="mr-8">
                            <NavLink activeClassName="active" to="/country/1">
                                {trans('Mexico')}
                            </NavLink>
                        </li>
                        <li className="mr-8">
                            <NavLink activeClassName="active" to="/country/2">
                                {trans('Kenya')}
                            </NavLink>
                        </li>
                    </ul>
                    <LanguageSwitcherSelector />
                </div>
            </div>
        </div>
    )
}

export default Header
