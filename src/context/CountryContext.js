import React, { useContext } from 'react'
import PropTypes from 'prop-types'

const CountryContext = React.createContext({})

export function useCountry() {
    return useContext(CountryContext)
}

export function CountryWrapper(props) {
    const { children, country } = props

    return (
        <CountryContext.Provider value={country}>
            {children}
        </CountryContext.Provider>
    )
}

CountryWrapper.propTypes = {
    country: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired
}
