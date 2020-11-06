import { get, isEmpty } from 'lodash'
import { useSelector } from 'react-redux'

const useTrans = () => {
    const translations = useSelector((state) => state.general.translations)
    const currentLocale = useSelector((state) => state.general.currentLocale)

    return {
        trans: (key, { replace, locale } = {}) => {
            let translated = get(
                translations[locale || currentLocale],
                key,
                key
            )

            if (replace && !isEmpty(replace)) {
                Object.entries(replace).forEach(([key, value]) => {
                    translated = translated.replace(key, value)
                })
            }

            return translated
        }
    }
}

export default useTrans
