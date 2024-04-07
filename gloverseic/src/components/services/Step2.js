import image from '../../../public/easy-to-order.jpg'
export default function Step1(){
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <div className="rounded-full overflow-hidden mx-auto w-32 h-32">
                <img src="/fast-delivery.jpg" alt="" className="w-full h-full object-cover " />
            </div>
            <h4 className="font-ssemibold text-xl my-2 text-green-900 pt-7"><strong>Fast Delivery</strong></h4>
            <p className="text-gray-500 text-sm">Swift, reliable delivery to your doorstep.</p>
            
        </div>
    );
}