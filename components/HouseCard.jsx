"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';



//CloudName =>dbm0tkc3n
//upload_preset => practice
export default function HouseCard() {
  const {register,handleSubmit} = useForm();
  const [uploadedImageUrl,setUploadedImageUrl] = useState();


  async function onSubmit(data){
    //Extract the uploaded image
    const image = data.profile[0];
    //Create an instance of the form data
    const formData = new FormData();
    //Append the image to the FormData
    formData.append('file',image);
    //Bind the upload-preset from cloudinary to the formData
    formData.append("upload_preset","practice");
    //We make an API request to the Cloudinary end-point
    const uploadResponse = await fetch(
    "https://api.cloudinary.com/v1_1/dbm0tkc3n/image/upload",
    {
    method:"POST",
    body:formData,

    });
    const uploadedImageData = await uploadResponse.json();
    const imageUrl = uploadedImageData.secure_url;
    setUploadedImageUrl(imageUrl);


    console.log(image);

  }
 
  return (
    <div className="whole-card">
        <div className="top-house-card">

          {
            uploadedImageUrl && (
              <img src={uploadedImageUrl} alt="This is an image Uploaded" />
            )
          }

        </div>
        <div className="middle-house-card">

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="file_input">
              Upload File
            </label>
            <input
            {...register("profile")}
            aria-describedby="file_input_help"
            id="file_input" 
            type="file" />
            <p>SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

           <button type="submit">
           Upload to Cloud
          </button>




          </form>



        </div>
        <div className="bottom-house-card">

        

        </div>
      
    </div>
  )
}
