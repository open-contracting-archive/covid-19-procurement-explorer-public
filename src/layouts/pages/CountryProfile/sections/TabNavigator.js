import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { T } from '@transifex/react'
import { tabItems } from '../../../../constants/Tab'

const TabNavigator = (props) => {
    const { endpoint, countrySlug } = props
    const pathTo = (tabItem) => {
        return countrySlug !== undefined
            ? `/${endpoint}/${countrySlug}/${tabItem}`
            : `/${endpoint}/${tabItem}`
    }

    return (
        <div className="container mx-auto mt-4 md:mt-12 px-4 md:px-0">
            <div className="secondary-nav">
                <ul className="overflow-x-auto">
                    {tabItems().map((item, index) => {
                        return (
                            <li key={index}>
                                <NavLink
                                    activeClassName="active"
                                    className={'capitalize'}
                                    to={pathTo(item)}
                                >
                                    <T _str={item} />
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

TabNavigator.propTypes = {
    endpoint: PropTypes.string.isRequired,
    countrySlug: PropTypes.string
}
export default TabNavigator
