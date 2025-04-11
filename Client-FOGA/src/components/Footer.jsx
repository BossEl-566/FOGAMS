import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitterX, BsYoutube, BsTelegram, BsEnvelope, BsPhone } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 print:hidden border-t border-gray-200 dark:border-gray-700">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/src/assets/assembliesOfGodLogo.png" 
                alt="Assemblies of God Logo" 
                className="w-10 h-10 object-contain"
              />
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-3"></div>
              <span className="text-xl font-bold tracking-wide text-blue-800 dark:text-blue-300">FOGA</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fellowship of Grace Assemblies of God, Cape Coast. Opposite Cape FM.
            </p>
            <div className="flex space-x-4">
              <Footer.Icon href="#" icon={BsFacebook} className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"/>
              <Footer.Icon href="#" icon={BsInstagram} className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"/>
              <Footer.Icon href="#" icon={BsTelegram} className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"/>
              <Footer.Icon href="#" icon={BsYoutube} className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"/>
              <Footer.Icon href="#" icon={BsTwitterX} className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"/>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <Footer.Title title="Quick Links" className="text-blue-800 dark:text-blue-300 text-lg font-semibold mb-4 uppercase tracking-wider"/>
            <Footer.LinkGroup col className="space-y-3">
              <Footer.Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
                Home
              </Footer.Link>
              <Footer.Link href="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
                About Us
              </Footer.Link>
              <Footer.Link href="/ministries" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
                Ministries
              </Footer.Link>
              <Footer.Link href="/events" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
                Events
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Resources Column */}
          <div>
            <Footer.Title title="Resources" className="text-blue-800 dark:text-blue-300 text-lg font-semibold mb-4 uppercase tracking-wider"/>
            <Footer.LinkGroup col className="space-y-3">
              <Footer.Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
                Sermons
              </Footer.Link>
              <Footer.Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
                Bible Studies
              </Footer.Link>
              <Footer.Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
                Fundamental Truths
              </Footer.Link>
              <Footer.Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
                Giving
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Contact Column */}
          <div>
            <Footer.Title title="Contact Us" className="text-blue-800 dark:text-blue-300 text-lg font-semibold mb-4 uppercase tracking-wider"/>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <div className="flex items-start">
                <BsEnvelope className="mt-1 mr-3 flex-shrink-0" />
                <span>info@foga.org</span>
              </div>
              <div className="flex items-start">
                <BsPhone className="mt-1 mr-3 flex-shrink-0" />
                <span>+233 24 039 5732</span>
              </div>
              <div className="pt-2">
                <p className="text-sm">Aba Walker Road</p>
                <p className="text-sm">Opposite Cape FM</p>
                <p className="text-sm">Cape Coast -Pedu, Ghana</p>
              </div>
            </div>
          </div>
        </div>

        <Footer.Divider className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <Footer.Copyright 
            href="#" 
            by="Fellowship of Grace Assemblies of God-Pedu, Cape Coast" 
            year={new Date().getFullYear()}
            className="text-gray-500 dark:text-gray-400"
          />
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Footer.Link href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 text-sm transition-colors">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 text-sm transition-colors">
              Terms & Conditions
            </Footer.Link>
          </div>
        </div>
      </div>
    </Footer>
  );
}