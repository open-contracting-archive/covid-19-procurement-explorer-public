const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        /* eslint-disable node/no-unsupported-features/es-syntax */
        // https://github.com/mysticatea/eslint-plugin-node/issues/250
        import('web-vitals').then(
            ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(onPerfEntry)
                getFID(onPerfEntry)
                getFCP(onPerfEntry)
                getLCP(onPerfEntry)
                getTTFB(onPerfEntry)
            }
        )
    }
}

export default reportWebVitals
