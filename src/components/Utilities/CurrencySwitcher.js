import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrency } from '../../store/reducers/general/action'
import Default from '../../constants/Default'

const CurrencySwitcher = () => {
    const selectedCurrency = useSelector((state) => state.general.currency)
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )
    const dispatch = useDispatch()

    const changeCurrency = (currency) => {
        dispatch(setCurrency(currency))
    }

    return (
        <div className="flex justify-end text-sm">
            <div className="flex items-center border border-blue-20 rounded-md">
                <button
                    className={`text-xs p-2 md:text-base rounded-l-md cursor-pointer outline-none appearance-none font-bold uppercase md:px-4 md:py-2 ${
                        selectedCurrency === Default.CURRENCY_USD
                            ? 'text-white bg-primary-dark'
                            : 'opacity-50'
                    } `}
                    onClick={() => changeCurrency(Default.CURRENCY_USD)}
                >
                    USD
                </button>
                <button
                    className={`text-xs p-2 md:text-base rounded-r-md cursor-pointer outline-none appearance-none font-bold uppercase md:px-4 md:py-2 ${
                        selectedCurrency === Default.CURRENCY_LOCAL
                            ? 'text-white bg-primary-dark'
                            : 'opacity-50'
                    }`}
                    onClick={() => changeCurrency(Default.CURRENCY_LOCAL)}
                >
                    {countryCurrency || '---'}
                </button>
            </div>
        </div>
    )
}

export default CurrencySwitcher
