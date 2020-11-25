import React, { useEffect, useState } from 'react'
import BarChart from '../../components/charts/BarChart/BarChart'
import PieChart from '../../components/charts/PieChart/PieChart'
import AreaChart from '../../components/charts/AreaChart/AreaChart'
import TreeMapChart from '../../components/charts/TreeMapChart/TreeMapChart'
import CombinedChart from '../../components/charts/CombinedChart/CombinedChart'
import SankeyChart from '../../components/charts/SankeyChart/SankeyChart'
import CompareChart from '../../components/charts/CompareChart/CompareChart'
import RaceBarChart from '../../components/charts/RaceBarChart/RaceBarChart'
import Loader from '../../components/loader/Loader'

// Add Bar Chart data
const bar_chart_data = [
    {
        method: 'Open',
        value: 2025
    },
    {
        method: 'Limited',
        value: 1882
    },
    {
        method: 'Selective',
        value: 1809
    },
    {
        method: 'Direct',
        value: 1322
    }
]

// Add Pie Chart data
const pie_chart_data = [
    {
        value: 'Value',
        number: 30
    },
    {
        value: 'Number',
        number: 70
    }
]

// Add Area Chart data
const area_chart_data = [
    {
        month: 'FEB',
        value: 22324,
        expenses: 21.1
    },
    {
        month: 'MAR',
        value: 45990,
        expenses: 30.5
    },
    {
        month: 'APR',
        value: 10003,
        expenses: 34.9
    },
    {
        month: 'MAY',
        value: 77070,
        expenses: 23.1
    },
    {
        month: 'JUN',
        value: 23489,
        expenses: 28.2
    },
    {
        month: 'JUL',
        value: 58902,
        expenses: 31.9
    },
    {
        month: 'AUG',
        value: 29190,
        expenses: 31.9
    },
    {
        month: 'SEP',
        value: 45908,
        expenses: 31.9
    }
]

// Add Combined Chart data
const combined_chart_data = [
    {
        date: '2013-01-16',
        market1: 71,
        market2: 75,
        sales1: 5,
        sales2: 8
    },
    {
        date: '2013-01-17',
        market1: 74,
        market2: 78,
        sales1: 4,
        sales2: 6
    },
    {
        date: '2013-01-18',
        market1: 78,
        market2: 88,
        sales1: 5,
        sales2: 2
    },
    {
        date: '2013-01-19',
        market1: 85,
        market2: 89,
        sales1: 8,
        sales2: 9
    },
    {
        date: '2013-01-20',
        market1: 82,
        market2: 89,
        sales1: 9,
        sales2: 6
    },
    {
        date: '2013-01-21',
        market1: 83,
        market2: 85,
        sales1: 3,
        sales2: 5
    },
    {
        date: '2013-01-22',
        market1: 88,
        market2: 92,
        sales1: 5,
        sales2: 7
    },
    {
        date: '2013-01-23',
        market1: 85,
        market2: 90,
        sales1: 7,
        sales2: 6
    },
    {
        date: '2013-01-24',
        market1: 85,
        market2: 91,
        sales1: 9,
        sales2: 5
    },
    {
        date: '2013-01-25',
        market1: 80,
        market2: 84,
        sales1: 5,
        sales2: 8
    },
    {
        date: '2013-01-26',
        market1: 87,
        market2: 92,
        sales1: 4,
        sales2: 8
    },
    {
        date: '2013-01-27',
        market1: 84,
        market2: 87,
        sales1: 3,
        sales2: 4
    },
    {
        date: '2013-01-28',
        market1: 83,
        market2: 88,
        sales1: 5,
        sales2: 7
    },
    {
        date: '2013-01-29',
        market1: 84,
        market2: 87,
        sales1: 5,
        sales2: 8
    },
    {
        date: '2013-01-30',
        market1: 81,
        market2: 85,
        sales1: 4,
        sales2: 7
    }
]

