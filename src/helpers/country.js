export const CONTINENTS = {
    all: {
        title: 'All Continents',
        lat: 0,
        long: 0,
        zoomLevel: 1
    },
    asia: {
        title: 'Asia',
        lat: 44.94789322476297,
        long: 95.75037267845751,
        zoomLevel: 1.8
    },
    europe: {
        title: 'Europe',
        lat: 55.85406929584602,
        long: 28.24904034876191,
        zoomLevel: 1.8
    },
    africa: {
        title: 'Africa',
        lat: 6.426117205286786,
        long: 18.276615276175992,
        zoomLevel: 1.6
    },
    oceania: {
        title: 'Oceania',
        lat: -31.065922730080157,
        long: 152.78101519406331,
        zoomLevel: 1.6
    },
    south_america: {
        title: 'South America',
        lat: -15.173251268423256,
        long: -60.792112817153885,
        zoomLevel: 1.6
    },
    north_america: {
        title: 'North America',
        lat: 56.51520886670177,
        long: -92.32043635079269,
        zoomLevel: 1.6
    },
    middle_east: {
        title: 'Middle East',
        lat: 27.0,
        long: 38.25,
        zoomLevel: 1.6
    }
}

export const continentSelectList = Object.keys(CONTINENTS)
    .map((key) => {
        return { value: key, label: CONTINENTS[key].title }
    })
