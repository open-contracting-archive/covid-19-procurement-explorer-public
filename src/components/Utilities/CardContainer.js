import React from 'react'
import Loader from "../Loader/Loader"
import HelpText from "../HelpText/HelpText"
import ContractViewSwitcher from "./ContractViewSwitcher"
import { formatNumber } from "../../helpers/number"
import PieChart from "../Charts/PieChart/PieChart"
import Visualization from "../../constants/Visualization"

const CardContainer = (props) => {
    const { label, children, helpText, appendClass, modalHandler, viewSwitcher, switchView } = props

    return (
        <div className={`bg-white rounded p-4 simple-tab ${appendClass}`}>
            <Fragment>
                <div className="flex flex-wrap items-center md:justify-between">
                    <div className="w-full md:w-auto mb-4 md:mb-0 flex items-center">
                        <h3 className="uppercase font-bold text-primary-dark inline-block">
                            {trans(label)}
                        </h3>
                        <HelpText helpTextInfo={helpText} />
                    </div>

                    {viewSwitcher && (
                        <ContractViewSwitcher
                            style={'short'}
                            viewType={viewType}
                            viewHandler={switchView} />
                    )}
                </div>

                <div className={`${heightFull ? 'mt-10' : 'mt-2'}`}>
                    <div className="flex items-end">
                        <div>
                            <h3 className="mr-3">
                                    <span className="text-sm block">
                                        {trans('Open')}
                                    </span>
                                <span className="text-xl font-bold mr-2">
                                        {formatNumber(chartData[1].number)}
                                    </span>
                                {currency && (
                                    <span className="inline-block uppercase">
                                            {currency === 'local'
                                                ? countryCurrency
                                                : 'usd'}
                                        </span>
                                )}
                            </h3>
                        </div>
                        <div className="flex-1">
                            <PieChart
                                data={chartData}
                                colors={colors}
                                large={heightFull}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
            {modalHandler && (
                <span
                    className="cursor-pointer text-sm text-primary-blue block text-right"
                    onClick={() => modalHandler(Visualization.DIRECT_OPEN)}>
                    View in detail →
                </span>
            )}
        </div>
    )
}
export default CardContainer