const treemap_chart_data = {
    Acura: {
        ILX: 11757,
        MDX: 54886,
        NSX: 581,
        RDX: 51295,
        RLX: 1237,
        TLX: 34846
    },
    'Alfa Romeo': { '4C': 407, Giulia: 8903, Stelvio: 2721 },
    Audi: {
        A3: 20733,
        'A3 e-tron': 2877,
        A4: 37674,
        A5: 21301,
        A6: 16304,
        A7: 4810,
        A8: 3127,
        Q3: 20633,
        Q5: 57640,
        Q7: 38346,
        R8: 772,
        TT: 2294
    },
    Bentley: {
        Bentayga: 1152,
        'Continental GT': 898,
        'Flying Spur': 257,
        Mulsanne: 98
    },
    BMW: {
        '2-Series': 11737,
        '3-Series': 59449,
        '4-Series': 39634,
        '5-Series': 40658,
        '6-Series': 3355,
        '7-Series': 9276,
        i3: 6276,
        i8: 488,
        X1: 30826,
        X3: 40691,
        X4: 5198,
        X5: 50815,
        X6: 6780,
        Z4: 502
    },
    Buick: {
        Cascada: 5595,
        Enclave: 48564,
        Encore: 88035,
        Envision: 41040,
        LaCrosse: 20161,
        Regal: 11559,
        Verano: 4277
    },
    Cadillac: {
        ATS: 13100,
        CT6: 10542,
        CTS: 10344,
        ELR: 17,
        Escalade: 37694,
        SRX: 156,
        XT5: 68312,
        XTS: 16275
    },
    Chevrolet: {
        Bolt: 23297,
        Camaro: 67940,
        'Caprice PPV': 693,
        'City Express': 8348,
        Colorado: 112996,
        Corvette: 25079,
        Cruze: 184751,
        Equinox: 290458,
        Express: 69164,
        Impala: 75877,
        Malibu: 185857,
        Silverado: 585864,
        Sonic: 30290,
        Spark: 22589,
        SS: 4055,
        Suburban: 56516,
        Tahoe: 98961,
        Traverse: 123506,
        Trax: 79289,
        Volt: 20349
    },
    Chrysler: {
        200: 18457,
        300: 51237,
        Pacifica: 118274,
        'Town & Country': 577
    },
    Dodge: {
        Avenger: 14,
        Challenger: 64537,
        Charger: 88351,
        Dart: 10082,
        Durango: 68761,
        'Grand Caravan': 125196,
        Journey: 89470,
        Viper: 585,
        'RAM P/U': 500723,
        'RAM ProMaster': 40483,
        'RAM ProMaster City': 15584
    },
    Fiat: { '124 Spider': 4478, 500: 12685, '500L': 1664, '500X': 7665 },
    Ford: {
        'C-Max': 18390,
        Edge: 142603,
        Escape: 308296,
        'E-Series': 53304,
        Expedition: 51883,
        Explorer: 271131,
        Fiesta: 46249,
        Flex: 22389,
        Focus: 158385,
        'F-Series': 896764,
        Fusion: 209623,
        GT: 89,
        Mustang: 81866,
        Taurus: 41236,
        Transit: 127360,
        'Transit Connect': 34473
    },
    Genesis: { G80: 16196, G90: 4398 },
    GMC: {
        Acadia: 111276,
        Canyon: 32106,
        Savana: 29679,
        Sierra: 217943,
        Terrain: 85441,
        Yukon: 49183,
        'Yukon XL': 35059
    },
    Honda: {
        Accord: 322655,
        Civic: 377286,
        'Clarity FCV': 2455,
        Crosstour: 5,
        'CR-V': 377895,
        'CR-Z': 705,
        Fit: 49454,
        'HR-V': 94034,
        Insight: 3,
        Odyssey: 100307,
        Pilot: 127279,
        Ridgeline: 34749
    },
    Hyundai: {
        Accent: 58955,
        Azera: 3060,
        Elantra: 198210,
        Equus: 20,
        Genesis: 1152,
        Ioniq: 11197,
        'Santa Fe': 133171,
        Sonata: 131803,
        Tucson: 114735,
        Veloster: 12658
    },
    Infiniti: {
        Q50: 40739,
        Q60: 10751,
        Q70: 5772,
        QX30: 14093,
        QX50: 16857,
        QX60: 40444,
        QX70: 6878,
        QX80: 17881
    },
    Jaguar: { 'F-Pace': 18946, 'F-Type': 4108, XE: 9278, XF: 4541, XJ: 2721 },
    Jeep: {
        Cherokee: 169882,
        Compass: 83253,
        'Grand Cherokee': 240696,
        Patriot: 10735,
        Renegade: 103434,
        Wrangler: 190522
    },
    Kia: {
        Cadenza: 7249,
        Forte: 117596,
        K900: 455,
        Niro: 27237,
        Optima: 107493,
        Rio: 16760,
        Sedona: 23815,
        Sorento: 99684,
        Soul: 115712,
        Sportage: 72824,
        Stinger: 843
    },
    'Land Rover': {
        'Discovery / LR4': 6398,
        'Discovery Sport': 14187,
        'Range Rover': 16869,
        'Range Rover Evoque': 11979,
        'Range Rover Sport': 19153,
        'Range Rover Velar': 6153
    },
    Lexus: {
        CT: 4690,
        ES: 51398,
        GS: 7773,
        GX: 27190,
        IS: 26482,
        LC: 2487,
        LFA: 3,
        LS: 4094,
        LX: 6004,
        NX: 59341,
        RC: 7363,
        RX: 108307
    },
    Lincoln: {
        Continental: 12012,
        MKC: 27048,
        MKS: 153,
        MKT: 3005,
        MKX: 31031,
        MKZ: 27387,
        Navigator: 10523
    },
    Maserati: {
        Ghibli: 5531,
        GranTurismo: 1018,
        Levante: 5448,
        Quattroporte: 1700
    },
    Mazda: {
        3: 75018,
        5: 10,
        6: 33402,
        'CX-3': 16355,
        'CX-5': 127563,
        'CX-9': 25828,
        'MX-5 Miata': 11294
    },
    'Mercedes-Benz': {
        'B-Class': 744,
        'C-Class': 77447,
        'CLA-Class': 20669,
        'E / CLS-Class': 51312,
        'G-Class': 4188,
        'GLA-Class': 24104,
        'GLC-Class': 48643,
        'GLE-Class': 54595,
        'GLS-Class': 32248,
        Metris: 7579,
        'S-Class': 15888,
        'SLC-Class': 2860,
        'SL-Class': 2940,
        Sprinter: 27415
    },
    Mini: { Cooper: 32232, Countryman: 14864, Paceman: 9 },
    Mitsubishi: {
        'i MiEV': 6,
        Lancer: 12725,
        Mirage: 22386,
        Outlander: 35310,
        'Outlander PHEV': 99,
        'Outlander Sport': 33160
    },
    Nissan: {
        '370Z': 4614,
        Altima: 254996,
        Armada: 35667,
        Frontier: 74360,
        'GT-R': 578,
        Juke: 10157,
        Leaf: 11230,
        Maxima: 67627,
        Murano: 76732,
        NV: 17858,
        NV200: 18602,
        Pathfinder: 81065,
        Quest: 4950,
        Rogue: 403465,
        Sentra: 218451,
        Titan: 52924,
        Versa: 106772,
        Xterra: 1
    },
    Porsche: {
        911: 8970,
        Boxster: 2287,
        Cayenne: 13203,
        Cayman: 2800,
        Macan: 21429,
        Panamera: 6431
    },
    Smart: { Fortwo: 3071 },
    Subaru: {
        BRZ: 4131,
        Crosstrek: 110138,
        Forester: 177563,
        Impreza: 117401,
        Legacy: 49837,
        Outback: 188886
    },
    Tesla: { 'Model 3': 2320, 'Model S †': 28800, 'Model X †': 24000 },
    Toyota: {
        '4Runner': 128296,
        '86/Scion FR-S': 6846,
        Avalon: 32583,
        Camry: 387081,
        'C-HR': 25755,
        Corolla: 329196,
        'FJ Cruiser': 4,
        Highlander: 215775,
        'Land Cruiser': 3100,
        Mirai: 1838,
        Prius: 108662,
        RAV4: 407594,
        Sequoia: 12156,
        Sienna: 111489,
        Tacoma: 198124,
        Tundra: 116285,
        Venza: 14,
        Yaris: 44380
    },
    Volkswagen: {
        Atlas: 27119,
        Beetle: 15166,
        CC: 1355,
        Eos: 1,
        Golf: 68978,
        Jetta: 115807,
        Passat: 60722,
        Tiguan: 46983,
        Touareg: 3545
    },
    Volvo: { S60: 16825, S80: 7, S90: 11090, XC60: 22516, XC90: 30996 }
}

