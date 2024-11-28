// import React from 'react'

// const ServiceCard = ({imgURL,label,subtext}) => {
//   return (
//     <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16'>
//         <div  className='w-11 h-11 flex justify-center items-center rounded-full bg-amber-600'>
//         <img src={imgURL} alt={label} width={24} height={24} />
//         </div>
//         <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold'>{label}</h3>
//         <p className='mt-3 break-words font-montserrat leading-normal text-slate-gray text-lg'>{subtext}</p>
//     </div>
//   )
// }

// export default ServiceCard


// import React from 'react';
// import { motion } from 'framer-motion';

// const ServiceCard = ({ imgURL, label, subtext }) => {
//   return (
//     <motion.div
//       className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16'
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: 'spring', stiffness: 100, damping: 10 }}
//     >
//       <div className='w-11 h-11 flex justify-center items-center rounded-full bg-amber-600'>
//         <img src={imgURL} alt={label} width={24} height={24} />
//       </div>
//       <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold'>{label}</h3>
//       <p className='mt-3 break-words font-montserrat leading-normal text-slate-gray text-lg'>{subtext}</p>
//     </motion.div>
//   );
// };

// export default ServiceCard;

import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ imgURL, label, subtext }) => {
  return (
    <motion.div
      className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16 bg-white transition-transform'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#fef9c3',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
    >
      <div className='w-11 h-11 flex justify-center items-center rounded-full bg-amber-600 shadow-lg'>
        <img src={imgURL} alt={label} width={24} height={24} />
      </div>
      <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold text-gray-800'>
        {label}
      </h3>
      <p className='mt-3 break-words font-montserrat leading-normal text-gray-600 text-lg'>
        {subtext}
      </p>
    </motion.div>
  );
};

export default ServiceCard;

