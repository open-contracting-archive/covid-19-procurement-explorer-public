import React, { useState, useEffect } from 'react'
import VisualizationService from '../../services/VisualizationService'
import { CardContainer, ErrorHandler } from '../Utilities'
import Default from '../../constants/Default'
import Icon from '../../assets/img/icons'

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
    const [error, setError] = useState(false)

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ContractRedFlags(params)
            .then((response) => {
                setLoading(false)
                if (response.result) {
                    setOriginalData(response.result)
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                setError(true)
            })

        return () => {
            setOriginalData([])
        }
    }, [params?.country, params?.buyer, params?.supplier])

    return (
        <CardContainer
            loading={loading}
            label={label}
            appendClass={'pb-12 h-full'}
            helpText={helpText}
            symbol={<Icon.RedFlag className="inline-block ml-2" />}>
            <div className="-mt-4 md:mt-0 custom-horizontal-bar">
                {!error ? (
                    <ul className="pr-4 overflow-y-auto custom-scrollbar h-80">
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
                                            {item[Default.TENDER_COUNT]}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ErrorHandler />
                )}
            </div>
        </CardContainer>
    )
}

export default ContractRedFlags