const sankey_chart_data = [
    { from: 'A', to: 'D', value: 10 },
    { from: 'B', to: 'D', value: 8 },
    { from: 'B', to: 'E', value: 4 },
    { from: 'C', to: 'E', value: 3 },
    { from: 'D', to: 'G', value: 5 },
    { from: 'D', to: 'I', value: 2 },
    { from: 'D', to: 'H', value: 3 },
    { from: 'E', to: 'H', value: 6 },
    { from: 'G', to: 'J', value: 5 },
    { from: 'I', to: 'J', value: 1 },
    { from: 'H', to: 'J', value: 9 }
]

const race_bar_chart_data = {
    2003: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },

        {
            network: 'Friendster',
            MAU: 4470000
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 0
        }
    ],
    2004: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 3675135
        },
        {
            network: 'Friendster',
            MAU: 5970054
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 980036
        },
        {
            network: 'Orkut',
            MAU: 4900180
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 0
        }
    ],
    2005: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 7399354
        },
        {
            network: 'Friendster',
            MAU: 7459742
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 9731610
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 19490059
        },
        {
            network: 'Orkut',
            MAU: 9865805
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 1946322
        }
    ],
    2006: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 14949270
        },
        {
            network: 'Friendster',
            MAU: 8989854
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 19932360
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 54763260
        },
        {
            network: 'Orkut',
            MAU: 14966180
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 248309
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 19878248
        }
    ],
    2007: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 29299875
        },
        {
            network: 'Friendster',
            MAU: 24253200
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 29533250
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 69299875
        },
        {
            network: 'Orkut',
            MAU: 26916562
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 488331
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 143932250
        }
    ],
    2008: [
        {
            network: 'Facebook',
            MAU: 100000000
        },
        {
            network: 'Flickr',
            MAU: 30000000
        },
        {
            network: 'Friendster',
            MAU: 51008911
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 55045618
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 72408233
        },
        {
            network: 'Orkut',
            MAU: 44357628
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 1944940
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 294493950
        }
    ],
    2009: [
        {
            network: 'Facebook',
            MAU: 276000000
        },
        {
            network: 'Flickr',
            MAU: 41834525
        },
        {
            network: 'Friendster',
            MAU: 28804331
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 57893524
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 70133095
        },
        {
            network: 'Orkut',
            MAU: 47366905
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 3893524
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 413611440
        }
    ],
    2010: [
        {
            network: 'Facebook',
            MAU: 517750000
        },
        {
            network: 'Flickr',
            MAU: 54708063
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 166029650
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 59953290
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 68046710
        },
        {
            network: 'Orkut',
            MAU: 49941613
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 43250000
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 19532900
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 480551990
        }
    ],
    2011: [
        {
            network: 'Facebook',
            MAU: 766000000
        },
        {
            network: 'Flickr',
            MAU: 66954600
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 46610848
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 46003536
        },
        {
            network: 'Orkut',
            MAU: 47609080
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 92750000
        },
        {
            network: 'WeChat',
            MAU: 47818400
        },
        {
            network: 'Weibo',
            MAU: 48691040
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 642669824
        }
    ],
    2012: [
        {
            network: 'Facebook',
            MAU: 979750000
        },
        {
            network: 'Flickr',
            MAU: 79664888
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 107319100
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 45067022
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 146890156
        },
        {
            network: 'Twitter',
            MAU: 160250000
        },
        {
            network: 'WeChat',
            MAU: 118123370
        },
        {
            network: 'Weibo',
            MAU: 79195730
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 844638200
        }
    ],
    2013: [
        {
            network: 'Facebook',
            MAU: 1170500000
        },
        {
            network: 'Flickr',
            MAU: 80000000
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 205654700
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 117500000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 293482050
        },
        {
            network: 'Twitter',
            MAU: 223675000
        },
        {
            network: 'WeChat',
            MAU: 196523760
        },
        {
            network: 'Weibo',
            MAU: 118261880
        },
        {
            network: 'Whatsapp',
            MAU: 300000000
        },
        {
            network: 'YouTube',
            MAU: 1065223075
        }
    ],
    2014: [
        {
            network: 'Facebook',
            MAU: 1334000000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 254859015
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 250000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 135786956
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 388721163
        },
        {
            network: 'Twitter',
            MAU: 223675000
        },
        {
            network: 'WeChat',
            MAU: 444232415
        },
        {
            network: 'Weibo',
            MAU: 154890345
        },
        {
            network: 'Whatsapp',
            MAU: 498750000
        },
        {
            network: 'YouTube',
            MAU: 1249451725
        }
    ],
    2015: [
        {
            network: 'Facebook',
            MAU: 1516750000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 298950015
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 400000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 163346676
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 475923363
        },
        {
            network: 'Twitter',
            MAU: 304500000
        },
        {
            network: 'WeChat',
            MAU: 660843407
        },
        {
            network: 'Weibo',
            MAU: 208716685
        },
        {
            network: 'Whatsapp',
            MAU: 800000000
        },
        {
            network: 'YouTube',
            MAU: 1328133360
        }
    ],
    2016: [
        {
            network: 'Facebook',
            MAU: 1753500000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 398648000
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 550000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 143250000
        },
        {
            network: 'Reddit',
            MAU: 238972480
        },
        {
            network: 'Snapchat',
            MAU: 238648000
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 565796720
        },
        {
            network: 'Twitter',
            MAU: 314500000
        },
        {
            network: 'WeChat',
            MAU: 847512320
        },
        {
            network: 'Weibo',
            MAU: 281026560
        },
        {
            network: 'Whatsapp',
            MAU: 1000000000
        },
        {
            network: 'YouTube',
            MAU: 1399053600
        }
    ],
    2017: [
        {
            network: 'Facebook',
            MAU: 2035750000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 495657000
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 750000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 195000000
        },
        {
            network: 'Reddit',
            MAU: 297394200
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 239142500
        },
        {
            network: 'Tumblr',
            MAU: 593783960
        },
        {
            network: 'Twitter',
            MAU: 328250000
        },
        {
            network: 'WeChat',
            MAU: 921742750
        },
        {
            network: 'Weibo',
            MAU: 357569030
        },
        {
            network: 'Whatsapp',
            MAU: 1333333333
        },
        {
            network: 'YouTube',
            MAU: 1495657000
        }
    ],
    2018: [
        {
            network: 'Facebook',
            MAU: 2255250000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 430000000
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 1000000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 246500000
        },
        {
            network: 'Reddit',
            MAU: 355000000
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 500000000
        },
        {
            network: 'Tumblr',
            MAU: 624000000
        },
        {
            network: 'Twitter',
            MAU: 329500000
        },
        {
            network: 'WeChat',
            MAU: 1000000000
        },
        {
            network: 'Weibo',
            MAU: 431000000
        },
        {
            network: 'Whatsapp',
            MAU: 1433333333
        },
        {
            network: 'YouTube',
            MAU: 1900000000
        }
    ]
}

