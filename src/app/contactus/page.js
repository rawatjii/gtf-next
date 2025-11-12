import React from 'react';
import Contactform from '../components/Contactform';
import ContactusBanner from '../components/Contactus/ContactBanner';
import ContactMidSec from '../components/Contactus/ContactMidSec';
const ContactUs = () => {
    
    return (
        <div className='px-[35px]'>
               <ContactusBanner/>
               <ContactMidSec/>
               <div className='pb-[80px]'>
                <Contactform/>
             </div>
        </div>
    );
}

export default ContactUs;
