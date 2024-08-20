// HERE WE ARE USING A MAP FUNCTION() TO GET EACH DATA FROM THE JSON FILE.
// CONVERT JSON TO HTML OR READING THE HTML IN A JSON FORMAT AND PUTTIG IT IN A STRING OR ARRAY.
// USE THE MAP FUNCTION TO LOOP AN ARRAY OVER THE
// AND ALso jOIN IT INTO A SINGLE ARRAY.

// IN THIS CODE WE WANT TO READ A JSON FILE ONCE AND THEN WE PARSE AND USE IT A THOUSAND TIMES, ONY FOR THAT PARTICULAR PRODUCTS.
// Reading the File first.
const fs = require('fs');
// Creating a simple web server
const http = require('http');

// synchronous the file to access the application.
const html = fs.readFileSync('./myweb2/index.html','utf-8');
let product_list = fs.readFileSync('./myweb2/products.html','utf-8'); // The product_list is an array and will be mapped in the map function
let products = JSON.parse( fs.readFileSync('./JSON/products.json'));
 
// Creating and using the map function to display each data.   // after mapping we assign a new array for the transform data.
 let newArray_products = products.map((prod)=>{
 // WE REPLACE THE VALUES in product.html with the JSON Values
 // WE TAKE prod and Append them to the JSON Values
    let output = product_list.replace('{{%Images%}}', prod.Image);
    output = output.replace('{{%NAME%}}', prod.name);
    output = output.replace('{{%ModelName%}}',prod.model_name);
    output = output.replace('{{%ModelNumber%}}',prod.model_number);
    output = output.replace('{{%Size%}}',prod.size);
    output = output.replace('{{%Camera%}}',prod.camera);
    output = output.replace('{{%Price%}}',prod.price);
    output = output.replace('{{%Color%}}',prod.color);

    return output;
});   // WE RETUN THE OUTPUT.



// create server
const server = http.createServer((req, res)=>{
    let path = req.url;
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
  let Res_Htmlprod = html.replace('{{%CONTENT%}}', newArray_products.join(','));  // now store it in a varibale called Res_Htmlprod.
        res.writeHead(200,{
            'Content-Type' : 'text/html'
        });
       // fs.readFile('./JSON/products.json','utf-8',(err, data)=>{
         //   let products = clearJSON.parse(data);
       res.end(Res_Htmlprod);
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
