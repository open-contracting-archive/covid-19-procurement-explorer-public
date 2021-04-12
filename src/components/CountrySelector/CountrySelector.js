import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentCountry } from '../../store/reducers/general/action'
import CountryFlag from '../../components/CountryFlagIcon'

const CountrySelector = () => {
    let { countrySlug, tabSlug = 'data' } = useParams()
    const countries = useSelector((state) => state.general.countries)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(() => {
        return countrySlug
            ? countries
                  .find((item) => item.slug === countrySlug)
                  .slug.replace(/-/g, ' ')
            : null
    })
    const history = useHistory()
    const dispatch = useDispatch()

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

    const sortedCountries = countries.sort((a, b) => {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    })

    const countryList = sortedCountries.filter(
        (country) => country.country_code_alpha_2 !== 'gl'
    )

    return (
        <div className="relative country-selector">
            <div>
                <div
                    className="pr-6 mb-3 text-lg font-normal capitalize bg-transparent outline-none appearance-none cursor-pointer md:mb-5 md:text-2xl text-primary-dark"
                    onClick={toggling}>
                    {selectedCountry || 'Global Overview'}
                </div>
                {isOpen && (
                    <div className="absolute z-30 w-64 p-4 space-y-3 text-base text-white rounded md:-mt-5 bg-primary-dark">
                        <div
                            className="cursor-pointer global hover:text-primary-blue"
                            onClick={countrySelected('global')}>
                            <div className="flex items-center">
                                <span>Global Overview</span>
                            </div>
                        </div>

                        {countryList.map((country, index) => (
                            <div
                                onClick={countrySelected(country.slug)}
                                key={index}
                                className={`cursor-pointer ${country.slug} hover:text-primary-blue`}>
                                <div className="flex items-center">
                                    {country.country_code_alpha_2 !== 'gl' ? (
                                        <CountryFlag
                                            className="mr-4 rounded-sm"
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
