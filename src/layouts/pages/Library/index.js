import React from 'react'
import useTrans from '../../../hooks/useTrans'
import LibraryNews from './sections/LibraryNews'
import LibraryBlogs from './sections/LibraryBlogs'
import LibraryUpcomingEvents from './sections/LibraryUpcomingEvents'
import LibraryResources from './sections/LibraryResources'
import MetaInformation from '../../../components/MetaInformation/MetaInformation'

const Library = () => {
    const { trans } = useTrans()
    window.scrollTo(0, 0)

    return (
        <div className="library">
            <MetaInformation
                title="Library"
                description="Welcome Covid-19 Contract Explorer"
            />
            <section className="news px-4 py-24 bg-blue-0 -mt-8">
                <div className="container mx-auto">
                    <p className="text-2xl mb-10">{trans('Library')}</p>
                    <LibraryNews />
                </div>
            </section>

            <LibraryBlogs />

            <LibraryUpcomingEvents />

            <LibraryResources />
        </div>
    )
}

export default Library
