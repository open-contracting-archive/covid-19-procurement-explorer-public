import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setCurrentLocale,
    setTranslations
} from '../../store/reducers/general/action'
import CountryServices from '../../services/CountryServices'

const mexiciancurrency = [
    { code: 'MXN', name: 'Mexician' }
]

const americiancurrency = [
    { code: 'USD', name: 'Dollor' }
]

const CurrencySwitcher = () => {
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
        <div className="currency relative ml-3 border-blue-0 rounded">
            <button
                style={{
                    padding: '6px 8px'
                }}
                className="cursor-pointer outline-none appearance-none font-bold opacity-50"
                onChange={onChange}>
                {mexiciancurrency.map((mexiciancurrency, index) => (
                    // <option
                    //     key={index}
                    //     value={mexiciancurrency.code}
                    //     defaultValue={currentLocale === mexiciancurrency.code}>
                    //     {mexiciancurrency.code}
                    // </option>
                    <>
                    {mexiciancurrency.code}
                    </>
                ))}
                
            </button>
            <button
                style={{
                    padding: '6px 8px'
                }}
                className="cursor-pointer outline-none appearance-none font-bold text-white bg-primary-dark rounded"
                onChange={onChange}>
                {americiancurrency.map((americiancurrency, index) => (
                    // <option
                    //     key={index}
                    //     value={americiancurrency.code}
                    //     defaultValue={currentLocale === americiancurrency.code}>
                    //     {americiancurrency.code}
                    // </option>
                    <>
                        {americiancurrency.code}
                    </>
                ))}
                
            </button>
        </div>
    )
}

export default CurrencySwitcher
