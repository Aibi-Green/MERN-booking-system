import Logo from "./Logo.jsx"
import UserNavBar from "./UserNavBar.jsx"

function UserHeader() {
  return (
    <header className="bg-white
    h-[60px] w-[100%] fixed z-10 shadow-lg">
      <div className="
      flex flex-row justify-between items-center 
      h-[100%] pl-0 pr-0
      sm:m-auto sm:w-[85%]
      md:w-[70%]
      lg:w-[60%]
      xl:w-[50%]
      2xl:w-[40%]
      ">
        <Logo />
        <UserNavBar />
      </div>
    </header>
  )
}

export default UserHeader