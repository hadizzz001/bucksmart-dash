import { InputLabel, MenuItem,Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
const AllCats = [
  {
    categoryName: "dogs",
    categoryItems: [
      {
        Category: "Food",
        Subcategories: ["Dry food", "Wet food"]
      },
      {
        Category: "Treats",
        Subcategories: ["Casual treats", "Training treats", "Dental treats", "Bones"]
      },
      {
        Category: "Toys",
        Subcategories: ["Casual toys", "Interactive toys", "Kong"]
      },
      {
        Category: "Apparels",
        Subcategories: ["Leashes", "Collars", "Harnesses", "Clothes", "Scarfs"]
      },
      {
        Category: "Beds and Houses",
        Subcategories: ["Beds", "Crates"]
      },
      {
        Category: "Grooming Essentials",
        Subcategories: ["Brushes", "Nail clippers", "Perfumes", "Shampoos", "Hygiene accessories"]
      },
      {
        Category: "Medication",
        Subcategories: ["Ticks & Fleas", "Oral health", "Supplements"]
      },
      {
        Category: "Accessories",
        Subcategories: ["Bowls & Feeders", "Muzzles"]
      }
    ]
  },
  {
    categoryName: "cats",
    categoryItems: [
      {
        Category: "Food",
        Subcategories: ["Dry food", "Wet food"]
      },
      {
        Category: "Litter",
        Subcategories: []
      },
      {
        Category: "Scratchers",
        Subcategories: []
      },
      {
        Category: "Treats",
        Subcategories: ["Wet treats", "Casual treats"]
      },
      {
        Category: "Toys",
        Subcategories: ["Casual toys", "Interactive toys", "Kong"]
      },
      {
        Category: "Apparels",
        Subcategories: ["Leashes", "Collars", "Harnesses", "Clothes", "Scarfs"]
      },
      {
        Category: "Beds and Houses",
        Subcategories: ["Beds", "Crates"]
      },
      {
        Category: "Grooming Essentials",
        Subcategories: ["Brushes", "Nail clippers", "Perfumes", "Shampoos", "Hygiene accessories"]
      },
      {
        Category: "Medication",
        Subcategories: ["Ticks & Fleas", "Oral health", "Supplements"]
      },
      {
        Category: "Accessories",
        Subcategories: ["Bowls & Feeders"]
      }
    ]
  },
  // Add other categories like "Offers" and "New Arrivals" as needed
];

function YourComponent({type,category,subCategory,handleCateChange} : {subCategory?:string,category:string,type?:string,handleCateChange:any}) {


  // Get the selected category object from AllCats
  const selectedCategoryObject = AllCats.find((cat) => cat.categoryName === category);

  // Extract subcategories based on the selected category
  const subCategories =
    selectedCategoryObject?.categoryItems.find((item) => item.Category.toLowerCase() === type)?.Subcategories || [];

  // Update selected subcategory when the category changes


  return (
    <div>
      {/* Category Name Dropdown */}
      <InputLabel id="demo-category-name-label">Category Name</InputLabel>
      <Select
        sx={{ textTransform: 'capitalize' }}
        variant='filled'
        labelId="demo-category-name-label"
        id="demo-category-name-select"
        name='categoryName'
        value={category}
        label={"Category Name"}
        fullWidth
        defaultValue={'dogs'}
        onChange={(e) => handleCateChange('category', e.target.value)}
      >
        {['Dogs', 'Cats', 'Offers'].map((item) => (
          <MenuItem key={item} value={item.toLocaleLowerCase()}>
            {item}
          </MenuItem>
        ))}
      </Select>

      {/* Category Dropdown */}
      <InputLabel id="demo-type-label">Category</InputLabel>
      <Select
        sx={{ textTransform: 'capitalize' }}
        variant='filled'
        labelId="demo-type-label"
        id="demo-type-select"
        name='type'
        value={type}
        label={"Category"}
        fullWidth
        defaultValue={''}
        onChange={(e) => handleCateChange('type', e.target.value)}

      >
        {selectedCategoryObject?.categoryItems.map((item) => (
          <MenuItem key={item.Category.toLowerCase()} value={item.Category.toLowerCase()}>
            {item.Category}
          </MenuItem>
        )) || []}
      </Select>

{subCategories?.length > 0 && <>
      <InputLabel id="demo-subcategory-label">Subcategory</InputLabel>
      <Select
        sx={{ textTransform: 'capitalize' }}
        variant='filled'
        labelId="demo-subcategory-label"
        id="demo-subcategory-select"
        name='subCategory'
        value={subCategory}
        label={"subCategory"}
        fullWidth
        defaultValue={''}
        onChange={(e) => handleCateChange('subCategory', e.target.value)}

      >
        {subCategories.map((item) => (
          <MenuItem key={item.toLowerCase()} value={item.toLowerCase()}>
            {item}
          </MenuItem>
        ))}
      </Select>
      </>
      }
    </div>
  );
}

export default YourComponent;
