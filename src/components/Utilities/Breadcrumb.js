import React from 'react'
import { Link } from 'react-router-dom'
import useTrans from '../../hooks/useTrans'

const Breadcrumb = ({ item }) => {
    const linkSlug = () => {
        return item === 'blog' ? 'blogs' : item
    }
    const { trans } = useTrans()

    return (
        <div className="text-sm mb-4 text-blue-5">
            <Link to="/library" className="cursor-pointer text-primary-blue">
                {trans('Library')}
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
export default Breadcrumb
