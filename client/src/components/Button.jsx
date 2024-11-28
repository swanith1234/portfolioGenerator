import React from 'react'

const Button = ({label,iconURL,backgroundColor,borderColor,textColor,fullWidth}) => {
  return (
   <button  className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none
   ${
     backgroundColor
       ? `${backgroundColor} ${textColor} ${borderColor}`
       : "bg-amber-600 text-white border-amber-600"
   } rounded-full ${fullWidth&& 'w-full'}`}
 >
   
   {label}
   {iconURL&&
   <img className="ml-2 rounded-full w-5 h-5" src={iconURL} alt="arrow-right" />
  }
   </button>   
  )
}

export default Button