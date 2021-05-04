import React, { useState, useEffect, useMemo } from 'react'
import { has } from 'lodash'
import { T } from '@transifex/react'

const numberSorting = (a, b, direction) => {
    return direction === '-' ? b - a : a - b
}

const dateSorting = (a, b, direction) => {
    const aDate = new Date(a)
    const bDate = new Date(b)
    return direction === '-' ? bDate - aDate : aDate - bDate
}

const useTableSorting = ({
    items,
    defaultSorting,
    columnTypeMapping,
    sortTableData
}) => {
    const [listItem, setListItem] = useState([])
    const [sorting, setSorting] = useState(defaultSorting)

    const sortMappingFunction = useMemo(() => ({
        number: numberSorting,
        date: dateSorting
    }))

    useEffect(() => {
        setSorting(defaultSorting)
    }, [])

    useEffect(() => {
        if (sorting) {
            const sortedItems = !sortTableData
                ? [...items]
                : [...items].sort((a, b) => {
                      if (
                          has(columnTypeMapping, sorting.column) &&
                          has(
                              sortMappingFunction,
                              columnTypeMapping[sorting.column]
                          )
                      ) {
                          return sortMappingFunction[
                              columnTypeMapping[sorting.column]
                          ](
                              a[sorting.column],
                              b[sorting.column],
                              sorting.direction
                          )
                      }

                      if (sorting.direction === '-') {
                          return (
                              (a[sorting.column] < b[sorting.column]) -
                              (a[sorting.column] > b[sorting.column])
                          )
                      } else {
                          return (
                              (a[sorting.column] > b[sorting.column]) -
                              (a[sorting.column] < b[sorting.column])
                          )
                      }
                  })

            setListItem(sortedItems)
        }

        return () => {
            setListItem([])
        }
    }, [sorting, items])

    const appendSort = (columnName) => {
        setSorting((previous) => {
            if (previous.column === columnName) {
                return {
                    ...previous,
                    direction: previous.direction === '-' ? '' : '-'
                }
            }
            return {
                column: columnName,
                direction: ''
            }
        })
    }

    const columnSorting = (columnName) => {
        if (!sorting) {
            return null
        }
        return (
            <span className="icon-sort">
                <span
                    className={`icon-sort-arrow-up ${
                        sorting.column === columnName &&
                        sorting.direction === '' &&
                        'active'
                    }`}
                />
                <span
                    className={`icon-sort-arrow-down ${
                        sorting.column === columnName &&
                        sorting.direction === '-' &&
                        'active'
                    }`}
                />
            </span>
        )
    }

    const TableHeaderSpan = (name, label) => (
        <span
            className="flex items-center cursor-pointer"
            onClick={() => appendSort(name)}>
            <T _str={label} /> {columnSorting(name)}
        </span>
    )
    return {
        sortedItems: listItem,
        appendSort,
        columnSorting,
        sorting,
        tableHeaderSpan: TableHeaderSpan
    }
}

export default useTableSorting
