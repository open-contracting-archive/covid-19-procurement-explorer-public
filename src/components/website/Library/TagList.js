import React, { Fragment } from "react"
import { useHistory } from 'react-router-dom'

const TagList = ({ item }) => {
    let history = useHistory()
    const handleClick = (tagSlug, type) => {
        history.push(`/tags?type=${type}&tag=${tagSlug}`)
    }

    return (
        <Fragment>
            <p className="inline-block lg:block font-bold opacity-40 mb-2">
                Tags
            </p>
            {item.tags.length ? (
                <div className="tags flex flex-wrap">
                    {item.tags && item.tags.map((tagItem, index) => (
                        <div className="tag cursor-pointer" key={index} onClick={() => {
                            handleClick(tagItem, item.contents_type)
                        }}>{tagItem}</div>
                    ))}
                </div>
            ) : (
                <span>-</span>
            )}
        </Fragment>
    )
}
export default TagList
