import { useSelector } from 'react-redux'
import ContractView from '../constants/ContractView'
import Default from '../constants/Default'

const useContractTransformers = () => {
    const currency = useSelector((state) => state.general.currency)
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )
    return {
        valueField: (viewType) => {
            return viewType === ContractView.NUMBER
                ? Default.TENDER_COUNT
                : currency === Default.CURRENCY_LOCAL
                ? Default.AMOUNT_LOCAL
                : Default.AMOUNT_USD
        },
        currencyCode: (viewType) => {
            return viewType === ContractView.NUMBER
                ? ''
                : currency === Default.CURRENCY_LOCAL
                ? countryCurrency
                : Default.CURRENCY_USD
        }
    }
}

export default useContractTransformers
