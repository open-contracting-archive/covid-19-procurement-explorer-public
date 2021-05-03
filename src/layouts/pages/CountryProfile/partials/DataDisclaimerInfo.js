import React from 'react'
import { Link } from 'react-router-dom'
import { T } from '@transifex/react'

const DataDisclaimerInfo = (props) => {
    const { forwardUrl = null } = props

    return (
        <div className="md:-mt-10 mb-6">
            <p>
                <T _str="While we’ve done our best to identify, include, and verify as much information as possible, it will be incomplete." />
                <br />
                <T _str="Please check our" />{' '}
                {forwardUrl ? (
                    <Link to={forwardUrl} className="text-primary-blue">
                        <T _str="methodology" />
                    </Link>
                ) : (
                    <T _str="methodology" />
                )}{' '}
                <T _str="for general limitations and country-specific caveats." />
            </p>
        </div>
    )
}

export default DataDisclaimerInfo
