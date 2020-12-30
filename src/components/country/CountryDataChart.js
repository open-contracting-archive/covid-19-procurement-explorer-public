import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as dayjs from 'dayjs'
import { get } from 'lodash'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
// import BarChart from '../charts/BarChart/BarChart'
import PieChart from '../charts/PieChart/PieChart'
import AreaChart from '../charts/AreaChart/AreaChart'
// import TreeMapChart from '../charts/TreeMapChart/TreeMapChart'
import CombinedChart from '../charts/CombinedChart/CombinedChart'
import SankeyChart from '../charts/SankeyChart/SankeyChart'
// import CompareChart from '../charts/CompareChart/CompareChart'
// import RaceBarChart from '../charts/RaceBarChart/RaceBarChart'
import Loader from '../Loader/Loader'
import SimpleBarChart from '../charts/SimpleBarChart/SimpleBarChart'
import BarListSection from '../BarListSection/BarListSection'
import SimpleBarListSection from '../SimpleBarListSection/SimpleBarListSection'
import ContractRedFlag from '../ContractRedFlag/ContractRedFlag'
import StackedChart from '../charts/StackedChart/StackedChart'
import VisualizationServices from '../../services/visualizationServices'
import AreaChartBlock from '../charts/AreaChart/AreaChartBlock'
import useTrans from '../../hooks/useTrans'

const top_supply_bar_data = [
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'TECNOLOGIA Y CALIFORNIA',
        value: '45%'
    },
    {
        name: 'REACTIVOS EXPERIMENT',
        value: '12%'
    },
    {
        name: 'Kit de detección single',
        value: '5%'
    },
    {
        name: 'TaqPath 1-Step RT-qPC',
        value: '68%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    }
]

const contract_status_data = [
    {
        name: 'Active',
        value: '85%'
    },
    {
        name: 'Completed',
        value: '45%'
    },
    {
        name: 'Cancelled',
        value: '12%'
    }
]

