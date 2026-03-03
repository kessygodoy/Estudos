"use client"

const Button = ({ children }) => {
    return (
        <button className="bg-gray-500 px-2  w-full m-1 text-center rounded-md text-white font-bold">{children}</button>
    )
}

export default Button