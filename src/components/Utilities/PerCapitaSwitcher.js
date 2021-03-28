import React from 'react'
import useTrans from '../../hooks/useTrans'

const PerCapitaSwitcher = (props) => {
    const { show = false, handleToggle, id = 'togglePerCapita' } = props
    const { trans } = useTrans()

    return (
        <div className="my-4 w-full md:w-auto justify-center md:my-0 items-center text-center">
            <span className="mr-2 text-sm">{trans('Spending USD')}</span>
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    name={id}
                    id={id}
                    onChange={() => handleToggle(!show)}
                />
                <label className="toggle-switch-label" htmlFor={id}>
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                </label>
            </div>
            <span className="ml-2 text-sm">
                {trans('Spending USD per capita')}
            </span>
        </div>
    )
}
export default PerCapitaSwitcher
