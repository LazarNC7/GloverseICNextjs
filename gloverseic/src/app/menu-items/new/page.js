'use client';
import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import {useState} from "react";
import {toast} from "react-hot-toast";
import Link from "next/link";
import Right from "@/components/icons/Right";
import Left from "@/components/icons/Left";
import {redirect} from "next/navigation";

export default function NewMenuItemPage(){
    const {loading, data} = useProfile();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItmes, setRedirectToItmes] = useState(false);

    if(loading){
        return 'Loading user info';
    }

    if(!data.admin){
        return 'Not an admin';
    }



    async function handleFormSubmit(ev){
        ev.preventDefault();
        const data = {image, name, description, basePrice,};
        const savingPromise = new Promise(async (resolve, reject) =>{
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type' : 'application/json'},
            });
            if(response.ok){
                resolve();
            } else reject();
        });
        await toast.promise(savingPromise, {
            loading: 'saving item',
            success: 'saved',
            error: 'error',
        });

        setRedirectToItmes(true);
    }

    if(redirectToItmes){
        return redirect('/menu-items');
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div className="grid items-start gap-4" style={{gridTemplateColumns: '.3fr .7fr'}}>
                    <div className="max-w-[200px]">
                        <EditableImage link={image} setLink={setImage}/>
                    </div>
                    <div className="grow">
                        <label>Menu item</label>
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                        <label>Description</label>
                        <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />
                        <label>Price</label>
                        <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)}/>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}