import React from 'react'
import useTrans from '../../../hooks/useTrans'

const Countries = () => {
    const { trans } = useTrans()
    window.scrollTo(0, 0)

    return (
        <section className="news px-4 py-24 bg-blue-0 -mt-8">
            <div className="container mx-auto">
                <span className="text-2xl mb-10">{trans('Countries')}</span>
                <div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Countries
