import React from 'react'
import Select from 'react-select'
import { continentSelectList } from '../../helpers/country'

const ContinentSelector = (props) => {
    const { handleContinentSelection } = props
    const options = continentSelectList

    return (
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
    )
}

export default ContinentSelector
