import Api from './api'
import { getURI } from '../helpers/api'

class VisualizationService {
    static async GlobalMap(params) {
        try {
            const res = await Api.get(getURI('visualization.world-map'), params)

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async CountryMap(params) {
        try {
            const res = await Api.get(
                getURI('visualization.country-map'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async TotalSpending(params) {
        try {
            const res = await Api.get(
                getURI('visualization.total-spending'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async TotalContracts(params) {
        try {
            const res = await Api.get(
                getURI('visualization.total-contracts'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async AverageBids(params) {
        try {
            const res = await Api.get(
                getURI('visualization.average-bids'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async DirectOpen(params) {
        try {
            const res = await Api.get(
                getURI('visualization.direct-open'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async TopSuppliers(params) {
        try {
            const res = await Api.get(
                getURI('visualization.top-suppliers'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async TopBuyers(params) {
        try {
            const res = await Api.get(
                getURI('visualization.top-buyers'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ProductDistribution(params) {
        try {
            const res = await Api.get(
                getURI('visualization.product-distribution'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ContractStatus(params) {
        try {
            const res = await Api.get(
                getURI('visualization.contract-status'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async QuantityCorrelation(params) {
        try {
            const res = await Api.get(
                getURI('visualization.quantity-correlation'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async Monopolization(params) {
        try {
            const res = await Api.get(
                getURI('visualization.monopolization'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async GlobalSuppliers(params) {
        try {
            const res = await Api.get(
                getURI('visualization.global-suppliers'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async CountrySuppliers(params) {
        try {
            const res = await Api.get(
                getURI('visualization.country-suppliers'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async EquityIndicators(params) {
        try {
            const res = await Api.get(
                getURI('visualization.equity-indicators'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ProductTimeline(params) {
        try {
            const res = await Api.get(
                getURI('visualization.product-timeline'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ProductTimelineRace(params) {
        try {
            const res = await Api.get(
                getURI('visualization.product-timeline-race'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async BuyerTableList(params) {
        try {
            const res = await Api.get(getURI('buyers'), params)

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async SupplierTableList(params) {
        try {
            const res = await Api.get(getURI('suppliers'), params)

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async BuyerDetail(id) {
        try {
            const res = await Api.get(`${getURI('buyer-detail')}/${id}`)

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async SupplierDetail(id) {
        try {
            const res = await Api.get(`${getURI('supplier-detail')}/${id}`)

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async CountryPartners(params) {
        try {
            const res = await Api.get(
                getURI('visualization.country-partners'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async BuyerSummary(params) {
        try {
            const res = await Api.get(
                getURI('visualization.buyer-summary'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async SupplierSummary(params) {
        try {
            const res = await Api.get(
                getURI('visualization.supplier-summary'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ProductSummary(params) {
        try {
            const res = await Api.get(
                getURI('visualization.product-summary'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async EquitySummary(params) {
        try {
            const res = await Api.get(
                getURI('visualization.equity-summary'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async RedFlagSummary(params) {
        try {
            const res = await Api.get(
                getURI('visualization.red-flag-summary'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ContractRedFlags(params) {
        try {
            const res = await Api.get(
                getURI('visualization.contract-red-flags'),
                params
            )

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async OverallStatistics() {
        try {
            const res = await Api.get(getURI('overall-statistics'))

            if (res.status !== 200) {
                throw new Error()
            }

            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default VisualizationService
