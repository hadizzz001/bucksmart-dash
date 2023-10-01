// import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Select, Link, TextField,
  Typography, Checkbox, FormControlLabel, InputLabel, MenuItem, OutlinedInput, SelectChangeEvent, ListItemText } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddImage from './AddImage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { CustomSelect } from '../dashboard/CustomSelect';
import MultipleSelect from './CustomSelect';
import Categories from './Categories';
 
interface IInit {

    title: string;
    price: string;
    size: string;
    description: string;
    subCategory ?: string,
    type : string;
    isFeatured: boolean;
    inStock  : boolean;
    // additionalInfo : {
    //     size?: string;
    // };
    // colors : string[] | [];
    category: string;

} 

  const Index = ({setDisabled}:{setDisabled:any}) => {
    const [imgs, setImgs] = useState(['']) 
    // const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const [itemToEDIT,setItemToEdit]= useState<any>({})
    const [init,setInit]= useState<IInit>({
      title: '',
      price : '',
      type : '',
      inStock : true,
      size: '',
      // colors : selectedColors,
      subCategory : '',
      description:'',
      isFeatured : false,
      // additionalInfo : {
      //   size:'',

      // },
      category : 'furniture',
      // inStock: false,
      // Manufacturer
      // additionalInfo:'',
      // password: 'Password123'
      })
    const [load,setLoad]= useState<any>(false)

    const router = useRouter()
    const mode = router.query.mode;
    const id = router.query.id;
    const Catearray =  [
      'jacket',
      'set',
      'shirt',
      'shorts',
      'shoes',
      'socks',
't-shirt',
'top',
'pyjama',
'coat',
'dress',
'skirt'

    ]

    const getItem = async () => {
      try {

    const req= await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/getbyid?pid=${id}`)
    const res = await req.json()
    if (res) {

      setItemToEdit(res)
      setLoad(false)
      // init.title = res.title;
      setInit({
        ...init,
        subCategory : res?.subCategory,
        title: res.title,
        description: res.description,
        price: res.price,
        type : res?.type,
        category: res.category,
        isFeatured: res.isFeatured,
        size: res?.size,
        // colors : res?.colors || []
      })
      // setSelectedColors(res?.colors)
      setImgs(res.images)
    }
    setLoad(false)

  }
  catch(e){
    setLoad(false)

    console.log('e: ', e);

  }
    }
    useEffect(() => {
      if(!router.isReady || !id) return;
      if (mode === 'edit' && id) {
        setLoad(true)
        getItem()
      }
    },[mode])
  const handleImgChange = (url:string[] | any) => {
    if (url) {

      setImgs(url);
    }
  }
const resetForm = () => {
  // setSelectedColors([])

  setInit({ title: '',
  price : '',
  inStock: true,
  size: '',
  type : '',
  description:'',
  isFeatured : false,
  category : 'furniture'})


  let element: HTMLElement = document.getElementsByClassName('uploadcare--widget__button_type_remove')[0] as HTMLElement;
  element.click();

 


}
const onSubmit = async (e:any)=>{
  e.preventDefault();
  setDisabled(true)
  const token = localStorage.getItem('24ojfo951fcvrtsaftd23twcz');
  if (!token ) {
    setDisabled(false)
    return
  };


const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/${id && mode === 'edit' ? `update?pid=${id}`: `save`}`,{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({state:{...init,images:imgs}})
})
const res = await req.json()
if (res?.success) {
  // setSelectedColors([])

    resetForm();
    // setSubmitting(false)
    setDisabled(false)

    // router.push('/products')

    return
}
setDisabled(false)

}

  const handleChange = async (e:any) => {
    let val = e.target.value
    if (val !== null) {
      setInit({...init,
      [e.target.name]: val
    })
    }
  }
  const handleCateChange = async (name: string, value:any) => {
    if (value !== null) {
      setInit({
        ...init,
        [name]: value
      });
    }
  };
//   const TypeArray = init?.category === 'cats' ? catsSubcategories :
// init?.category === 'dogs' ? dogsSubcategories :
// init?.category === 'offers' ? offersSubcategories : [];
  return (
    <>

      <Box
        component="main"
      className='essential'
        sx={{
          maxWidth:'sm'

        }}
      >

       {!load &&   <form id='add-form' onSubmit={onSubmit}>


            <TextField
            required
              // error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
              // helperText={formik.touched.title && formik.errors.title}
              label={"Title* اسم المنتج"}
              margin="normal"
              name="title"
              onChange={handleChange}
              type="text"
              value={init.title}
              variant="filled"
            />
                        <TextField
          required

              fullWidth
              // helperText={formik.touched.price && 'Price should be at least 0.1 '}
              label={"Price* in $ | السعر بالدولار"}
              margin="normal"
              name="price"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="number"
              value={init.price}
              variant="filled"
            />
            <TextField
              // error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              multiline
              required

              rows={4}
              // helperText={formik.touched.description && formik.errors.description}
              label={"Description | تفصيل | معلومات" }
              margin="normal"
              name="description"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="text"
              value={init.description}
              variant="filled"
            />

            {/* <>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
  sx={{textTransform:'capitalize'}}
  variant='filled'
    labelId="demo-simple-select-label"
    id="demo-simple-select"
     name='category'
    value={init.category.toLocaleLowerCase()}
    label={"Category"}
    fullWidth
    defaultValue={'sale'}
    onChange={handleChange}
  >
    <MenuItem  value={'furniture'}>furniture</MenuItem>
    {[



'Dogs',
'Cats',
'Offers',


    ].map((item:string) =>{

return    <MenuItem
key={item}
value={`${item.toLocaleLowerCase()}`}>{item}</MenuItem>
    })}
  </Select>
  </>

  <>
  <InputLabel id="demo-simple-type-label">Type</InputLabel>
  <Select
  sx={{textTransform:'capitalize'}}
  variant='filled'
    labelId="demo-simple-type-label"
    id="demo-type-select"
     name='type'
    value={init?.type.toLocaleLowerCase()}
    label={"Type"}
    fullWidth
    defaultValue={''}
    onChange={handleChange}
  >
    {
    subCategory.map((item:string) =>{

return    <MenuItem
key={item}
value={`${item.toLowerCase()}`}>{item}</MenuItem>
    })}
  </Select>
  </> */}
<Categories
type={init?.type?.toLocaleLowerCase()}

subCategory={init?.subCategory?.toLocaleLowerCase()}
category={init?.category?.toLocaleLowerCase()} handleCateChange={handleCateChange}/>


<TextField
              // error={Boolean(formik.touched.weight && formik.errors.weight)}
              fullWidth
              // helperText={formik.touched.weight && formik.errors.weight}
              label={"Product Sizes (Add Unit ex: 150g ) "}
              margin="normal"
              name="size"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="text"
              value={init.size.toLocaleLowerCase()}
              variant="filled"
            />
{/* <MultipleSelect selectedColors={selectedColors} setSelectedColors={setSelectedColors}/> */}

            <FormControlLabel
            // helperText={formik.touched.isFeatured && formik.errors.isFeatured}
            label={`Show On Homepage? `}
            // error={Boolean(formik.touched.isFeatured && formik.errors.isFeatured)}
            name="isFeatured"
            // onBlur={formik.handleBlur}
            onChange={(val)=>{
              setInit({...init,isFeatured:!init.isFeatured})
            }}
            checked={Boolean(init.isFeatured)}
            control={<Checkbox
            // margin="normal"
            // fullWidth
            value={Boolean(init.isFeatured)}  />}  />




              <FormControlLabel
            // helperText={formik.touched.isFeatured && formik.errors.isFeatured}
            label={`in Stock?`}
            // error={Boolean(formik.touched.isFeatured && formik.errors.isFeatured)}
            name="inStock"
            defaultChecked
            // onBlur={formik.handleBlur}
            onChange={(val)=>{
              setInit({...init,inStock:!init.inStock})
            }}
            checked={Boolean(init.inStock)}
            control={<Checkbox
            // margin="normal"
            // fullWidth
            value={Boolean(init.inStock)}  />}  />



              <AddImage   HandleImagesChange={handleImgChange}/>
              {mode === 'edit' && <Typography>Note: adding new images might replace the old ones</Typography>}
          </form>}

      </Box>
    </>
  );
};

export default Index;
