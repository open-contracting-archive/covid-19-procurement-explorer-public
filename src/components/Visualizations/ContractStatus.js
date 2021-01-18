import React, { Fragment, useEffect, useState } from 'react'
import SimpleBarListSection from '../SimpleBarListSection/SimpleBarListSection'
import useTrans from '../../hooks/useTrans'
import VisualizationServices from '../../services/visualizationServices'
import Loader from '../Loader/Loader'

// Contract Status Data
const contract_status_data = [
    {
        name: 'Active',
        value: '0%'
    },
    {
        name: 'Completed',
        value: '0%'
    },
    {
        name: 'Cancelled',
        value: '0%'
    }
]

const ContractStatus = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [contractStatus, setContractStatus] = useState([])
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.ContractStatus(params)
            .then((response) => {
                setContractStatus(response)
                setLoading(false)
            })
    }, [params])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Contract status
    const calculateContractStatusChartPercentage = (data, type) => {
        if (type === 'by_value') {
            let total = data.reduce((acc, current) => {
                return acc + current.amount_local
            }, 0)

            return data.map((data) => {
                return {
                    name: data.status,
                    value: Math.ceil((data.amount_local / total) * 100),
                    amount: data.amount_local
                }
            })
        }

        if (type === 'by_number') {
            let total = data.reduce((acc, current) => {
                return acc + current.tender_count
            }, 0)

            return data.map((data) => {
                return {
                    name: data.status,
                    value: Math.ceil((data.tender_count / total) * 100),
                    amount: data.tender_count
                }
            })
        }
    }
    const contractStatusDataByNumber =
        contractStatus &&
        calculateContractStatusChartPercentage(contractStatus, 'by_number')
    const contractStatusDataByValue =
        contractStatus &&
        calculateContractStatusChartPercentage(contractStatus, 'by_value')

    return (
        <Fragment>
            <div className="bg-white rounded p-4 h-full">
                {loading ? (
                    <Loader sm />
                ) : (
                    <SimpleBarListSection
                        label={label}
                        bar_data={contract_status_data}
                        byNumber={
                            contractStatusDataByNumber &&
                            contractStatusDataByNumber
                        }
                        byValue={
                            contractStatusDataByValue &&
                            contractStatusDataByValue
                        }
                    />
                )}
            </div>
        </Fragment>
    )
}

export default ContractStatus
