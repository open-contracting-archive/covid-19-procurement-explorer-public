import React, { useState } from 'react'
import { Modal, useModal, ModalTransition } from 'react-simple-hook-modal'
import {
    Buyers,
    TotalContracts,
    TotalSpending
} from '../../../../components/Visualizations'
import { BuyerTable } from '../../../../components/Tables'
import VisualizationModal from '../modal/VisualizationModal'

const GlobalBuyers = (props) => {
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
        <div>
            {disclaimerInfo && disclaimerInfo}

            <div className="flex flex-wrap -mx-3 md:mb-16">
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <Buyers modalHandler={modalHandler} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalContracts params={{ buyer: 'notnull' }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalSpending params={{ buyer: 'notnull' }} />
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
