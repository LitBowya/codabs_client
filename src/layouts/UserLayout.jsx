import Navbar from '../components/User/Navbar.jsx'
import Footer from '../components/User/Footer.jsx'

const UserLayout = ({children}) => {
    return (
        <div className="">
                <Navbar />
                <main className="">
                    {children}
                </main>
                <Footer />
        </div>
    )
}
export default UserLayout
