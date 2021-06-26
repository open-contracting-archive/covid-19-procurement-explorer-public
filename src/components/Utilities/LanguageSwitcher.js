import React from 'react'
import { sortedItemsByKey } from '../../helpers/general'
import {
    useLocale,
    useSwitchLocale,
    useAvailableLocales
} from '../../context/LocaleProvider'

const LanguageSwitcher = () => {
    const languages = useAvailableLocales()
    const currentLocale = useLocale()
    const switchLocale = useSwitchLocale()
    const setLocale = (locale) => {
        switchLocale(locale)
        window.location.reload()
    }

    return (
        languages.length > 0 && (
            <div className="lang relative">
                <select
                    style={{
                        padding: '5px 20px 5px 10px'
                    }}
                    className="cursor-pointer outline-none appearance-none bg-black bg-opacity-25 py-2 px-3 rounded-3xl text-xs"
                    onChange={(e) => setLocale(e.target.value)}>
                    {sortedItemsByKey(languages, 'name').map(
                        (language, index) => (
                            <option
                                key={index}
                                value={language.code}
                                selected={currentLocale === language.code}>
                                {language.name}
                            </option>
                        )
                    )}
                </select>
            </div>
        )
    )
}

export default LanguageSwitcher
