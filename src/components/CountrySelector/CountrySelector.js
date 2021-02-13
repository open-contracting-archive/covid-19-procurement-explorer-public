import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentCountry } from '../../store/reducers/general/action'

const CountrySelector = () => {
    const countries = useSelector((state) => state.general.countries)
    let { countrySlug } = useParams()
    let { tabSlug = 'data' } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const onChange = (event) => {
        const countrySlug = event.target.value
        const country = countries.find((item) => item.slug === countrySlug)
        dispatch(setCurrentCountry(country))

        const path =
            countrySlug === 'global'
                ? `/global-overview/${tabSlug}`
                : `/country/${countrySlug}/${tabSlug}`
        history.push(path)
    }
    return (
        <div className="countrySelector inline-flex items-center relative">
            <select
                className="cursor-pointer outline-none appearance-none pr-6 font-normal mb-3 md:mb-5 text-lg
                md:text-2xl text-primary-dark capitalize bg-transparent"
                value={countrySlug}
                onChange={onChange}>
                {countries.map((country, index) => (
                    <option key={index} value={country.slug}>
                        {country.slug === 'global'
                            ? 'Global Overview'
                            : country.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CountrySelector
