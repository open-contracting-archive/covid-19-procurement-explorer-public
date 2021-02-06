import React from 'react'
import Select from 'react-select'
import { continentSelectList } from '../../helpers/country'

const ContinentSelector = (props) => {
    const { handleContinentSelection } = props
    const options = continentSelectList

    return (<div className=" w-1/5 -mt-3">
        <Select
            className="select-filter text-sm"
            classNamePrefix="select-filter"
            options={options}
            defaultValue={options[0]}
            isSearchable={false}
            onChange={(selectedOption) =>
                handleContinentSelection(selectedOption)
            }
        />
    </div>)
}

export default ContinentSelector
