import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setCurrentLocale,
    setTranslations
} from '../../store/reducers/general/action'
import CountryService from '../../services/CountryService'

const languages = [
    { code: 'en', name: 'English' },
]

const LanguageSwitcher = () => {
    // const languages = useSelector((state) => state.general.languages)
    const currentLocale = useSelector((state) => state.general.currentLocale)
    const dispatch = useDispatch()

    const onChange = (e) => {
        dispatch(setCurrentLocale(e.target.value))
        CountryService.getTranslations(e.target.value).then(
            (response) => {
                dispatch(setTranslations(response))
            }
        )
    }
    return (
        <div className="lang relative">
            <select
                style={{
                    padding: '5px 20px 5px 10px'
                }}
                className="cursor-pointer outline-none appearance-none bg-black bg-opacity-25 py-2 px-3 rounded-3xl uppercase text-xs"
                value={currentLocale}
                onChange={onChange}>
                {languages.map((language, index) => (
                    <option
                        key={index}
                        value={language.code}
                        defaultValue={currentLocale === language.code}>
                        {language.code}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default LanguageSwitcher
