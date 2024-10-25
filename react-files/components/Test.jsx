// our first components
// const work = 23;
function displayFood(){
    return "Chicken and rice"
}
function Test(props){
    return <div>
     <h1>Hi {props.name},You are: {props.age}, {props.message}</h1>
    </div>;
}
export default Test;