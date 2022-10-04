import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { get, isEmpty } from 'lodash'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { SankeyChart } from './Charts'
import VisualizationService from '../../services/VisualizationService'
import { CardContainer, ChartFooter, ErrorHandler } from '../Utilities'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'

const SupplierProductFlow = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Product Flow',
        helpText = 'All product categories for this supplier according to contracts value or number of signed contracts',
        params
    } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(false)
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.SupplierProductFlow(params.supplierId)
            .then((result) => {
                setLoading(false)
                if (result) {
                    setOriginalData(result)
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                setError(true)
            })

        return () => {
            setOriginalData({})
        }
    }, [params?.supplierId])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let productCountry = get(
                originalData,
                `by_${viewType}.product_country`,
                []
            ).map((item) => {
                return {
                    from: item.product_name,
                    to: item.country_name,
                    value:
                        viewType === ContractView.VALUE
                            ? item[Default.AMOUNT_USD]
                            : item[Default.TENDER_COUNT]
                }
            })
            let supplierProduct = get(
                originalData,
                `by_${viewType}.supplier_product`,
                []
            ).map((item) => {
                return {
                    from: item.supplier_name,
                    to: item.product_name,
                    value:
                        viewType === ContractView.VALUE
                            ? item[Default.AMOUNT_USD]
                            : item[Default.TENDER_COUNT]
                }
            })
            setChartData([...supplierProduct, ...productCountry])
        }

        return () => {
            setChartData([])
        }
    }, [originalData, viewType])

    return (
        <div>
            <FullScreen handle={fullScreenHandler}>
                <CardContainer
                    loading={loading}
                    label={label}
                    helpText={helpText}
                    viewType={viewType}
                    viewHandler={setViewType}>
                    <div>
                        {!error ? (
                            <div className="flex mt-4">
                                <div className="flex-1">
                                    <SankeyChart
                                        data={chartData}
                                        currency={Default.CURRENCY_USD}
                                        viewType={viewType}
                                    />
                                </div>
                            </div>
                        ) : (
                            <ErrorHandler />
                        )}
                    </div>
                </CardContainer>
            </FullScreen>
            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

SupplierProductFlow.propTypes = {
    label: PropTypes.string,
    params: PropTypes.object,
    helpText: PropTypes.string
}
export default SupplierProductFlow
