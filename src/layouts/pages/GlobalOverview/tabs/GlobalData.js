import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, useModal, ModalTransition } from 'react-simple-hook-modal'
import {
    DirectOpen,
    AverageBidsPerContract,
    TotalContracts,
    TotalSpending,
    Monopolization,
    EquityIndicators,
    ProductsTimeline,
    TopSuppliers,
    TopBuyers,
    GlobalSuppliers,
    ProductDistribution,
    ContractRedFlags,
    ContractsCorrelation,
    Concentration
} from '../../../../components/Visualizations'
import VisualizationModal from '../modal/VisualizationModal'
import 'react-simple-hook-modal/dist/styles.css'

const GlobalData = (props) => {
    const { disclaimerInfo = null } = props
    const [modalVisualization, setModalVisualization] = useState('')
    const { isModalOpen, openModal, closeModal } = useModal()
    const modalHandler = (visualization) => {
        setModalVisualization(visualization)

        if (!isModalOpen) {
            openModal()
        }
    }

    return (
        <section className="bg-primary-gray">
            {disclaimerInfo && disclaimerInfo}

            <div className="container mx-auto">
                <div className="hidden md:-mt-10 mb-6">
                    <p>
                        Data displayed on the COVID Contract Explorer can be
                        incomplete.
                    </p>
                    <p>
                        Please, check the Caveats and Limitations section of the{' '}
                        <Link
                            to="/global-overview/methodology"
                            className="text-primary-blue">
                            data harvesting methodology
                        </Link>
                    </p>
                </div>
                <div className="flex flex-wrap -mx-2 -mb-4">
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <TotalSpending modalHandler={modalHandler} />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <TotalContracts modalHandler={modalHandler} />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <div className="flex flex-col justify-between h-full space-y-4">
                            <AverageBidsPerContract />
                            <Monopolization />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <EquityIndicators />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <DirectOpen modalHandler={modalHandler} />
                    </div>
                    <div className="w-full px-2 mb-4">
                        <ProductsTimeline />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                        <TopSuppliers />
                        <Link
                            to="/global-overview/suppliers"
                            className="absolute -mt-8 text-primary-blue inline-block text-sm right-0 mr-6">
                            View in detail →
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                        <TopBuyers />
                        <Link
                            to="/global-overview/buyers"
                            className="absolute -mt-8 text-primary-blue inline-block text-sm right-0 mr-6">
                            View in detail →
                        </Link>
                    </div>
                    <div className="w-full px-2 mb-4">
                        <GlobalSuppliers />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <ProductDistribution />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                        <ContractRedFlags />
                        <Link
                            to="/global-overview/contracts"
                            className="absolute -mt-8 text-primary-blue inline-block text-sm right-0 mr-6">
                            View in detail →
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                        <Concentration />
                    </div>
                    <div className="w-full px-2 mb-4">
                        <ContractsCorrelation />
                    </div>
                </div>
            </div>
            <Modal
                id="global-data-modal"
                isOpen={isModalOpen}
                transition={ModalTransition.NONE}>
                <VisualizationModal
                    visualizationType={modalVisualization}
                    closeModal={closeModal}
                />
            </Modal>
        </section>
    )
}

export default GlobalData
