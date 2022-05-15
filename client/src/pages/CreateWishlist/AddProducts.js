import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../Utils/Loading/Loading';
export default function AddProducts({setItems, setwebURL, webURL, items}) {

    const [addProductValidate, setAddProductError] = useState();
    const [processing, setProcessing] = useState();

    function addProduct(){
        setProcessing("Processing");
        setAddProductError(null);
        fetch("https://wishlist-app-react.herokuapp.com/api/getitem",{
            method: "POST",
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({url: webURL})
           })
           .then(response => response.json()
           .then(res => {
            if(res.msg === "not found"){
              setProcessing(null);
              return setAddProductError("Something is wrong with your URL.")
            }
            const itemName = res.title;
            const itemDescription = res.description;
            const itemImage = res.image.url;
            const itemID = uuidv4();
        
            const currentItem = {
                id: itemID,
                title: itemName,
                description: itemDescription,
                image: itemImage,
                purchased: false
            };
            setItems([currentItem, ...items])
            setwebURL('');
            setProcessing(null);
            setAddProductError(null);
           }))
           .catch(err => console.log(err));
    }

  return (
    <div className='wishlis-getwebinfo'>
       <p>Website product URL</p>
       <input value={webURL} onChange={e => setwebURL(e.target.value)}/>
       {addProductValidate ? <p className='error' style={{marginBottom: "1rem", marginTop: 0}}>{addProductValidate}</p> : null}
       {!processing ? <button onClick={addProduct}>Add product</button> : <Loading size={"small"}/>}
    </div>
  )
}
