const add_product=document.getElementById('add_product');

add_product.addEventListener('click',function (event){
   event.preventDefault();

    const formData = new FormData();
    const id=document.getElementById('product_id').value;
    const name=document.getElementById('product_name').value;
    const price=document.getElementById('price').value;
    const img=document.getElementById('product_img').files[0]; 

    formData.append('product_id', id);
    formData.append('product_name', name);
    formData.append('product_price', price);
    formData.append('product_image', img);

        const product_dict={
    product_id:id,
    product_name:name,
    product_price:price,
    product_img:img,
};

fetch('/add',{

    method:'POST',
    body:formData
})
.then(res=>res.json())
.then(data=>{
    console.log("response", data);
    alert(data.message || data.error);

    document.getElementById('product_id').value='';
    document.getElementById('product_name').value='';
    document.getElementById('price').value='';
    document.getElementById('product_img').value='';

})
.catch(error => {
        console.error("Error adding product:", error);
    });

});

const remove_product=document.getElementById('remove_p_id');
const remove_btn=document.getElementById('remove_product_btn');

remove_btn.addEventListener('click',function(event){
    
    event.preventDefault();
    const remove_id=remove_product.value;

    fetch('http://127.0.0.1:5000/remove/'+remove_id,{
        method:'DELETE',
    })
    .then(res=>res.json())
    .then(data=>{
        
        alert(data.message || data.error);
        remove_product.value='';
         
    })
    .catch(error=>
    {
        console.error('error in removing the porduct');
        alert('error in product removing');
    });

});
