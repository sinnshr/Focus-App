import React from 'react'
import { CgShapeSquare } from "react-icons/cg";
import { ImCross } from "react-icons/im";

function Window({ title, children }) {
    return (
        <div className="shadow-[5px_5px_3px_0_#2F3E2F,7px_7px_1px_5px_#819067] rounded-xl">
            {/* Header Section */}
            <div className='border-3 border-neutral-700 w-[800px] flex justify-between items-center rounded-tl-xl rounded-tr-xl bg-[#819267]'>

                <h2 className='py-0.5 px-3 font-medium text-xl text-[#1f291f] cursor-default'>{title}</h2>

                <div className="flex py-0.5 px-3 items-center shadow-none">
                    <i className="hn hn-minus-solid pt-2 px-1"></i>
                    <CgShapeSquare className="size-4" />
                    <ImCross className="px-1 size-4.5" />
                </div>
            </div>

            {/* Main Window */}
            <div
                className="border-r-3 border-l-3 border-b-3 border-neutral-700 h-[450px] rounded-bl-xl rounded-br-xl flex flex-col bg-[#CADCAE]"
                style={{ width: "800px", minWidth: "800px", maxWidth: "800px" }}
            >
                {children}
            </div>
        </div>
    )
}

export default Window