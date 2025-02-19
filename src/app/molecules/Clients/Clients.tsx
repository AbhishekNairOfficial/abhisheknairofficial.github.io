import React from 'react';
import Image from 'next/image';

const Clients = () => {
    return (
        <section className="mx-[50px] p-[50px]">
            <h2 className="font-primary text-5xl underline mb-[30px]">Clients</h2>
            <div className="border-t-[3px] border-b-[3px] border-black -mx-[50px]">
                <div className="px-[50px] flex justify-center gap-[50px]">
                    <Image
                        src="/images/T-mobile_logo.png"
                        alt="Tmobile Logo"
                        width={200}
                        height={100}
                        className="w-auto h-[100px]"
                    />
                    <Image
                        src="/images/Comcast-Logo.png"
                        alt="Comcast Logo"
                        width={200}
                        height={100}
                        className="w-auto h-[100px]"
                    />
                    <Image
                        src="/images/albertsons-logo.png"
                        alt="Albertsons Logo"
                        width={200}
                        height={100}
                        className="w-auto h-[100px]"
                    />
                    <Image
                        src="/images/adp-logo.png"
                        alt="Albertsons Logo"
                        width={200}
                        height={100}
                        className="w-auto h-[100px]"
                    />
                </div>
            </div>
        </section>
    )
};

export default Clients; 