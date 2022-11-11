 let url1="https://fakestoreapi.com/products/category/electronics";
    
    let arr=[];
    async function getData(){
        try{
            let res=await fetch(url1);
            let out=await res.json();
            // console.log(out);
            displayBox(out);
            arr=out;
        }
        catch(err){
            console.log("rejected");
        }
    }
    let cartItems=JSON.parse(localStorage.getItem("cartItems"))||[];
    getData();
    function displayBox(out){
    document.querySelector("#electronics").innerHTML="";
        out.forEach((elem,i) =>{
            
            let div=document.querySelector("#electronics");
    
            let cdiv=document.createElement("div");
    
            let image=document.createElement("img");
            image.setAttribute("src",elem.image)
    
            let title=document.createElement("h3");
            title.innerText=elem.title;
    
    
            let cat=document.createElement("h4");
            cat.innerText=elem.category;
    
            let price=document.createElement("h5");
            price.innerText=elem.price;
    
            let button=document.createElement("button");
            button.innerText="ADD TO CART";
            button.setAttribute("id","bh");
            button.addEventListener("click",function(){
                let arr1=JSON.parse(localStorage.getItem("cartItems"))||[];

        for(let i=0;i<arr1.length;i++){
          if(arr1[i].id== elem.id){
            alert("Duplicate product");
            return;
          }
        }
                cartItems.push({...elem,quantity:1});
            localStorage.setItem("cartItems",JSON.stringify(cartItems));
            alert("product Added To cart");
            })
            div.append(cdiv);
            cdiv.append(image,title,cat,price,button);
        })
       
    }

        let sort=document.getElementById("SBP");

sort.addEventListener("change",function(){
    if(sort.value==""){
        displayBox(arr);
    }
    if(sort.value=="LTH"){
        arr.sort( (a,b) => {
            return a.price-b.price;
        })
        displayBox(arr);
    }if(sort.value=="HTL"){
            arr.sort( function(a,b){
               return  b.price-a.price;
            })

            displayBox(arr);
    }
    
})

let input=document.querySelector("#SBN");

input.addEventListener("input",function(){
    let d=arr.filter((elem,i) => {
        return elem.title.toLowerCase().includes(input.value.toLowerCase())
    })
    displayBox(d);
})





