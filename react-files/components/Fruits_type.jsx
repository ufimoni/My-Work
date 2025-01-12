

export default function Fruit_type({name,price,emoji,soldout}){
    return (
       <div> 
        {price > 10 ? (<li>
            {emoji} {name} {price} {soldout? "Soldout": ""}
        </li>) : ("")}

        
         </div>
       
         
    
    )
  
}