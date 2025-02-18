import Image from 'next/image';

const Header = () => (
    <header className="bg-white flex justify-between items-center mx-[50px] px-[50px] border-b-[3px] border-black pt-[30px]">
        <h1 className="text-[120px] font-primary font-bold flex-1 border-r-[3px] border-black">Abhishek</h1>
        <Image
            src="/images/profile-picture.jpg"
            alt="Abhishek's profile picture"
            width={120}
            height={120}
            className="object-cover rounded-full ml-[30px]"
        />
    </header>
)

export default Header;