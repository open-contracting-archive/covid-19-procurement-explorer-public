import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tx } from '@transifex/native'
import { useLanguages } from '@transifex/react'
import { setCurrentLocale } from '../../store/reducers/general/action'
import { sortedItemsByKey } from '../../helpers/general'

const LanguageSwitcher = () => {
    const currentLocale = useSelector((state) => state.general.currentLocale)
    const dispatch = useDispatch()
    const languages = useLanguages()
    const onChange = (e) => {
        tx.setCurrentLocale(e.target.value)
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
                    sortedItemsByKey(languages, 'name').map(
                        (language, index) => (
                            <option
                                key={index}
                                value={language.code}
                                defaultValue={currentLocale === language.code}>
                                {language.name}
                            </option>
                        )
                    )}
            </select>
        </div>
    )
}

export default LanguageSwitcher
