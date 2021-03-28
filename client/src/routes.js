

export const routes = [
   {
      name: "Home",
      path: "/",
   },
   {
      name: "Shop",
      path: "/shop",
   },
]

export const accountRoutes = [
   {
      name: "My Profile",
      path: "/my-profile",
      requiresAuth: true,
   },
   {
      name: "Orders",
      path: "/orders",
      requiresAuth: true
   },
   {
      name: "Login",
      path: "/login",
      requiresGuest: true,
   },
   {
      name: "Signup",
      path: "/signup",
      requiresGuest: true
   },
]

export const adminRoutes = [
   {
      name: "Products",
      path: "/products",
      requiresAdmin: true
   },
   {
      name: "Users",
      path: "/users",
      requiresAdmin: true
   },
]