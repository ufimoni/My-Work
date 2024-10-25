// our first components
// const work = 23;
function displayFood(){
    return "Chicken and rice"
}
// This is destructuring of Props
// function Test(props){
//     const {name, message} = props;
//     console.log(props);
//     return <div>
//      <h1>Hi {name} {message}</h1>
//     </div>;
// }
//export default Test;

function Test(props){
    const {name, message} = props;
    console.log(props);
    return <div>
     <h1>Hi {name} {message}</h1>
    </div>;
}
export default Test;