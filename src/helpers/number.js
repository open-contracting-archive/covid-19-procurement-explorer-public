const SI_SYMBOL = ['', 'K', 'M', 'B', 'T', 'P', 'E']

export const formatNumber = (number) => {
    // what tier? (determines SI symbol)
    var tier = (Math.log10(number) / 3) | 0

    // if zero, we don't need a suffix
    if (tier === 0) return number

    // get suffix and determine scalew
    var suffix = SI_SYMBOL[tier]
    var scale = Math.pow(10, tier * 3)

    // scale the number
    var scaled = number / scale

    // format number and add suffix
    return scaled.toFixed(1) + suffix
}

export const formatDecimal = (number) => {
    return Math.round(number * 100) / 100
}
