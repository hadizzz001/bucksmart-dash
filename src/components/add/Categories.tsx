import { InputLabel, MenuItem,Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
const AllCats = [
  {
    categoryName: "furniture",
    categoryItems: [
      {
        Category: "Sofa",
        Subcategories: ["Armchairs", "Couch", "Corner Sofa"]
      },
      {
        Category: "Bed",
        Subcategories: ["Master Bed", "Single Bed"]
      },
      {
        Category: "Table",
        Subcategories: ["Dining Table", "Coffee Table", "Console"]
      },
      {
        Category: "Indoor Furniture",
        Subcategories: []
      },
      {
        Category: "Outdoor Furniture",
        Subcategories: []
      }
    ]
  },
  {
    categoryName: "Home Appliance",
    categoryItems: [
      {
        Category: "kitchen",
        Subcategories: ["Refrigerator", "Dish Washer", "Microwave", "Blender", "Oven", "Kitchen Ware"]
      },
      {
        Category: "Cleaning",
        Subcategories: ["Vacuum cleaner", "Air blower", "Cleaning Ware"]
      },
      {
        Category: "Laundry",
        Subcategories: ["Washing Machine", "Dryer", "Iron", "Laundry Ware"]
      },
      {
        Category: "Computer",
        Subcategories: ["Laptop", "PC", "Smart Phone", "Smart Watch"]
      },
      {
        Category: "Other Appliance",
        Subcategories: []
      }
    ]
  },
  {
    categoryName: "Fashion",
    categoryItems: [
      {
        Category: "Women Fashion",
        Subcategories: []
      },
      {
        Category: "Men Fashion",
        Subcategories: []
      },
      {
        Category: "Kids Wear",
        Subcategories: []
      },
      {
        Category: "Baby Wear",
        Subcategories: []
      }
    ]
  },
  {
    categoryName: "Beauty And Personal Care",
    categoryItems: [
      {
        Category: "Makeup",
        Subcategories: []
      },
      {
        Category: "Skin Care",
        Subcategories: []
      },
      {
        Category: "Hair Care",
        Subcategories: []
      }
    ]
  },
  // Add other categories like "Offers" and "New Arrivals" as needed
];

function YourComponent({type,category,subCategory,handleCateChange} : {subCategory?:string,category:string,type?:string,handleCateChange:any}) {


  // Get the selected category object from AllCats
  const selectedCategoryObject = AllCats.find((cat) => cat.categoryName.replace(/ +/g, '-').toLocaleLowerCase() == category.replace(/ +/g, '-').toLocaleLowerCase());

  // Extract subcategories based on the selected category
  const subCategories =
    selectedCategoryObject?.categoryItems.find((item) => item.Category.toLocaleLowerCase() === type)?.Subcategories || [];
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
        {['furniture', 'Home Appliance', "Fashion", "Beauty And Personal Care"].map((item) => (
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
