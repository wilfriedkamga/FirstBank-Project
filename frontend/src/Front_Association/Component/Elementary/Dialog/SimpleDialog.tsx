import React from 'react'

type ChildComponentProps = {
    handleClose: () => void;
    message:String;
    
  };

const Dialog: React.FC<ChildComponentProps> = ({
    handleClose,
    message
   
  }) => {


  return (
    <div className="  mx-auto mr-0 w-full  z-50 justify-center items-center ">



<div   className=" absolute mx-auto mr-0 w-full  z-50 justify-center shadow items-center rounded-lg border  bg-white ">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white  dark:bg-gray-700">
            <button onClick={handleClose} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-red-600 w-12 h-12 dark:text-red-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"> {message} </h3>
                <button onClick={handleClose} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    OK
                </button>
            </div>
        </div>
    </div>
</div>


    </div>
  )
}

export default Dialog;
   