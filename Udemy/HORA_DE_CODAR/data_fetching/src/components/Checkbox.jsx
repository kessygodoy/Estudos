"use client"
import React from 'react'

const Checkbox = ({ checked }) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            className="form-checkbox h-5 w-5"
            onChange={(e) => e.target.form.requestSubmit()}
        />
    )
}

export default Checkbox