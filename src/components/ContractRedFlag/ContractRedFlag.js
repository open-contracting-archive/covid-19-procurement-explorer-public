import React from 'react'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'

const contract_red_flag_data = [
    {
        name: 'Direct contract or single bid received',
        value: 50
    },
    {
        name:
            'Contract value is higher or lower than average for this item category',
        value: 21
    },
    {
        name: 'Contract value is higher than tender value',
        value: 150
    },
    {
        name:
            'Contract is awarded to supplier that has won a disproportionate number of contracts of the same type',
        value: 10
    },
    {
        name:
            'Contract is awarded to supplier that has similar information (address, number, legal representative) to other suppliers for the same buyer',
        value: 39
    },
    {
        name: 'Direct contract or single bid received',
        value: 87
    },
    {
        name:
            'Contract is awarded to supplier that has won a disproportionate number of contracts of the same type',
        value: 32
    },
    {
        name:
            'Contract value is higher or lower than average for this item category',
        value: 76
    }
]

function ContractRedFlag() {
    return (
        <div className="bg-white rounded p-6 h-full">
            <h3 className="uppercase font-bold flex items-center text-primary-dark mb-6">
                Contracts with red flags
                <FlagIcon className="ml-2 inline-block" />
            </h3>
            <div>
                <div className="custom-horizontal-bar">
                    <ul className="custom-scrollbar h-80 overflow-y-auto pr-4">
                        {contract_red_flag_data.map((mapped_data, index) => {
                            return (
                                <li key={index}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="pr-16">
                                                {mapped_data.name}
                                            </h3>
                                        </div>
                                        <div>
                                            <span className="font-bold">
                                                {mapped_data.value}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ContractRedFlag
