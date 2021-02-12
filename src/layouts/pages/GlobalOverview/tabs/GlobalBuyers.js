import React, { useState } from 'react'
import { Modal, useModal, ModalTransition } from 'react-simple-hook-modal'
import { Buyers, TotalContracts, TotalSpending } from '../../../../components/Visualizations'
import BuyerTable from '../../../../components/Tables/BuyerTable'
import VisualizationModal from "../modal/VisualizationModal"

const GlobalBuyers = () => {
    const [modalVisualization, setModalVisualization] = useState('')
    const { isModalOpen, openModal, closeModal } = useModal()
    const modalHandler = (visualization) => {
        setModalVisualization(visualization)

        if (!isModalOpen) {
            openModal()
        }
    }

    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <Buyers label="Buyers" modalHandler={modalHandler} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalContracts label="Total Contracts" params={{ buyer: "notnull" }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalSpending label="Total Spending" params={{ buyer: "notnull" }} />
                </div>
            </div>
            <BuyerTable />
            <Modal
                id="global-buyer-modal"
                isOpen={isModalOpen}
                transition={ModalTransition.NONE}>
                <VisualizationModal
                    visualizationType={modalVisualization}
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    )
}

export default GlobalBuyers
