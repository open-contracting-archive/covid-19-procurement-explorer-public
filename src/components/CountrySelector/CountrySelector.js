import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setCurrentLocale,
    setTranslations
} from '../../store/reducers/general/action'
import CountryServices from '../../services/CountryServices'

const countries = [
    { code: '1', name: 'Mexico' },
    { code: '2', name: 'Nepal' },
    { code: '3', name: 'India' }
]

const CountrySelector = () => {
    
    const currentLocale = useSelector((state) => state.general.currentLocale)

    const dispatch = useDispatch()

    const onChange = (e) => {
        dispatch(setCurrentLocale(e.target.value))
        CountryServices.getTranslations(e.target.value).then(
            (response) => {
                dispatch(setTranslations(response))
            }
        )
    }
    return (
        <div className="countrySelector inline-flex items-center relative">
            <select
                className="cursor-pointer outline-none appearance-none pr-6 font-normal mb-5 text-2xl text-primary-dark capitalize bg-transparent"
                onChange={onChange}>
                {countries.map((countries, index) => (
                    <option
                        key={index}
                        value={countries.name}
                        defaultValue={currentLocale === countries.name}>
                        {countries.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CountrySelector
