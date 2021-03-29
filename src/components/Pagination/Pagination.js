import React, { useState, useEffect, useReducer } from 'react'
import Pagination from 'reactjs-hooks-pagination'
import axios from 'axios'
const pageLimit = 10
const initialState = {
    user: {},
    loading: true,
    error: ''
}

const Reducer = (state, action) => {
    switch (action.type) {
        case 'OnSuccess':
            return {
                loading: false,
                user: action.payload,
                error: ''
            }
        case 'OnFailure':
            return {
                loading: false,
                user: {},
                error: 'Something went wrong'
            }

        default:
            return state
    }
}

function PaginationSection() {
    const [state, dispatch] = useReducer(Reducer, initialState)
    const [totalRecords] = useState(50)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        axios
            .get(
                'http://5e709ac5667af70016317119.mockapi.io/users?page=' +
                    currentPage +
                    '&limit=' +
                    pageLimit
            )
            .then((response) => {
                dispatch({ type: 'OnSuccess', payload: response.data })
            })
            .catch(() => {
                dispatch({ type: 'OnFailure' })
            })
    }, [currentPage])

    const { loading, user, error } = state

    return (
        <div className="container mx-auto pt-5">
            <table className="table">
                <thead className="">
                    <tr>
                        <th>#ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <div>Loading ...</div>
                    ) : (
                        error == '' &&
                        user.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td>{data.email}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="pt- pb-10">
                <Pagination
                    totalRecords={totalRecords}
                    pageLimit={pageLimit}
                    pageRangeDisplayed={1}
                    onChangePage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default PaginationSection
