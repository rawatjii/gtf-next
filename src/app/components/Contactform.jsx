import React from 'react';

const Contactform = () => {
    return (
           <form className="relative mix-blend-multiply md:pt-[100px] flex flex-wrap justify-between font-[Oswald] md:pb-[90px]  py-[60px]">
        <div className="basis-[100%] mb-[30px]">
          <input
            placeholder="YOUR NAME"
            type="text"
            name="name"
            className="border-b-[1px] md:text-[32px] text-[18px] font-[600] bg-transparent placeholder:text-black placeholder:opacity-[0.2] placeholder:text-[24px] outline-none pb-[13px] w-[100%] block border-solid border-black"
          />
          <label
            htmlFor="name"
            className="block md:text-[20px] text-[18px] font-[500] w-[100%] md:mt-[15px] mt-[5px]"
          >
            FIRST AND LAST NAME*
          </label>
        </div>
        <div className="md:basis-[48%] basis-[100%] mb-[25px] md:mb-[40px]">
          <input
            placeholder="YOUR EMAIL"
            type="text"
            name="email"
            className="border-b-[1px] md:text-[32px] text-[18px] font-[600] bg-transparent placeholder:text-black placeholder:opacity-[0.2] placeholder:text-[24px] outline-none pb-[13px] w-[100%] block border-solid border-black"
          />
          <label
            htmlFor="email"
            className="block md:text-[20px] text-[18px] font-[500] w-[100%] md:mt-[15px] mt-[5px]"
          >
            YOUR EMAIL ADDRESS
          </label>
        </div>
        <div className="md:basis-[48%] basis-[100%] mb-[25px] md:mb-[40px]">
          <input
            type="YOUR NAME"
            name="number"
            placeholder="YOUR PHONE NUMBER"
            className="border-b-[1px] md:text-[32px] text-[18px] font-[600] bg-transparent placeholder:text-black placeholder:opacity-[0.2] placeholder:text-[24px] outline-none pb-[13px] w-[100%] block border-solid border-black"
          />
          <label
            htmlFor="number"
            className="block md:text-[20px] text-[18px] font-[500] w-[100%] md:mt-[15px] mt-[5px]"
          >
            YOUR PHONE-NUMBER
          </label>
        </div>
        <div className="md:basis-[48%] basis-[100%] mb-[25px] md:mb-[40px]">
          <input
            type="text"
            name="company"
            placeholder="YOUR COMPANY"
            className="border-b-[1px] md:text-[32px] text-[18px] font-[600] bg-transparent placeholder:text-black placeholder:opacity-[0.2] placeholder:text-[24px] outline-none pb-[13px] w-[100%] block border-solid border-black"
          />
          <label
            htmlFor="company"
            className="block md:text-[20px] text-[18px] font-[500] w-[100%] md:mt-[15px] mt-[5px]"
          >
            YOUR COMPANY*
          </label>
        </div>
        <div className="md:basis-[48%] basis-[100%] md:mb-[40px] mb-[25px]">
          <input
            type="text"
            name="service"
            placeholder="SELECT SERVICE"
            className="border-b-[1px] md:text-[32px] text-[18px] font-[600] bg-transparent placeholder:text-black placeholder:opacity-[0.2] placeholder:text-[24px] outline-none pb-[13px] w-[100%] block border-solid border-black"
          />
          <label
            htmlFor="service"
            className="block md:text-[20px] text-[18px] font-[500] w-[100%] md:mt-[15px] mt-[5px]"
          >
            SERVICES
          </label>
        </div>
        <div className="basis-[100%] mb-[25px] md:mb-[40px]">
          <input
            placeholder="YOUR MESSAGE"
            type="text"
            name="name"
            className="border-b-[1px] md:text-[32px] text-[18px] font-[600] bg-transparent placeholder:text-black placeholder:opacity-[0.2] placeholder:text-[24px] outline-none pb-[13px] w-[100%] block border-solid border-black"
          />
          <label
            htmlFor="name"
            className="block md:text-[20px] text-[18px] font-[500] w-[100%] md:mt-[15px] mt-[5px]"
          >
            YOUR MESSAGE*
          </label>
        </div>
        
        <div className="md:mb-[40px] w-[100%] flex-wrap flex justify-between place-items-center">
            <div className='flex justify-between'>
            <input
              type="checkbox"
              id="formcheck"
              className="mt-1 grow-[0] shrink-[0] h-[22px] basis-[35px] accent-[#000]"
            />
            <label
              htmlFor="formcheck"
              className="ml-[0.6rem] cursor-pointer  md:text-[18px] inline-block"
            >
              I accept the terms and conditions Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </label>
          </div>
          <div className="md:text-start text-center  md:mt-[0] md:mt-[20px] mt-[50px]">
            <button className="bg-[black] font-[600] uppercase font-[Oswald] rounded-md shadow-md text-white cursor-pointer  xl:text-[18px] text-[16px]  outline-none px-12 py-[0.54rem] text-center transition-transform duration-150 ease-in-out hover:shadow-lg hover:-translate-y-1">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
}

export default Contactform;
