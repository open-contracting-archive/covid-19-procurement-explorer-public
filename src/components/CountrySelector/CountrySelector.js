import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { setCurrentCountry } from "../../store/reducers/general/action"

const CountrySelector = () => {
    const countries = useSelector((state) => state.general.countries)
    let { countrySlug } = useParams()
    let { tabSlug = 'data' } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const onChange = (event) => {
        const countrySlug = event.target.value
        const country = countries.find((item) => item.slug === countrySlug)
        dispatch(
            setCurrentCountry(country)
        )

        const path = countrySlug === 'global' ? `/global-overview/data` : `/country/${countrySlug}/${tabSlug}`
        // window.location.href = path //todo: remove this
        history.push(path)
    }
    return (
        <div className="countrySelector inline-flex items-center relative">
            <select
                className="cursor-pointer outline-none appearance-none pr-6 font-normal mb-5 text-2xl text-primary-dark capitalize bg-transparent"
                value={countrySlug}
                onChange={onChange}>
                {countries.map((country, index) => (
                    <option
                        key={index}
                        value={country.slug}>
                        {country.slug === 'global' ? 'Global Overview' : country.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CountrySelector
