import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, useModal, ModalTransition } from 'react-simple-hook-modal'
import {
    DirectOpen,
    AverageBidsPerContract,
    TotalContracts,
    TotalSpending,
    Monopolization,
    ContractStatus,
    EquityIndicators,
    ProductsTimeline,
    TopSuppliers,
    TopBuyers,
    GlobalSuppliers,
    ProductDistribution,
    ContractsRedFlags,
    ContractsCorrelation
} from '../../../../components/Visualizations'
import VisualizationModal from "../../../../pages/GlobalOverview/modal/VisualizationModal"
import useTrans from "../../../../hooks/useTrans"
import 'react-simple-hook-modal/dist/styles.css'

const GlobalData = () => {
    const [modalVisualization, setModalVisualization] = useState('')
    const { isModalOpen, openModal, closeModal } = useModal()
    const { trans } = useTrans()

    const modalHandler = (visualization) => {
        setModalVisualization(visualization)

        if (!isModalOpen) {
            openModal()
        }
    }
    return (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-2 -mb-4">
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <TotalSpending
                            label="Total Spending"
                            modalHandler={modalHandler}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <TotalContracts
                            label="Total Contracts"
                            modalHandler={modalHandler} />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <AverageBidsPerContract label="Average bids per contract" />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <Monopolization label="Monopolization" />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <ContractStatus label="Contract status" />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <div className="flex flex-col justify-between h-full">
                            <EquityIndicators label="Equity indicators" />
                            <DirectOpen label="Direct/Open" />
                        </div>
                    </div>
                    <div className="w-full px-2 mb-4">
                        <ProductsTimeline label="Products timeline" />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                        <TopSuppliers label="Top Suppliers" />
                        <Link
                            to="/global-overview/suppliers"
                            className="absolute -mt-12 text-primary-blue pt-3 pl-6 pb-6 inline-block">
                            View All
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                        <TopBuyers label="Top Buyers" />
                        <Link
                            to="/global-overview/buyers"
                            className="absolute -mt-12 text-primary-blue pt-3 pl-6 pb-6 inline-block">
                            View All
                        </Link>
                    </div>
                    <div className="w-full px-2 mb-4">
                        <GlobalSuppliers label="Global suppliers" />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <ProductDistribution label="Product Distribution" />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <ContractsRedFlags />
                    </div>
                    <div className="w-full px-2 mb-4">
                        <ContractsCorrelation label="Covid/Contracts quantity correlation" />
                    </div>
                </div>
            </div>
            <Modal
                id="any-unique-identifier"
                isOpen={isModalOpen}
                transition={ModalTransition.NONE}>
                <VisualizationModal visualizationType={modalVisualization} closeModal={closeModal} />
            </Modal>
        </section>
    )
}

export default GlobalData
