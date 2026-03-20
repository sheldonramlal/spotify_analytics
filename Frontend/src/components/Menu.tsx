import { useState } from "react"
import Logout from "./Logout";

function Menu() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu =() => {
        setIsOpen(prev => !prev);
    }

    return (
        <>
        <div  className='absolute top-0  flex justify-end w-full text-white border-b border-[#2a2a2a] z-50 px-5 py-4 md:px-16'>
        {/* menu icon */}
            <div onClick={toggleMenu} className='block cursor-pointer md:hidden'>
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.94971 11.9497H39.9497" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.94971 23.9497H39.9497" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.94971 35.9497H39.9497" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="hidden md:block">
                 <Logout />
            </div>
        </div>
        

            <div className={`block md:hidden fixed top-0 right-0 z-50 w-full md:w-1/3 h-screen bg-[#0f0f0f]  transition transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                <div className='flex  px-5 h-16 items-center md:pr-16  justify-end border-b border-[#2a2a2a] ' >

                    

                    <div onClick={toggleMenu} className='flex justify-end cursor-pointer ' >
                        <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 8L40 40" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 40L40 8" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>

                </div>
                <div className="flex items-center justify-center w-full h-full text-white ">
                   <Logout />

                </div>
                </div>

    
        
    </>
    )
}

export default Menu