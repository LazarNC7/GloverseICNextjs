import Image from 'next/image';
import Right from "src/components/icons/Right";

export default function Hero(){
    return(
        <section className="hero mt-4">
            <div className="py-12 items-center">
                <h1 className="text-4xl font-semibold">Every food is more <span className="text-primary"> delicious</span> when you made it by
                    <span className="text-primary"> yourself</span></h1>
                <p className="my-4 text-gray-500 text-sm">Pizza is the missing piece that makes everyday complete, a simple yet delicious joy</p>
                <div className="flex gap-6 text-sm">
                    <button className="bg-primary flex items-center gap-2 text-white px-6 py-2 rounded-full">
                        Order now <Right />
                    </button>
                    
                </div>
            </div>
            <div className="relative w-full h-full">
                <Image src={'/tomatoes.jpg'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
            </div>

        </section>

    );
}