const axisRotation = 60
const barColorValue = '#ABBABF'
const colors = ['#ABBABF', '#DCEAEE']

function CountryDataCharts() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [])

    return (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                {loading ? (
                    <div className="flex flex-wrap -mx-3 -mb-6">
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Total Spending
                                </h3>
                                <div className="flex items-end">
                                    <div className=" text-primary-dark pb-10">
                                        <span>
                                            <strong className="text-xl inline-block mr-3">
                                                87M
                                            </strong>
                                            USD
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <BarChart
                                            data={bar_chart_data}
                                            barColorValue={barColorValue}
                                            axisRotation={axisRotation}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Total contracts
                                </h3>
                                <div className="flex items-end">
                                    <div className=" text-primary-dark pb-10">
                                        <span>
                                            <strong className="text-xl inline-block mr-3">
                                                218
                                            </strong>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <BarChart
                                            data={bar_chart_data}
                                            barColorValue={barColorValue}
                                            axisRotation={axisRotation}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Cancelled awards
                                </h3>
                                <div className="flex items-end">
                                    <div className=" text-primary-dark pb-10">
                                        <span>
                                            <strong className="text-xl inline-block mr-3">
                                                51
                                            </strong>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <PieChart
                                            data={pie_chart_data}
                                            colors={colors}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Procurement trend
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <AreaChart data={area_chart_data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Combined Chart with multiple value axes
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <CombinedChart
                                            data={combined_chart_data}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Tree Map Chart Visualization
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <TreeMapChart
                                            data={treemap_chart_data}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Sankey Diagram
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <SankeyChart data={sankey_chart_data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Compare Chart Visualization
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <CompareChart />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                                    Race Bar Chart Visualization
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <RaceBarChart
                                            data={race_bar_chart_data}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </section>
    )
}

export default CountryDataCharts
