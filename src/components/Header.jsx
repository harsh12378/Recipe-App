import Logo from "../assets/chef-logo.avif";

export default function Header(){
    return (
        <header>

            <img src={Logo}
            alt="logo"/>
        <h1>Chef Claude</h1> 
        </header>
    )
}
