import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitterX, BsYoutube, BsTelegram } from 'react-icons/bs';

export default function FooterCom() {
  return (
   <Footer container className='border border-t-8 border-teal-500 print:hidden'>
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid w-full justify-between sm:flex md:grid-cols-1">
        <div className="mt-5">
        <Link to='/' className='self-center whitespace-nowrap'>
        <div className='flex items-center'>
          <img src='/src/assets/assembliesOfGodLogo.png' alt='Assemblies of God Logo' width='30' height='20' />
          <div className='w-px h-8 bg-blue-950 ml-1 dark:bg-white'></div>
          <div className='ml-1 hidden md:block md:text-sm lg:text-base font-semibold dark:text-white text-blue-950'>FOGA</div>
          <div className='ml-1 block md:hidden font-bold dark:text-white text-blue-950'>FOGA</div>
        </div>
      </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
          <div>
          <Footer.Title title='ABOUT' />
          <Footer.LinkGroup col>
          <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
            Assemblies of God Fundamental Truth
          </Footer.Link>
          <Footer.Link href='/about'  rel='noopener noreferrer'>
            About FOGA
          </Footer.Link>
          <Footer.Link href='/project'  rel='noopener noreferrer'>
            Project
          </Footer.Link>
          </Footer.LinkGroup>
          </div> 
          <div>
          <Footer.Title title='FOLLOW US' />
          <Footer.LinkGroup col>
          <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
            something here
          </Footer.Link>
          <Footer.Link href='/about'  rel='noopener noreferrer'>
            About FOGA
          </Footer.Link>
          <Footer.Link href='/project'  rel='noopener noreferrer'>
            Project
          </Footer.Link>
          </Footer.LinkGroup>
          </div>
          <div>
          <Footer.Title title='LEGAL' />
          <Footer.LinkGroup col>
          <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
            Privacy Policy
          </Footer.Link>
          <Footer.Link href='/about'  rel='noopener noreferrer'>
            Terms &amp; Condition
          </Footer.Link>
          <Footer.Link href='/project'  rel='noopener noreferrer'>
            Project
          </Footer.Link>
          </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href='#' by='FOGA' year={new Date().getFullYear()}/>
        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
          <Footer.Icon href='#' icon={BsFacebook}/>
          <Footer.Icon href='#' icon={BsInstagram}/>
          <Footer.Icon href='#' icon={BsTelegram}/>
          <Footer.Icon href='#' icon={BsYoutube}/>
          <Footer.Icon href='#' icon={BsTwitterX}/>
        </div>
      </div>
    </div>

   </Footer> 
  );
}
