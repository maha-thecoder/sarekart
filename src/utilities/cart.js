

export const getCart=()=>{
    return JSON.parse(localStorage.getItem("sarees"))||[]
}

export const savecart=(cart)=>{
    return (localStorage.setItem("sarees",JSON.stringify(cart)))||[]
}

export const addingitems=(product)=>{
    const cart=getCart()

    const index=cart.findIndex(item=>item.id===product.id)

    if(index!==-1){
        alert("item already in cart")
    }
    else{
        cart.push({...product})
    }
    savecart(cart)
}


    export const removeFromCart=(product)=>{
        const cart=getCart()
        const filtercart=cart.filter(item=>item.id!==product)
        savecart(filtercart)
    }

    export const cartTotal=()=>{
        let sum=0
        const cart=getCart()
       cart.forEach(item => {
        const price = Number(item.sareprice.replace("RS.", ""));
    sum += price;
        
       });
        return sum
    }

    export const singleitemprice=(id)=>{
        
        const cart=getCart()
        const item = cart.find(i => i.id === id)
        if (!item) return 0

        const price = Number((item.sareprice || "").toString().replace("RS.", "")) || 0
        const qty = Number(item.qty) || 1

        return price * qty

    }

    export const clearCart=()=>{
        localStorage.removeItem("sarees")
    }
 



