import Image from 'next/image';

import Step1 from '../services/Step1';
import Step2 from '../services/Step2';
import Step3 from '../services/Step3';
import SectionHeaders from "./SectionHeaders";
export default function HomeMenu(){
    return(
        <section className="">
            
            <div className="text-center mb-4 ">
                <SectionHeaders mainHeader={'Services'} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {/* <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem /> */}
                <Step1 />
                <Step2 />
                <Step3 />
            </div>
        </section>
    );
}