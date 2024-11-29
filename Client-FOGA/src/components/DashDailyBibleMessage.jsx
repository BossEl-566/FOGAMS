import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function DashDailyBibleMessage() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen mb-20'>
        <h1 className='text-center font-semibold text-3xl my-7'>Daily Bible Message</h1>
        <form className='flex flex-col gap-4'>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
                <Select>
                    <option value='uncategorized'>Select a category</option>
                    <option value='Faith and Hope'>Faith and Hope</option>
                    <option value='Love and Forgiveness'>Love and Forgiveness</option>
                    <option value='Prayer and Spiritual Growth'>Prayer and Spiritual Growth</option>
                    <option value='Wisdom and Guidance'>Wisdom and Guidance</option>
                    <option value='Salvation and Thanksgiving'>Salvation and Thanksgiving</option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-[1px] border-blue-900 p-3">
                <FileInput type='file' id='image/*' />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload image</Button> 
            </div>
            <ReactQuill theme="snow" placeholder='Write your message' className='h-72 mb-12' required/>
            <Button type='submit' gradientDuoTone='purpleToBlue'>Publish</Button>
        </form>
    </div>
  )
}
