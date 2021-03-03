import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentCountry } from '../../store/reducers/general/action'
import CountryFlag from '../../components/CountryFlagIcon'

const CountrySelector = () => {
    const countries = useSelector((state) => state.general.countries)
    let { countrySlug } = useParams()
    let { tabSlug = 'data' } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(() => {
        return countrySlug
            ? countries.find((item) => item.slug === countrySlug).slug
            : null
    })

    const toggling = () => setIsOpen(!isOpen)

    const countrySelected = (selectedCountrySlug) => () => {
        let path = `/global-overview/${tabSlug}`
        const country = countries.find(
            (item) => item.slug === selectedCountrySlug
        )

        if (selectedCountrySlug !== 'global') {
            path = `/country/${selectedCountrySlug}/${tabSlug}`
            dispatch(setCurrentCountry(country))
            setSelectedCountry(selectedCountrySlug)
        }

        history.push(path)
        setIsOpen(false)
    }

    const sortedCountries = countries.sort(function (a, b) {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    })

    return (
        <div className="country-selector relative">
            <div>
                <div
                    className="cursor-pointer outline-none appearance-none pr-6 font-normal mb-3 md:mb-5 text-lg md:text-2xl text-primary-dark capitalize bg-transparent"
                    onClick={toggling}>
                    {selectedCountry || 'Global Overview'}
                </div>
                {isOpen && (
                    <div className="md:-mt-5 absolute bg-primary-dark p-4 rounded text-base text-white w-64 z-30 space-y-3">
                        {sortedCountries.map((country, index) => (
                            <div
                                onClick={countrySelected(country.slug)}
                                key={index}
                                className={`cursor-pointer ${country.slug} hover:text-primary-blue`}>
                                <div className="flex items-center">
                                    {country.country_code_alpha_2 !== 'gl' ? (
                                        <CountryFlag
                                            className="rounded-sm mr-4"
                                            code={country.country_code_alpha_2.toLowerCase()}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    <span>
                                        {country.slug === 'global'
                                            ? 'Global Overview'
                                            : country.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CountrySelector
