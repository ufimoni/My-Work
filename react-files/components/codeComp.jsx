import Welcome from '../components/Welcome';
import Code from '../components/Code'
import Fruits from './Fruits';
export default function Condcomp(){
 const display = true;
//  if(display){
//      return(
//         <Code/>
//      )
//  }else{
//     return(
//         <Welcome/>
//     )
//  }
 // using ternary operator 
return (
    <div>
        <Fruits></Fruits>
    </div>
)
}