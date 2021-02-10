import React from 'react'
import ContractView from "../../constants/ContractView"
import useTrans from "../../hooks/useTrans"

const activeClass = 'active'
const labels = {
    [ContractView.VALUE]: { short: 'By value', long: 'By contract value' },
    [ContractView.NUMBER]: { short: 'By number', long: 'By number of contracts' }
}

const ContractViewSwitcher = (props) => {
    const { viewType = ContractView.VALUE, viewHandler, style = 'long' } = props
    const { trans } = useTrans()

    return (
        <div className="flex justify-end mb-4">
            <ul className="contract-switch flex">
                <li
                    className={`mr-4 cursor-pointer ${
                        viewType === ContractView.VALUE && activeClass
                    }`}
                    onClick={() => viewHandler(ContractView.VALUE)}>
                    {trans(labels[ContractView.VALUE][style])}
                </li>
                <li
                    className={`cursor-pointer ${
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
