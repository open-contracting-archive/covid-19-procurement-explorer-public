import React, { useState, useEffect } from 'react'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'
import VisualizationService from "../../services/VisualizationService"
import CardContainer from "../Utilities/CardContainer"

const ContractRedFlags = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Contracts with red flags',
        params,
        helpText = 'The methodology of red flags calculation can be found here.'
    } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ContractRedFlags(params)
            .then((response) => {
                if (response.result) {
                    setOriginalData(response.result)
                }
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })

        return () => {
            setOriginalData([])
        }
    }, [params?.country, params?.buyer, params?.supplier])

    return (
        <CardContainer
            loading={loading}
            label={label}
            appendClass={'h-full'}
            helpText={helpText}
            symbol={<FlagIcon className="ml-2 inline-block" />}>
            <div className="custom-horizontal-bar">
                <ul className="custom-scrollbar h-80 overflow-y-auto pr-4">
                    {originalData.map((item, index) => (
                        <li key={index}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="pr-16">
                                        {item.red_flag}
                                    </h3>
                                </div>
                                <div>
                                    <span className="font-bold">
                                        {item.tender_count}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </CardContainer>
    )
}

export default ContractRedFlags
