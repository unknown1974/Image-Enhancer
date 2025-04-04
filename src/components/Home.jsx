import React, { useState } from 'react'
import ImageUpload from "./ImageUpload.jsx"
import ImagePreview from "./ImagePreview.jsx"
import { enhancedImageAPI } from '../utils/enhancedImageAPI.js'


const Home = () => {
  const [uploadImage,setuploadImage] = useState(null)
  const [enhancedImage,setenhancedImage] = useState(null)
  const [loading,setloading] = useState(false)

  const uploadImageHandler = async (file) =>{
      
      setuploadImage(URL.createObjectURL(file))
      setloading(true)

      try {
        const enhancedURL = await enhancedImageAPI(file)
        setenhancedImage(enhancedURL)
        setloading(false)
      } catch (error) {
        console.log("Error while uploading image",error.message) 
      }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8
    px-4'>
        <div className='text-center mb-8'>
            <h1 className='text-5xl font-bold text-gray-800 mb-2'>AI Image Enhancer</h1>
            <p className='text-lg text-gray-500'>Upload your image and let AI to enhance it in seconds!</p>
        </div>
        

        <ImageUpload uploadImageHandler={uploadImageHandler} />
        <ImagePreview loading = {loading} uploaded = {uploadImage} enhanced = {enhancedImage} />

        <div className='mt-10'>
            <span className='text-sm text-gray-500 '>Powered by @Unknown</span>
        </div>
    </div>
  )
}

export default Home
