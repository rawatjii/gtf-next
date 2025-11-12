import React from 'react';
import Header from '../components/Home/Header';

const Home = () => {
    return (
        <>
        <Header/>
        <section className="px-4 md:px-8 lg:px-[35px] pb-[90px] pt-[90px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
                <div className="col-span-1 md:col-span-3">
                    <figure className="w-full">
                        <img 
                            src="/assets/founder/director-satish-sir.jpg" 
                            className="w-full object-cover" 
                            alt="Satish Singh"
                        />
                    </figure>
                </div>
                <div className="col-span-1 md:col-span-7">
                    <div className="ml-0 md:ml-[120px] flex flex-col justify-center h-full">
                        <h2 className="font-[oswald] mb-[24px] font-medium text-4xl md:text-5xl lg:text-[60px] uppercase">
                            Satish Singh
                        </h2>
                        <h3 className="font-[oswald] font-medium text-2xl md:text-3xl lg:text-[35px] uppercase">
                            Co-Founder
                        </h3>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="col-span-1 md:col-span-3">
                    <figure className="w-full">
                        <img 
                            src="/assets/founder/director-satish-sir.jpg" 
                            className="w-full object-cover" 
                            alt="Megha Rana"
                        />
                    </figure>
                </div>
                <div className="col-span-1 md:col-span-7">
                    <div className="ml-0 md:ml-[120px] flex flex-col justify-center h-full">
                        <h2 className="font-[oswald] mb-[24px] font-medium text-4xl md:text-5xl lg:text-[60px] uppercase">
                            Megha Rana
                        </h2>
                        <h3 className="font-[oswald] font-medium text-2xl md:text-3xl lg:text-[35px] uppercase">
                            Art Director
                        </h3>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Home;