
import { MdShoppingCart, MdAccountCircle } from 'react-icons/md'

export const routes = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Shop",
        path: "/shop", 
    },
    {
        name: <MdAccountCircle />,
        path: "/my-profile",
    },
    {
        name: <MdShoppingCart />,
        path: "/cart",
    },
]