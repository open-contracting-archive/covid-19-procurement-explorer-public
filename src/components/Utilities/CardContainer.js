import React, { Fragment } from 'react'
import Loader from "../Loader/Loader"
import HelpText from "../HelpText/HelpText"
import ContractViewSwitcher from "./ContractViewSwitcher"
import useTrans from "../../hooks/useTrans"

const CardContainer = (props) => {
    const {
        label,
        helpText = null,
        loading,
        symbol,
        children,
        appendClass,
        viewType,
        viewHandler
    } = props
    const { trans } = useTrans()

    return (
        <div className={`bg-white rounded p-4 ${appendClass}`}>
            <Fragment>
                <div className="flex flex-wrap items-center md:justify-between md:w-auto mb-2 md:mb-4 ">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex">
                            <h3 className="uppercase font-bold text-primary-dark inline-block">
                                {trans(label)}
                            </h3>

                            {symbol}

                            {helpText && (
                                <HelpText helpTextInfo={helpText} />
                            )}
                        </div>

                        {viewHandler && (
                            <ContractViewSwitcher
                                style={'short'}
                                viewType={viewType}
                                viewHandler={viewHandler} />
                        )}
                    </div>

                </div>
                {loading ? (<Loader />) : (
                    <div>
                        {children}
                    </div>
                )}
            </Fragment>
        </div>
    )
}
export default CardContainer
