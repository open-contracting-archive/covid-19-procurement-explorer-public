import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentLocale } from '../../store/reducers/general/action'

const LanguageSwitcher = () => {
    const currentLocale = useSelector((state) => state.general.currentLocale)
    const languages = useSelector((state) => state.general.languages)
    const dispatch = useDispatch()
    const onChange = (e) => {
        dispatch(setCurrentLocale(e.target.value))
    }

    return (
        <div className="lang relative">
            <select
                style={{
                    padding: '5px 20px 5px 10px'
                }}
                className="cursor-pointer outline-none appearance-none bg-black bg-opacity-25 py-2 px-3 rounded-3xl text-xs"
                value={currentLocale}
                onChange={onChange}>
                {languages.length > 0 &&
                    languages.map((language, index) => (
                        <option
                            key={index}
                            value={language.code}
                            defaultValue={currentLocale === language.code}>
                            {language.name}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default LanguageSwitcher
