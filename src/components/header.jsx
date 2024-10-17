import './header.css'

const Header = () => {
    window.addEventListener("scroll", function () {
        const header = document.getElementById("header");

        if (window.scrollY > 50) {  // Adjust scroll position as needed
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    });
    return (
        <header className='header-content' id='header'>
            <a href="">Boba (home)</a>
            <a href="">Profile</a>
        </header>
    )
}

export default Header;