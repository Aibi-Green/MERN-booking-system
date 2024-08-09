import Header from "../components/Header"
import Footer from "../components/Footer"

type Props = {
    children: React.ReactNode
}

const Normal = ({children} : Props) => {
    return(<>
        <Header />
        {children}
        <Footer />
    </>)
}

export default Normal