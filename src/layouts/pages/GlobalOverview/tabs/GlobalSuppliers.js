import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, useModal, ModalTransition } from 'react-simple-hook-modal'
import {
    Suppliers,
    TotalContracts,
    TotalSpending
} from '../../../../components/Visualizations'
import { SupplierTable } from '../../../../components/Tables'

const VisualizationModal = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../modal/VisualizationModal'
    )
)

const GlobalSuppliers = (props) => {
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
                    <Suppliers modalHandler={modalHandler} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalContracts params={{ supplier: 'notnull' }} />
                </div>
                <div className="w-full lg:w-1/3 px-2 mb-6">
                    <TotalSpending
                        label="Total Income"
                        params={{ supplier: 'notnull' }}
                    />
                </div>
            </div>
            <SupplierTable />
            <Modal
                id="global-supplier-modal"
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

GlobalSuppliers.propTypes = {
    disclaimerInfo: PropTypes.element
}
export default GlobalSuppliers
