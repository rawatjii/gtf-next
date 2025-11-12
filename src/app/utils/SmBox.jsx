import React from 'react';

const SmBox = ({logoBoxRef,heading,number}) => {
    return (
          <div
              className="logo_box border-[1px] inline-block px-[20px] py-[8px] border-[#000]"
              ref={logoBoxRef}
            >
              <figure className="flex justify-center place-items-center">
                <strong className="text-[#1E251F] font-[Oswald] text-[35px] me-[20px]">#</strong>
                <h4 className="font-[Oswald] text-start text-[#1E251F] grow-[0] shrink-[0] uppercase basis-[128px] text-[14px]">
                  {heading}
                </h4>
                <strong className="text-[#1E251F] font-[Oswald] text-[35px] ms-[20px]">{number}</strong>
              </figure>
            </div>
    );
}

export default SmBox;
