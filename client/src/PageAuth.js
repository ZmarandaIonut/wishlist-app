export default function userAllowed(dest){
    
    const token = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
        if(!token){
            return resolve("not allowed");
        }
        fetch(`https://wishlist-app-react.herokuapp.com/api/${dest}`,{
            method: "POST",
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({token}),
        }).then(result => {
            result.json()
              .then(res => {
                if(res.msg === "not allowed"){
                    return resolve("not allowed");
                }
                else{
                    return resolve("allowed");
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err=> console.log(err));
    })
}