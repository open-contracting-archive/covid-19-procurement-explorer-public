import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setCurrentLocale,
    setTranslations
} from '../../store/reducers/general/action'
import CountryProfileServices from '../../services/countryProfileServices'

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' }
]

const LanguageSwitcherSelector = () => {
    const currentLocale = useSelector((state) => state.general.currentLocale)

    const dispatch = useDispatch()

    const onChange = (e) => {
        dispatch(setCurrentLocale(e.target.value))
        CountryProfileServices.getTranslations(e.target.value).then(
            (response) => {
                dispatch(setTranslations(response))
            }
        )
    }
    return (
        <div className="lang relative">
            <select
                style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    padding: '5px 20px 5px 10px'
                }}
                className="cursor-pointer outline-none appearance-none bg-transparent py-2 px-3 rounded-3xl uppercase text-xs"
                onChange={onChange}
                defaultValue={currentLocale}>
                {languages.map((language, index) => (
                    <option key={index} value={language.code}>
                        {language.code}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default LanguageSwitcherSelector
