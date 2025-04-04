import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-60  sm:h-60 md:h-80'>
            <div className='border-4 w-10 h-10 scale-200 rounded-full border-red-300 border-t-transparent animate-spin'></div>
    </div>
  )
}

export default Loading;
