"use client"
import axios from 'axios'
import Link from 'next/link'

import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
const page = () => {
  
    const [profile,setProfileImage] = useState(null)
    const [profileArray,setProfileArray] = useState([])
    const [fileName,setFileName] =useState("Not selected")
    const handleImageChange = async (image) => {
      if(!image) return 
      uploadImage(image)
    }
    const fileRef = useRef()
     const handleSelect = (e) => {
        
      } 
    const uploadImage = async (image) =>{
      const formdata = new FormData()
      formdata.append("image",image)
        try{
          const res =  await axios.post("https://facemash-ze0r.onrender.com/upload-profile",formdata,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        setProfileImage(res.data.imgUrl)
        console.log(res.data)
    }catch(err){
      console.log(err)
    }
    }



    const uploadProfile = async () => {
      const payload = {
        profileImageUri : profile,
        eloRating : 1000,
        profileId : uuid()
      }
      try {
        const res = axios.post("https://facemash-ze0r.onrender.com/uploadProfile",payload,{headers:{"Content-Type" : "application/json"}})
        console.log("uploaded",(await res).data)
        setFileName("not selected")
        setProfileImage("")
        alert("uploaded")
      }catch(err) {
        console.log(err)
      }
    }



    function updateElo (winnerRating, loserRating, k = 32) {
    const expectedWin = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
    const expectedLose = 1 / (1 + Math.pow(10, (winnerRating - loserRating) / 400));

    const newWinnerRating = winnerRating + k * (1 - expectedWin);
    const newLoserRating = loserRating + k * (0 - expectedLose);

    return {
      winnerNew: Math.round(newWinnerRating),
      loserNew: Math.round(newLoserRating)
    };
  }


  const getProfiles = async()=>{
    try {
      const res = axios.get("https://facemash-ze0r.onrender.com/getProfiles")
      setProfileArray((await res).data)
      console.log((await res).data)
    }catch(err){
      console.log(err)
    }
  }

 const handleFirstProfileWin = async () => {
  try {
    const { newfirstProfileElo, newSecondProfileElo } = updateElo(profileArray[0].eloRating, profileArray[1].eloRating);

    const payload = [
      {
        _id: profileArray[0]._id,
        profileId: profileArray[0].profileId,
        profileImageUri: profileArray[0].profileImageUri,
        eloRating: newfirstProfileElo
      },
      {
        _id: profileArray[1]._id,
        profileId: profileArray[1].profileId,
        profileImageUri: profileArray[1].profileImageUri,
        eloRating: newSecondProfileElo
      }
    ];
    
    const res = await axios.post("https://facemash-ze0r.onrender.com/updateProfiles", payload);
    console.log("Profiles updated:", res.data);
    getProfiles()
  } catch (err) {
    console.error("Error updating Elo ratings:", err);
  }

};
const handleSecondProfileWin = async () => {
  try {
    const { newfirstProfileElo, newSecondProfileElo } = updateElo(profileArray[1].eloRating, profileArray[0].eloRating);

    const payload = [
      {
        _id: profileArray[0]._id,
        profileId: profileArray[0].profileId,
        profileImageUri: profileArray[0].profileImageUri,
        eloRating: newfirstProfileElo
      },
      {
        _id: profileArray[1]._id,
        profileId: profileArray[1].profileId,
        profileImageUri: profileArray[1].profileImageUri,
        eloRating: newSecondProfileElo
      }
    ];

    const res = await axios.post("https://facemash-ze0r.onrender.com/updateProfiles", payload);
    console.log("Profiles updated:", res.data);
    getProfiles()
  } catch (err) {
    console.error("Error updating Elo ratings:", err);
  }
};

  useEffect(() => {
    getProfiles();
  }, [])
  

  return (
    <div className='w-screen h-screen relative tracking-[-1px]'>
      <nav className='w-full flex justify-center items-center bg-red-600 py-2 fixed top-0 left-0'>
          <h1 className='text-white'>
            Facemash
          </h1>
      </nav>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center'>
          <h2 className='text-2xl  text-red-500'>
            Facemash
          </h2>
        </div>
        <div className='text-sm-center flex justify-center items-center'>
          <p className=''>
            Just Tap the images to vote for them.
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className='text-xs'>
              {fileName}
          </p>
          <button className='text-black bg-gray-100 border text-sm border-gray-400 px-2 py-1 rounded-md' onClick={()=> fileRef.current.click()}>
            choose
          </button>
          <input type='file' className='px-4  hidden' ref={fileRef} onChange={(e) => {
              setFileName(e.target.files[0].name)
              handleImageChange(e.target.files[0])
            }} />
          <button className="px-2 bg-blue-500 text-white text-sm rounded-md border border-blue-600 py-1" onClick={uploadProfile}>
            upload
          </button>
        </div>
        <div className='flex items-center gap-1 py-4'>
              {
                profileArray.length && (
                  <>
                  <div className='w-[180px] h-[300px] bg-black' onClick={handleFirstProfileWin}>
                      <img src={profileArray[0].profileImageUri} className='h-full w-full object-fit-cover'/>
                  </div>
                  <div className='w-[180px] h-[300px] bg-black' onClick={handleSecondProfileWin}>
                      <img src={profileArray[1].profileImageUri} className='h-full w-full object-fit-cover'/>
                  </div>
              </>
                )
              }
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
               <Link href={"/leaderBoard"}>
                  <button className='px-2 bg-red-500 text-white flex justify-center items-center rounded-md my-2'>
                    leaderBoard
                  </button>
                </Link>
              <p className='max-w-[200px] text-center text-sm text-gray-400 leading-[12px]'>
                well this was just a fun project that i have done to learn the tech stack that i currently learning.
              </p>
              <p className='max-w-[200px] text-center text-sm text-gray-400 leading-[12px] tracking-tighter mt-4'>
                Made with <span className='text-sm'>❤️</span> by Vishal.
              </p>
        </div>
      </div>
    </div>
  )
}

export default page