"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [profileArray,setProfileArray] = useState([])


    const getProfiles = async () => {
        try {
            const res = await axios.get("https://facemash-ze0r.onrender.com/leaderBoard");
;
            setProfileArray(res.data);

        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
      getProfiles();
    }, [])
  return (
    <div className='w-screen h-screen flex flex-col justify-start items-center relative pt-12'>
        <div className='w-full px-2 fled justify-start items-start'>
            <Link href={"/"}>
                <div className='w-[50px] bg-white border rounded-md my-2 flex justify-center items-center text-sm'>Back</div>
            </Link>
        </div>
        <div className='w-full flex justify-center fixed top-0 left-0 items-center py-2  text-sm bg-red-500 z-40'>
                <h1 className='text-white'>
                    Learder Board
                </h1>
        </div>
        <div className='max-w-[400px] flex-wrap grid grid-cols-2 justify-center items-start   gap-1 px-1'>
                {
                   profileArray.map((profile,index)=> (
                    <div className='max-w-[180px] col-span-1 h-[300px] relative' key={index}>
                            <div className='absolute top-3 right-3 w-[30px] h-[30px] bg-white text-red-600 flex justify-center items-center rounded-full'>
                                #{index+1}
                            </div>
                            {
                                index < 3 && (
                                    <div className='px-2 h-[20px] bg-red-600 text-white rounded-md absolute bottom-2 left-2 justify-center items-center'>
                                        <p className='text-sm'>
                                            #Certified Baddies
                                        </p>
                                    </div>
                                )
                            }
                            <img src={profile.profileImageUri} className='w-full h-full object-cover'/>
                    </div>
                   ))
                }
                
                
        </div>
    </div>
  )
}

export default page