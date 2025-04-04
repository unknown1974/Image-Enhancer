
import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const enhancedImageAPI = async(file)=>{
    try {
        const taskID = await uploadImage(file)

        const enhancedURL = await PollForEnhancedImage(taskID)
        
        return enhancedURL
    } catch (error) {
        console.log("enhanced image error :",error)
    }
}
const uploadImage = async(file) =>{
    const formData = new FormData()
    formData.append("image_file",file)

    const {data} = await axios.post(`${BASE_URL}/api/tasks/visual/scale`,formData,{
        headers:{
            "content-Type":"multipart/form-data",
            "X-API-KEY" : API_KEY
        }
    })
    if(!data?.data?.task_id){
        throw new Error("Failed to upload image! Task Id not found.")
    }
    return data.data.task_id;
}
const fetchImage = async(taskID) =>{

    const {data} = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskID}`,{
        headers:{
            "X-API-KEY" : API_KEY
        }
    })
    
    if(!data?.data){
        throw new Error("Failed to get image!")
    }
    return data.data;


}

const PollForEnhancedImage = async(taskID,retries = 0) => {
    const result = await fetchImage(taskID);
    if(result.state === 4){
        console.log("Processing...")
        if(retries >= 20){
            throw new Error("Max retries Reached. Please try again later.")
        }
        await new Promise((resolve) => setTimeout(resolve,2000));
        return PollForEnhancedImage(taskID,retries+1);
    }
    
    return result.image;
}


// {status: 200, message: 'success', data: {…}}data: {task_id: '03c25a4e-e719-4f92-98c3-88b9a53b28ff'}message: "success"status: 200[[Prototype]]: Object