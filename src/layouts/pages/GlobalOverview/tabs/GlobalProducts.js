import React, { useEffect, useState } from 'react'
import { ReactComponent as SortIcon } from '../../../../assets/img/icons/ic_sort.svg'
import TreeMapChart from '../../../../components/Charts/TreeMapChart/TreeMapChart'
import Loader from '../../../../components/Loader/Loader'

const GlobalProducts = () => {
    // TreeMap Chart Data

    let data = {
        Acura: {
            ILX: 11757,
            MDX: 54886,
            NSX: 581
        },
        'Alfa Romeo': { '4C': 407, Giulia: 8903, Stelvio: 2721 },
        Audi: {
            A3: 20733,
            'A3 e-tron': 2877,
            A4: 37674,
            A5: 21301
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
            X1: 30826
        },
        Buick: {
            Cascada: 5595,
            Enclave: 48564,
            Encore: 88035,
            Envision: 41040
        },
        Cadillac: {
            ATS: 13100,
            CT6: 10542,
            CTS: 10344
        },
        Chevrolet: {
            Bolt: 23297,
            Camaro: 67940,
            'Caprice PPV': 693,
            'City Express': 8348,
            Colorado: 112996,
            Corvette: 25079,
            Cruze: 184751
        },
        Chrysler: {
            200: 18457,
            300: 51237,
            Pacifica: 118274
        },
        Dodge: {
            Avenger: 14,
            Challenger: 64537,
            Viper: 585,
            'RAM P/U': 500723,
            'RAM ProMaster': 40483,
            'RAM ProMaster City': 15584
        },
        Fiat: { '124 Spider': 4478, 500: 12685, '500L': 1664, '500X': 7665 },
        Ford: {
            'C-Max': 18390,
            Edge: 142603,
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
            Savana: 29679
        },
        Honda: {
            Accord: 322655,
            Civic: 377286,
            'Clarity FCV': 2455,
            Pilot: 127279,
            Ridgeline: 34749
        },
        Hyundai: {
            Accent: 58955,
            Veloster: 12658
        },
        Infiniti: {
            Q50: 40739,
            Q60: 10751
        },
        Jaguar: {
            'F-Pace': 18946,
            'F-Type': 4108,
            XE: 9278,
            XF: 4541,
            XJ: 2721
        },
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
            Niro: 27237
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
            GS: 7773
        },
        Lincoln: {
            Continental: 12012,
            MKC: 27048,
            MKS: 153
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
            'E / CLS-Class': 51312
        },
        Mini: { Cooper: 32232, Countryman: 14864, Paceman: 9 },
        Mitsubishi: {
            'i MiEV': 6,
            Lancer: 12725
        },
        Nissan: {
            '370Z': 4614,
            Altima: 254996,
            Armada: 35667,
            Frontier: 74360,
            'GT-R': 578
        },
        Porsche: {
            911: 8970,
            Boxster: 2287,
            Cayenne: 13203
        },
        Smart: { Fortwo: 3071 },
        Subaru: {
            BRZ: 4131,
            Crosstrek: 110138,
            Forester: 177563,
            Impreza: 117401
        },
        Tesla: { 'Model 3': 2320, 'Model S †': 28800, 'Model X †': 24000 },
        Toyota: {
            '4Runner': 128296,
            '86/Scion FR-S': 6846,
            Avalon: 32583,
            Camry: 387081
        },
        Volkswagen: {
            Atlas: 27119,
            Beetle: 15166,
            CC: 1355,
            Eos: 1,
            Golf: 68978
        },
        Volvo: { S60: 16825, S80: 7, S90: 11090, XC60: 22516, XC90: 30996 }
    }

    const [loading, setLoading] = useState(true)

    let tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const tempTableData = tempArray.map((index) => {
        return (
            <tr key={index}>
                <td className="uppercase">SERVICIOS DE LABORATORIO CLÍNICO</td>
                <td>Mexico</td>
                <td>21</td>
                <td>3</td>
                <td>2,352,045</td>
                <td className="uppercase">1.2</td>
            </tr>
        )
    })

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className="flex flex-wrap -mx-3 mb-16">
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <TreeMapChart data={data} />
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <span className="flex items-center">
                                        Product Category
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th>
                                    <span className="flex items-center">
                                        # of contracts
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th>
                                    <span className="flex items-center">
                                        # of suppliers
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th>
                                    <span className="flex items-center">
                                        # of buyers
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th>
                                    <span className="flex items-center">
                                        value (usd)
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>{tempTableData}</tbody>
                    </table>
                    <div className="text-center mt-8">
                        <button className="text-primary-blue">Load more</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GlobalProducts
