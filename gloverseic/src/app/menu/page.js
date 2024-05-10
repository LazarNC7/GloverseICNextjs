'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import {useEffect, useState} from "react";

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        // fetch('/api/categories').then(res => {
        //     res.json().then(categories => setCategories(categories))
        // });
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems));
        });
    }, []);
    return (
        <section className="mt-8">
            
                
                    <div className="text-center">
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                        {menuItems.map(item => (
                            <MenuItem key={item._id} {...item} />
                        ))}
                    </div>
            
        </section>
    );
}