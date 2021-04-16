import React from 'react'

export const AreaChartBlock = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './AreaChart/AreaChartBlock')
)
export const BarChart = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './BarChart/BarChart')
)
export const BarChartRace = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './BarChart/BarChartRace')
)
export const BarListChart = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ './BarListSection/BarListChart'
    )
)
export const CombinedChart = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ './CombinedChart/CombinedChart'
    )
)
export const CompareChart = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ './CompareChart/CompareChart'
    )
)
export const CountryCombinedChart = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ './CountryCombinedChart/CountryCombinedChart'
    )
)
export const PieChart = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './PieChart/PieChart')
)
export const RaceMap = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './RaceMap/RaceMap')
)
export const SankeyChart = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './SankeyChart/SankeyChart')
)
export const SimpleBarChart = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ './SimpleBarChart/SimpleBarChart'
    )
)
export const SimpleBarListChart = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ './SimpleBarListSection/SimpleBarListChart'
    )
)
export const StackedChart = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ './StackedChart/StackedChart'
    )
)
export const TreeMapChart = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ './TreeMapChart/TreeMapChart'
    )
)
