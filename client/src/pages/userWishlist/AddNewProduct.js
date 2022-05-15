import React,{useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../Utils/Loading/Loading';

export default function AddNewProduct({setDispalyNewProduct,id, products}) {

  const [itemURL, setItemURL] = useState('');
  const [newProductDetails, setNewProduct] = useState();
  const [userMessage, setUserMessage] = useState('');

  async function getItem(){
       
       setUserMessage("Proccesing");
        try{
            const sendData = await fetch("https://wishlist-app-react.herokuapp.com/api/getitem",{
                method: "POST",
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({url: itemURL})
               })
        
              const result = await sendData.json();
              if(!result.msg){

                const data = {};
                
                data.id = uuidv4();
                data.title = result.title;
                data.description = result.description;
                data.image = result.image.url;
                data.purchased = false;

                return setNewProduct(data);
              }
              else{
                return setUserMessage("Something is wrong with your URL:(");
              }
        }
        catch(err){
            return setUserMessage("Server error! Please try again later.")
        }
  }
  useEffect(() => {

     if(newProductDetails){

        (async () => {
            try{
                const sendData = await fetch(`https://wishlist-app-react.herokuapp.com/api/userwishlist/${id}`, {
                    method: "PUT",
                    headers : {'Content-Type': 'application/json'},
                    body: JSON.stringify({product: [...products, newProductDetails], action: "add"}),
                });

                const recivedData = await sendData.json();

                if(recivedData.msg === 'succes'){
                    return window.location.reload();
                }
                
            }
            catch(err){
               console.log(err);
            }
        })();

     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProductDetails]);

  return (
    <div className='user-wishlist-addNewProduct'>
        <p className='user-wishlist-addNewProduct-closeTab' onClick={() => setDispalyNewProduct(false)}>✖</p>
        <input placeholder='Plase provide a valid URL...' autoFocus={true} onChange={(e) => setItemURL(e.target.value)}/>
        <p className='user-wishlist-websites-supp'>Websites supported: <a rel='noopener noreferrer' target="_blank" href='https://emag.ro'>Emag</a> and <a rel='noopener noreferrer' target="_blank" href='https://eu.perixx.com/'>euPerixx</a></p>
        {userMessage && userMessage !== "Proccesing" ? <p className='user-wishlist-addNewProduct-errMSG'>{userMessage}</p> : null}
        {userMessage === "Proccesing" ? <Loading size={"small"}/> : null}
        <button onClick={getItem}>Add product</button>
    </div>
  )
}
