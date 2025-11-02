import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-slate-800'>
            <div className="myContainer flex justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>Protect/&gt;</span>
                </div>

                <button
                    className="text-white my-5 mx-2 rounded-full flex items-center ring-white ring-1 px-0.5 py-0.5 transform transition duration-150 ease-out active:scale-95 active:shadow-inner focus:outline-none select-none cursor-pointer hover:bg-gray-900"
                >
                    <img className="invert w-10 p-1" src="/icons/github.svg" alt="github logo" />
                    <span className="font-bold px-2">GitHub</span>
                </button>
            </div>
        </div>
    )
}

export default Navbar
