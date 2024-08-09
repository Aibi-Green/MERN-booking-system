import Nav from "./Nav"

const Header = () => {
    return (<>
        {/* backdrop-brightness-50 backdrop-blur-sm */}
        <header className="bg-gradient-to-r from-transparent to-primary
        border-black text-secondary fixed top-0 flex-wrap z-[20] mx-auto flex 
        w-full items-center justify-end px-10">
            <Nav />
        </header>
    </>)
}

export default Header