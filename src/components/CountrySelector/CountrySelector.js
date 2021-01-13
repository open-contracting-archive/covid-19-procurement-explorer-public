import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
    setCurrentLocale,
    setTranslations
} from '../../store/reducers/general/action'
import CountryService from '../../services/CountryService'

const countries = [
    { code: '1', name: 'Mexico' },
    { code: '2', name: 'Nepal' },
    { code: '3', name: 'India' }
]

const CountrySelector = () => {
    const countries = useSelector((state) => state.general.countries)
    let { countrySlug } = useParams()
    const history = useHistory()
    // const currentLocale = useSelector((state) => state.general.currentLocale)
    // const dispatch = useDispatch()

    const onChange = (event) => {
        let countrySlug = event.target.value
        let path = countrySlug === 'global' ? `/global-overview/data` : `/country/${countrySlug}/data`
        history.push(path)

        // dispatch(setCurrentLocale(countrySlug))
        // CountryServices.getTranslations(countrySlug).then(
        //     (response) => {
        //         dispatch(setTranslations(response))
        //     }
        // )
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
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CountrySelector
