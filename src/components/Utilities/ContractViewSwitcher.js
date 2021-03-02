import React from 'react'
import ContractView from '../../constants/ContractView'
import useTrans from '../../hooks/useTrans'

const activeClass = 'active'
const labels = {
    [ContractView.VALUE]: { short: 'By value', long: 'By contract value' },
    [ContractView.NUMBER]: {
        short: 'By number',
        long: 'By number of contracts'
    }
}

const ContractViewSwitcher = (props) => {
    const {
        viewType = ContractView.VALUE,
        viewHandler,
        style = 'short'
    } = props
    const { trans } = useTrans()

    return (
        <div className="w-full md:w-auto flex justify-start md:justify-end">
            <ul className="contract-switch flex flex-1 text-center md:text-left">
                <li
                    className={`w-1/2 md:w-auto mr-4 cursor-pointer text-base ${
                        viewType === ContractView.VALUE && activeClass
                    }`}
                    onClick={() => viewHandler(ContractView.VALUE)}>
                    {trans(labels[ContractView.VALUE][style])}
                </li>
                <li
                    className={`w-1/2 md:w-auto cursor-pointer text-base ${
                        viewType === ContractView.NUMBER && activeClass
                    }`}
                    onClick={() => viewHandler(ContractView.NUMBER)}>
                    {trans(labels[ContractView.NUMBER][style])}
                </li>
            </ul>
        </div>
    )
}
export default ContractViewSwitcher
