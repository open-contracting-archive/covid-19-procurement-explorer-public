import React, { Fragment } from 'react'
import useTrans from '../../hooks/useTrans'
import { Loader, HelpText, ContractViewSwitcher } from './index'

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
        <div className={`bg-white rounded p-4 h-full ${appendClass}`}>
            <Fragment>
                <div className="w-full flex flex-wrap items-center justify-between mb-4">
                    <div className="flex items-center mb-4 md:mb-0">
                        <h3 className="uppercase font-bold text-primary-dark inline-block">
                            {trans(label)}
                        </h3>

                        {symbol}

                        {helpText && <HelpText helpTextInfo={helpText} />}
                    </div>
                    {viewHandler && (
                        <ContractViewSwitcher
                            style={'short'}
                            viewType={viewType}
                            viewHandler={viewHandler}
                        />
                    )}
                </div>
                {loading ? <Loader /> : <div>{children}</div>}
            </Fragment>
        </div>
    )
}
export default CardContainer
