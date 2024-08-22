/// WE ARE TO REUSE THIS FUNCTION AGAIN
/* IN THIS CODE WE WILL REUSE A FUNCTION TWICE TO DISPLAY THE IMAGES. FROM JSON DATABASE TO BE DISPLAYED ON RHE WEB SERVER
 AND THIS CODE ALSO TAKES A DATA FROM THE DATABASE AND DISPLAYS IT ON THE WEBBROWSERS. SHOWING WHATEVER HAS BEEN

                                                                                */
const fs = require('fs');
const url = require('url');
const http = require ('http');

////// READING FILES SYNCHRONOSLLY
const html = fs.readFileSync('./myweb2/index.html','utf-8');
let product_list = fs.readFileSync('./myweb2/products.html','utf-8'); // The product_list is an array and will be mapped in the map function
 let myproduct = JSON.parse(fs.readFileSync('./JSON/products.json'));
let prod_details = fs.readFileSync('./myweb2/product-details.html', 'utf-8');


   // WE RETUN THE OUTPUT.
// WE ARE CREATING ANOTHER FUNCTION SO THAT IT CAN BE USED
function replaceHTML(template, products){

    let output = template.replace('{{%Images%}}', products.Image);
    output = output.replace('{{%NAME%}}', products.name);
    output = output.replace('{{%ModelName%}}',products.model_name);
    output = output.replace('{{%ModelNumber%}}',products.model_number);
    output = output.replace('{{%Size%}}', products.size);
    output = output.replace('{{%Camera%}}', products.camera);
    output = output.replace('{{%Price%}}', products.price);
    output = output.replace('{{%Color%}}',products.color);
    output = output.replace('{{%ROM%}}', products.ROM);
    output = output.replace('{{%Description%}}', products.Description);
    output = output.replace('{{%ID%}}',products.id); // Here we want to replace it with our ID.

    return output;
}


// create server
const server = http.createServer((req, res)=>{
   let {query, pathname: path} = url.parse(req.url, true); // using and parse method to parse it and a boolean statemt true so it can be parsed
    console.log(path);
   // let path = req.url;
    if(path === '/'|| path.toLocaleLowerCase()=== '/home'){
        res.writeHead(200,{
            // using headers
            'Content-Type':'text/html',
             'my-header':'hello world'
        });
        res.end(html.replace('{{%CONTENT%}}','YOU ARE IN HOME PAGE'));  // we use the %CONTENT% placeholder and the replace() to replace it.

    }
    else if(path.toLocaleLowerCase()==='/about'){
// seting status codes in all of them. 
        res.writeHead(200,{
            'Content-Type' : 'text/html',
             'my-header' : 'hello world'
        });
        res.end(html.replace('{{%CONTENT%}}','YOU ARE IN ABOUT PAGE..'));
    }
    else if(path.toLocaleLowerCase()=== '/contact'){
        res.writeHead(200,{
          'Content-Type' : 'text/html',
             'my-header' : 'hello world'  
        });
        res.end(html.replace('{{%CONTENT%}}','YOU ARE IN CONTACT PAGE...'));
    }
    else if(path.toLocaleLowerCase() === '/services'){
        res.writeHead(200,{
            'Content-Type' : 'text/html',
             'my-header' : 'hello world'
        });      
        res.end(html.replace("{{%CONTENT%}}","YOU ARE IN SERVICES PAGE...."));
    }
    else if(path.toLocaleLowerCase() === '/signup'){
        res.writeHead(200, {
            'Content-Type' : 'text/html',
             'my-header' : 'hello world'
        });        
        res.end(html.replace('{{%CONTENT%}}','YOU ARE IN SIGN-UP PAGE....'));
        console.log("You are in Sign_Up page");
    }
    else if(path.toLocaleLowerCase() === '/products'){
        if(!query.id){  
           let Array_product = myproduct.map((prod)=>{
              return  replaceHTML(product_list, prod);  // HERE WE COPY product_list and parse it and also prod since they are all map functions.
            })
        
  let Res_Htmlprod = html.replace('{{%CONTENT%}}', Array_product.join(','));  // now store it in a varibale called Res_Htmlprod.
        res.writeHead(200,{
            'Content-Type' : 'text/html'
        });
       // fs.readFile('./JSON/products.json','utf-8',(err, data)=>{
         //   let products = clearJSON.parse(data);
       res.end(Res_Htmlprod);
}
else{
    
    let prod = myproduct[query.id]; // this will return the value of the products stored in our JSON file. the prod variable will store it.
    let newprod_details = replaceHTML(prod_details,prod); // we parsed prod as a second arguement when we call the replacehtml()
    res.end(html.replace('{{%CONTENT%}}', newprod_details));

}
       //  console.log(newArray_products.join(',')); // join all into a single value.
    }
    else {
        res.writeHead(404,{
            'Content-Type' : 'text/html',
             'my-header' : 'hello world'
        });
        res.end(html.replace('{{%CONTENT%}}',"ERROR 404: PAGE NOT FOUND"));
    }

   // console.log(req);
});

// Starting server.
server.listen(8000, '127.0.0.1',()=>{
    console.log("Running on port: 8000.");
});
   