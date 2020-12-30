import React from 'react'

const Loader = ({sm}) => {
    return (
        <section
            className="flex items-center justify-center pb-8"
            style={{ height: `${sm ? '200px' : '400px'}` }}>
            <span className="loader"/>
        </section>
    )
}
export default Loader
