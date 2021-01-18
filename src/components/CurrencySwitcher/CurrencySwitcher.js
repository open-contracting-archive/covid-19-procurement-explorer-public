import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrency } from '../../store/reducers/general/action'
import Default from "../../constants/Default"

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
        <div className="currency relative ml-3 border-blue-0 rounded-md overflow-hidden text-sm">
            <button
                style={{
                    padding: '6px 8px'
                }}
                className={`cursor-pointer outline-none appearance-none font-bold uppercase ${
                    selectedCurrency === 'usd'
                        ? 'text-white bg-primary-dark'
                        : 'opacity-50'
                } `}
                onClick={() => changeCurrency(Default.CURRENCY_USD)}>
                USD
            </button>
            <button
                style={{
                    padding: '6px 8px'
                }}
                className={`cursor-pointer outline-none appearance-none font-bold uppercase ${
                    selectedCurrency === 'local'
                        ? 'text-white bg-primary-dark'
                        : 'opacity-50'
                }`}
                onClick={() => changeCurrency(Default.CURRENCY_LOCAL)}>
                {countryCurrency || '---'}
            </button>
        </div>
    )
}

export default CurrencySwitcher