const top_buyer_bar_data = [
    {
        name: 'Kit de detección single',
        value: '5%'
    },
    {
        name: 'TaqPath 1-Step RT-qPC',
        value: '68%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'TECNOLOGIA Y CALIFORNIA',
        value: '45%'
    },
    {
        name: 'REACTIVOS EXPERIMENT',
        value: '12%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    }
]

// Add Pie Chart data
const pie_chart_data = [
    {
        value: 'Value',
        number: 30
    },
    {
        value: 'Number',
        number: 70
    }
]

const sankey_chart_data = [
    { from: 'Supplier A', to: 'Product D', value: 10 },
    { from: 'Supplier B', to: 'Product D', value: 8 },
    { from: 'Supplier B', to: 'Product E', value: 4 },
    { from: 'Supplier C', to: 'Product E', value: 3 },
    { from: 'Product D', to: 'Product G', value: 5 },
    { from: 'Product D', to: 'Product I', value: 2 },
    { from: 'Product D', to: 'Product H', value: 3 },
    { from: 'Product E', to: 'Product H', value: 6 },
    { from: 'Product G', to: 'Product J', value: 5 },
    { from: 'Product I', to: 'Product J', value: 1 },
    { from: 'Product H', to: 'Product J', value: 9 }
]

// Stacked Chart Data
const stacked_chart_data = [
    {
        month: 'Apr',
        ppe: 2.5,
        ventilator: 2.5,
        covid_tests: 2.1,
        vaccine: 0.3,
        construction_works_and_materials: 0.2,
        medicines: 0.1,
        sanitizing_supplies: 0.4,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'May',
        ppe: 2.6,
        ventilator: 2.7,
        covid_tests: 2.2,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.9,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Jun',
        ppe: 2.8,
        ventilator: 2.9,
        covid_tests: 2.4,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.7,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Jul',
        ppe: 2.5,
        ventilator: 2.5,
        covid_tests: 2.1,
        vaccine: 0.3,
        construction_works_and_materials: 0.2,
        medicines: 0.1,
        sanitizing_supplies: 0.2,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Aug',
        ppe: 2.6,
        ventilator: 2.7,
        covid_tests: 2.2,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.7,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Sep',
        ppe: 2.8,
        ventilator: 2.9,
        covid_tests: 2.4,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.1,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Oct',
        ppe: 2.8,
        ventilator: 2.9,
        covid_tests: 2.4,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.7,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Nov',
        ppe: 2.8,
        ventilator: 2.9,
        covid_tests: 2.4,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 1,
        medical_consumables: 1.5,
        other: 2
    }
]

const axisRotation = 60
const barColorValue = '#ABBABF'
const colors = ['#ABBABF', '#DCEAEE']

function CountryDataCharts({ countryCode }) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(false)
    const [totalSpending, setTotalSpending] = useState({})
    const [totalContracts, setTotalContracts] = useState({})
    const [averageBids, setAverageBids] = useState({})
    const [directOpen, setDirectOpen] = useState()
    const [topSuppliers, setTopSuppliers] = useState()
    const [topBuyers, setTopBuyers] = useState()
    const [productDistribution, setProductDistribution] = useState()
    const [contractStatus, setContractStatus] = useState()
    const [quantityCorrelation, setQuantityCorrelation] = useState()
    const [monopolization, setMonopolization] = useState()
    const [countrySuppliers, setCountrySuppliers] = useState()
    const [equity, setEquity] = useState()

    const currency = useSelector((state) => state.general.currency)

    const { trans } = useTrans()
    const handle = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        setLoading(true)
    }, [])

    useEffect(() => {
        VisualizationServices.TotalSpendingCountry(countryCode).then(
            (response) => {
                setTotalSpending(response)
            }
        )
        VisualizationServices.TotalContractsCountry(countryCode).then(
            (response) => {
                setTotalContracts(response)
            }
        )
        VisualizationServices.AverageBidsCountry(countryCode).then(
            (response) => {
                setAverageBids(response)
            }
        )
        VisualizationServices.DirectOpenCountry(countryCode).then(
            (response) => {
                setDirectOpen(response)
            }
        )
        VisualizationServices.TopSuppliersCountry(countryCode).then(
            (response) => {
                setTopSuppliers(response)
            }
        )
        VisualizationServices.TopBuyersCountry(countryCode).then((response) => {
            setTopBuyers(response)
        })
        VisualizationServices.ProductDistributionCountry(countryCode).then(
            (response) => {
                setProductDistribution(response)
            }
        )
        VisualizationServices.ContractStatusCountry(countryCode).then(
            (response) => {
                setContractStatus(response)
            }
        )
        VisualizationServices.QuantityCorrelationCountry(countryCode).then(
            (response) => {
                setQuantityCorrelation(response)
            }
        )
        VisualizationServices.monopolizationCountry(countryCode).then(
            (response) => {
                setMonopolization(response)
            }
        )
        VisualizationServices.CountrySuppliers(countryCode).then((response) => {
            setCountrySuppliers(response)
        })
        VisualizationServices.EquityCountry(countryCode).then((response) => {
            setEquity(response)
        })
    }, [])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // const totalSpendingLineChartData = get(totalSpending, 'usd.line_chart')
    // Function to manage data for line chart
    const lineChartData = (chartData) => {
        return (
            chartData &&
            chartData.map((data) => {
                return {
                    date: dayjs(data.date).format('MMMM YYYY'),
                    value: data.value
                }
            })
        )
    }

    // Function to sort by date
    const sortDate = (data) => {
        return data.sort((date1, date2) => {
            return dayjs(date1.date).diff(dayjs(date2.date))
        })
    }

    // Total spending data
    const totalSpendingLineChartDataRaw =
        totalSpending &&
        lineChartData(get(totalSpending[currency], 'line_chart'))
    const totalSpendingLineChartData =
        totalSpendingLineChartDataRaw && sortDate(totalSpendingLineChartDataRaw)
    const totalSpendingAmount = get(totalSpending[currency], 'total')
    const totalSpendingPercentage = get(totalSpending[currency], 'increment')
    const totalSpendingBarChartData = get(totalSpending[currency], 'bar_chart')

    // Total contracts data
    const totalContractLineChartDataRaw =
        totalContracts && lineChartData(totalContracts.line_chart)
    const totalContractLineChartData =
        totalContractLineChartDataRaw && sortDate(totalContractLineChartDataRaw)
    const totalContractAmount = totalContracts && totalContracts.total
    const totalContractPercentage = totalContracts && totalContracts.difference
    const totalContractBarChartData = totalContracts && totalContracts.bar_chart

    // Average bids
    const averageBidsLineChartDataRaw =
        averageBids && lineChartData(averageBids.line_chart)
    const averageBidsLineChartData =
        averageBidsLineChartDataRaw && sortDate(averageBidsLineChartDataRaw)
    const averageBidsAmount = averageBids && averageBids.average
    const averageBidsPercentage = averageBids && averageBids.difference

    // Monopolization
    const monopolizationLineChartDataRaw =
        monopolization && lineChartData(monopolization.line_chart)

    const monopolizationLineChartData =
        monopolizationLineChartDataRaw &&
        sortDate(monopolizationLineChartDataRaw)
    const monopolizationAmount = monopolization && monopolization.average
    const monopolizationPercentage = monopolization && monopolization.difference

    // Direct open chart
    const directOpenByValue =
        directOpen &&
        directOpen.map((data) => {
            return {
                value: data.procedure,
                number: currency == 'usd' ? data.amount_usd : data.amount_local
            }
        })
    const directOpenByNumber =
        directOpen &&
        directOpen.map((data) => {
            return { value: data.procedure, number: data.tender_count }
        })

    // Top suppliers
    const calculateBarChartPercentage = (data, type) => {
        if (type == 'by_value') {
            let total = data.by_value.reduce((acc, current) => {
                return acc + current.amount_local
            }, 0)

            let topSuppliersChartData = data.by_value.map((data) => {
                return {
                    name: data.supplier_name,
                    value: Math.ceil((data.amount_local / total) * 100),
                    amount: data.amount_local
                }
            })
            return topSuppliersChartData
        }
        if (type == 'by_number') {
            let total = data.by_number.reduce((acc, current) => {
                return acc + current.tender_count
            }, 0)

            let topSuppliersChartData = data.by_number.map((data) => {
                return {
                    name: data.supplier_name,
                    value: Math.ceil((data.tender_count / total) * 100),
                    amount: data.tender_count
                }
            })
            return topSuppliersChartData
        }
    }

    const topSuppliersDataByNumber =
        topSuppliers && calculateBarChartPercentage(topSuppliers, 'by_number')
    const topSuppliersDataByValue =
        topSuppliers && calculateBarChartPercentage(topSuppliers, 'by_value')

    // Top buyers
    const calculateBuyersChartPercentage = (data, type) => {
        if (type == 'by_value') {
            let total = data.by_value.reduce((acc, current) => {
                return acc + current.amount_local
            }, 0)

            let topSuppliersChartData = data.by_value.map((data) => {
                return {
                    name: data.buyer_name,
                    value: Math.ceil((data.amount_local / total) * 100),
                    amount: data.amount_local
                }
            })
            return topSuppliersChartData
        }
        if (type == 'by_number') {
            let total = data.by_number.reduce((acc, current) => {
                return acc + current.tender_count
            }, 0)

            let topSuppliersChartData = data.by_number.map((data) => {
                return {
                    name: data.buyer_name,
                    value: Math.ceil((data.tender_count / total) * 100),
                    amount: data.tender_count
                }
            })
            return topSuppliersChartData
        }
    }

    const topBuyersDataByNumber =
        topBuyers && calculateBuyersChartPercentage(topBuyers, 'by_number')
    const topBuyersDataByValue =
        topBuyers && calculateBuyersChartPercentage(topBuyers, 'by_value')

    // Product distribution
    const calculateProductChartPercentage = (data, type) => {
        if (type == 'by_value') {
            let total = data.reduce((acc, current) => {
                return acc + current.amount_local
            }, 0)

            let productDistributionChartData = data.map((data) => {
                return {
                    name: data.product_name,
                    value: Math.ceil((data.amount_local / total) * 100),
                    amount: data.amount_local
                }
            })
            return productDistributionChartData
        }
        if (type == 'by_number') {
            let total = data.reduce((acc, current) => {
                return acc + current.tender_count
            }, 0)

            let productDistributionChartData = data.map((data) => {
                return {
                    name: data.product_name,
                    value: Math.ceil((data.tender_count / total) * 100),
                    amount: data.tender_count
                }
            })
            return productDistributionChartData
        }
    }

    const productDistributionDataByNumber =
        productDistribution &&
        calculateProductChartPercentage(productDistribution, 'by_number')
    const productDistributionDataByValue =
        productDistribution &&
        calculateProductChartPercentage(productDistribution, 'by_value')

    // Contract status
    const calculateContractStatusChartPercentage = (data, type) => {
        if (type == 'by_value') {
            let total = data.reduce((acc, current) => {
                return acc + current.amount_local
            }, 0)

            let dataByValue = data.map((data) => {
                return {
                    name: data.status,
                    value: Math.ceil((data.amount_local / total) * 100),
                    amount: data.amount_local
                }
            })
            return dataByValue
        }
        if (type == 'by_number') {
            let total = data.reduce((acc, current) => {
                return acc + current.tender_count
            }, 0)

            let dataByNumber = data.map((data) => {
                return {
                    name: data.status,
                    value: Math.ceil((data.tender_count / total) * 100),
                    amount: data.tender_count
                }
            })
            return dataByNumber
        }
    }

    const contractStatusDataByNumber =
        contractStatus &&
        calculateContractStatusChartPercentage(contractStatus, 'by_number')
    const contractStatusDataByValue =
        contractStatus &&
        calculateContractStatusChartPercentage(contractStatus, 'by_value')

    // Quantity correlation
    const quantityCorrelationDataByValueRaw =
        quantityCorrelation &&
        quantityCorrelation.map((data) => {
            return {
                date: data.month,
                activeCase: data.active_cases,
                value: data.amount_usd || 0
            }
        })
    const quantityCorrelationDataByValue =
        quantityCorrelationDataByValueRaw &&
        sortDate(quantityCorrelationDataByValueRaw)
    const quantityCorrelationDataByNumberRaw =
        quantityCorrelation &&
        quantityCorrelation.map((data) => {
            return {
                date: data.month,
                activeCase: data.active_cases,
                value: data.tender_count
            }
        })
    const quantityCorrelationDataByNumber =
        quantityCorrelationDataByNumberRaw &&
        sortDate(quantityCorrelationDataByNumberRaw)

    // Country Suppliers Visualization
    const getSuppliersData = (data, type) => {
        let suppliersData = {}
        let set1 =
            data &&
            data.product_buyer.map((item) => {
                return {
                    ...suppliersData,
                    from: item.product_name,
                    to: item.buyer_name,
                    value:
                        type == 'by_value' ? item.amount_usd : item.tender_count
                }
            })
        let set2 =
            data &&
            data.supplier_product.map((item) => {
                return {
                    ...suppliersData,
                    from: item.supplier_name,
                    to: item.product_name,
                    value:
                        type == 'by_value' ? item.amount_usd : item.tender_count
                }
            })
        const combinedData = [...set2, ...set1]
        return combinedData
    }
    const countrySuppliersDataByNumber =
        countrySuppliers && getSuppliersData(countrySuppliers, 'by_number')
    const countrySuppliersDataByValue =
        countrySuppliers && getSuppliersData(countrySuppliers, 'by_value')

    // Equity chart
    const equityByValue =
        equity &&
        equity.map((data) => {
            return {
                value: data.type,
                number: currency == 'usd' ? data.amount_usd : data.amount_local
            }
        })
    const equityByNumber =
        equity &&
        equity.map((data) => {
            return { value: data.type, number: data.tender_count }
        })

    return (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                {loading ? (
                    <div className="flex flex-wrap -mx-3 -mb-6">
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4 h-full">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Total Spending
                                </h3>
                                <div className="flex items-end">
                                    <AreaChartBlock
                                        chartData={totalSpendingLineChartData}
                                        totalAmount={totalSpendingAmount}
                                        percentage={totalSpendingPercentage}
                                        currency={currency}
                                    />
                                    <div className="flex-1">
                                        <SimpleBarChart
                                            data={totalSpendingBarChartData}
                                            barColorValue={barColorValue}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4 h-full">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Total contracts
                                </h3>
                                <div className="flex items-end">
                                    {/* <div className=" text-primary-dark pb-4 w-2/5">
                                        <AreaChart data={area_chart_data} />
                                        <p>
                                            <strong className="text-xl inline-block mr-3">
                                                218
                                            </strong>
                                        </p>
                                        <p className="text-sm text-red-30 font-bold">
                                            -8%
                                        </p>
                                    </div> */}
                                    {/* Line area chart */}
                                    <AreaChartBlock
                                        chartData={totalContractLineChartData}
                                        totalAmount={totalContractAmount}
                                        percentage={totalContractPercentage}
                                    />
                                    <div className="flex-1">
                                        <SimpleBarChart
                                            data={totalContractBarChartData}
                                            barColorValue={barColorValue}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4 h-full">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Average bids per contract
                                </h3>
                                <div className="flex items-end">
                                    {/* <div className=" text-primary-dark w-2/5">
                                        <AreaChart data={area_chart_data} />
                                        <p>
                                            <strong className="text-xl inline-block mr-3">
                                                218
                                            </strong>
                                        </p>
                                        <p className="text-sm text-red-30 font-bold">
                                            -11%
                                        </p>
                                    </div> */}
                                    {/* Line area chart */}
                                    <AreaChartBlock
                                        chartData={averageBidsLineChartData}
                                        totalAmount={averageBidsAmount}
                                        percentage={averageBidsPercentage}
                                    />
                                    <div className="flex-1"></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Monopolization
                                </h3>
                                <div className="flex items-end">
                                    <AreaChartBlock
                                        chartData={monopolizationLineChartData}
                                        totalAmount={monopolizationAmount}
                                        percentage={monopolizationPercentage}
                                    />
                                    <div className="flex-1"></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <SimpleBarListSection
                                label="Contract status"
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
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="flex flex-col justify-between h-full">
                                <div className="bg-white rounded p-4 py-2 mb-2 simple-tab">
                                    <Tabs>
                                        <div className="flex items-center justify-between">
                                            <h3 className="uppercase font-bold  text-primary-dark">
                                                Equity indicators
                                            </h3>
                                            <div className="flex">
                                                <TabList>
                                                    <Tab>
                                                        {trans('By value')}
                                                    </Tab>
                                                    <Tab>
                                                        {trans('By number')}
                                                    </Tab>
                                                </TabList>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <TabPanel>
                                                <div className="flex items-end">
                                                    <div className=" text-primary-dark">
                                                        <span>
                                                            <strong className="text-xl inline-block mr-3">
                                                                51
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <PieChart
                                                            data={
                                                                pie_chart_data
                                                            }
                                                            colors={colors}
                                                        />
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                <div className="flex items-end">
                                                    <div className=" text-primary-dark">
                                                        <span>
                                                            <strong className="text-xl inline-block mr-3">
                                                                51
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <PieChart
                                                            data={
                                                                pie_chart_data
                                                            }
                                                            colors={colors}
                                                        />
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </div>
                                    </Tabs>
                                </div>
                                <div className="bg-white rounded p-4 py-2 simple-tab">
                                    <Tabs>
                                        <div className="flex items-center justify-between">
                                            <h3 className="uppercase font-bold  text-primary-dark">
                                                Direct/Open
                                            </h3>
                                            <div className="flex">
                                                <TabList>
                                                    <Tab>
                                                        {trans('By value')}
                                                    </Tab>
                                                    <Tab>
                                                        {trans('By number')}
                                                    </Tab>
                                                </TabList>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <TabPanel>
                                                <div className="flex items-end">
                                                    <div className=" text-primary-dark">
                                                        <span>
                                                            <strong className="text-xl inline-block mr-3">
                                                                51
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <PieChart
                                                            data={
                                                                directOpenByValue
                                                            }
                                                            colors={colors}
                                                        />
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                <div className="flex items-end">
                                                    <div className=" text-primary-dark">
                                                        <span>
                                                            <strong className="text-xl inline-block mr-3">
                                                                51
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <PieChart
                                                            data={
                                                                directOpenByNumber
                                                            }
                                                            colors={colors}
                                                        />
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </div>
                                    </Tabs>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Products timeline
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <StackedChart
                                            data={stacked_chart_data}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <BarListSection
                                label="Concentration"
                                bar_data={top_supply_bar_data}
                            />
                        </div>

                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <BarListSection
                                label="Top Suppliers"
                                byNumber={
                                    topSuppliersDataByNumber &&
                                    topSuppliersDataByNumber
                                }
                                byValue={
                                    topSuppliersDataByValue &&
                                    topSuppliersDataByValue
                                }
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <BarListSection
                                label="Top Buyers"
                                bar_data={top_buyer_bar_data}
                                byNumber={
                                    topBuyersDataByNumber &&
                                    topBuyersDataByNumber
                                }
                                byValue={
                                    topBuyersDataByValue && topBuyersDataByValue
                                }
                            />
                        </div>

                        {/* <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Tree Map Chart Visualization
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <TreeMapChart
                                            data={treemap_chart_data}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4 simple-tab">
                                <FullScreen handle={handle}>
                                    <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                        Global suppliers
                                    </h3>
                                    <Tabs>
                                        <TabList>
                                            <Tab>
                                                {trans('By contract value')}
                                            </Tab>
                                            <Tab>
                                                {trans(
                                                    'By number of contracts'
                                                )}
                                            </Tab>
                                        </TabList>

                                        <div className="flex">
                                            <div className="flex-1">
                                                <TabPanel>
                                                    <SankeyChart
                                                        data={
                                                            countrySuppliersDataByValue
                                                        }
                                                    />
                                                </TabPanel>
                                                <TabPanel>
                                                    <SankeyChart
                                                        data={
                                                            countrySuppliersDataByNumber
                                                        }
                                                    />
                                                </TabPanel>
                                            </div>
                                        </div>
                                    </Tabs>
                                    {/* <div className="flex">
                                    <div className="flex-1">
                                        <SankeyChart data={sankey_chart_data} />
                                    </div>
                                </div> */}
                                </FullScreen>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <BarListSection
                                label="Product distribution"
                                // bar_data={top_supply_bar_data}
                                byNumber={
                                    productDistributionDataByNumber &&
                                    productDistributionDataByNumber
                                }
                                byValue={
                                    productDistributionDataByValue &&
                                    productDistributionDataByValue
                                }
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <ContractRedFlag />
                        </div>

                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4 simple-tab">
                                <FullScreen handle={handle}>
                                    <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                        covid/contracts quantity correlation
                                    </h3>

                                    <Tabs>
                                        <TabList>
                                            <Tab>
                                                {trans('By contract value')}
                                            </Tab>
                                            <Tab>
                                                {trans(
                                                    'By number of contracts'
                                                )}
                                            </Tab>
                                        </TabList>

                                        <div className="flex mt-6">
                                            <div className="flex-1">
                                                <TabPanel>
                                                    <CombinedChart
                                                        data={
                                                            quantityCorrelationDataByValue &&
                                                            quantityCorrelationDataByValue
                                                        }
                                                        type="by-value"
                                                    />
                                                </TabPanel>
                                                <TabPanel>
                                                    <CombinedChart
                                                        // data={
                                                        //     combined_chart_data
                                                        // }
                                                        data={
                                                            quantityCorrelationDataByNumber &&
                                                            quantityCorrelationDataByNumber
                                                        }
                                                    />
                                                </TabPanel>
                                            </div>
                                        </div>
                                    </Tabs>
                                </FullScreen>
                            </div>
                        </div>
                        {/* <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Race Bar Chart Visualization
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <RaceBarChart
                                            data={race_bar_chart_data}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </section>
    )
}

export default CountryDataCharts
