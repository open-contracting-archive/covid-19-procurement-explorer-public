import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { T } from '@transifex/react'

const Breadcrumb = ({ item }) => {
    const linkSlug = () => {
        return item === 'blog' ? 'blogs' : item
    }

    return (
        <div className="text-sm mb-4 text-blue-5">
            <Link to="/library" className="cursor-pointer text-primary-blue">
                <T _str="Library" />
            </Link>

            <span className="breadcrumb-separator" />
            {item !== undefined ? (
                <Link
                    to={`/${linkSlug()}`}
                    className="cursor-pointer text-primary-blue capitalize">
                    {linkSlug()}
                </Link>
            ) : (
                ''
            )}
        </div>
    )
}

Breadcrumb.propTypes = {
    item: PropTypes.string
}

export default Breadcrumb
