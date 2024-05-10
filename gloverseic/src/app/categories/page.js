'use client';
import DeleteButton from "../../components/DeleteBotton";
import UserTabs from "@/components/layout/UserTabs";
import {useEffect, useState} from "react";
import {useProfile} from "@/components/UseProfile";
import toast from "react-hot-toast";
import MenuItemIngredients from "../../components/layout/MenuItemIngredients"

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);
  const [subcat, setSubcat] = useState([]);  // Initialize as an empty array

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }

  useEffect(() => {
    if (editedCategory) {
      setCategoryName(editedCategory.name);
      setSubcat(editedCategory.subcategories || []); // Update subcategories when a category is edited
    } else {
      setCategoryName('');
      setSubcat([]); // Reset subcategories when no category is edited
    }
  }, [editedCategory]);

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const data = { name: categoryName, subcategories: subcat };
    const response = await fetch(`/api/categories${editedCategory ? '?_id=' + editedCategory._id : ''}`, {
      method: editedCategory ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast.success(editedCategory ? 'Category updated' : 'Category created');
    } else {
      toast.error('Error, sorry...');
    }
    setEditedCategory(null);
    setCategoryName('');
    setSubcat([]);
    fetchCategories();
  }

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>{editedCategory ? 'Update category' : 'New category name'}:</label>
            <input type="text" value={categoryName} onChange={ev => setCategoryName(ev.target.value)} />
            <MenuItemIngredients name={'Subcategories'} addLabel={'Add subcategories'} props={subcat} setProps={setSubcat}/>
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">{editedCategory ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => {
              setEditedCategory(null);
              setCategoryName('');
              setSubcat([]);
            }}>Cancel</button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories.length > 0 && categories.map(c => (
          <div key={c._id} className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
            <div className="grow">{c.name}</div>
            <div className="flex gap-1">
              <button type="button" onClick={() => setEditedCategory(c)}>Edit</button>
              <DeleteButton label="Delete" onDelete={() => handleDeleteClick(c._id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}