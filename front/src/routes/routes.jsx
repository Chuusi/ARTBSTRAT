import {createBrowserRouter} from "react-router-dom"
import  App  from "../App"
import { ProtectedCheckChildren, Protected, ProtectedAdmin } from "../components/ProtectedRoutes"
import { 
    AboutUs, 
    AddPost, 
    AddProduct, 
    AdminUser,
    Basket, 
    ChangeForgottenPassRoute, 
    ChangePassword,
    CheckUser, 
    DeleteUser, 
    ForgottenPassword, 
    Gallery, 
    Home, 
    Login, 
    NotFound, 
    Profile,
    ProfileCardPage,
    Register,
    Shop,
    TermsAndConditions,
    UpdatePost,
    UpdateProduct,
    UpdateUser} from "../pages"
import { UserFavProducts } from "../pages/UserFavProducts"
import { ProfileCard } from "../components"
import { ProductRoute } from "../pages/ProductRoute"
import { PostRoute } from "../pages"

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children: [
            {
                path:'/',
                element: <Home/>,
            },
            {
                path:'/register',
                element: <Register/>,
            },
            {
                path:'/login',
                element: <Login/>,
            },
            {
                path:'/forgottenPassword',
                element: <ForgottenPassword/>,
            },
            {
                path:'/aboutUs',
                element: <AboutUs/>,
            },
            {
                path:'/termsAndConditions',
                element: <TermsAndConditions/>,
            },
            {
                path:'/changeForgottenPassword/:token',
                element: <ChangeForgottenPassRoute />,
            },
            {
                path:'/checkUser',
                element: (
                    <ProtectedCheckChildren>
                        <CheckUser/>
                    </ProtectedCheckChildren>
                ),
            },
            {
                path:'/profile',
                element: (
                    <Protected>
                        <Profile/>
                    </Protected>
                ),
                children: [
                    {
                        path:'/profile',
                        element: (
                            <Protected>
                                <ProfileCardPage/>
                            </Protected>
                        ),
                    },
                    {
                        path:'/profile/basket',
                        element: (
                            <Protected>
                                <Basket/>
                            </Protected>
                        ),
                    },
                    {
                        path:'/profile/changePassword',
                        element: (
                            <Protected>
                                <ChangePassword/>
                            </Protected>
                        ),
                    },
                    {
                        path:'/profile/deleteUser',
                        element: (
                            <Protected>
                                <DeleteUser/>
                            </Protected>
                        ),
                    },
                    {
                        path:'/profile/updateUser',
                        element: (
                            <Protected>
                                <UpdateUser/>
                            </Protected>
                        ),
                    },
                    {
                        path:'/profile/userFavProducts',
                        element: (
                            <Protected>
                                <UserFavProducts/>
                            </Protected>
                        ),
                    },
                    {
                        path:'/profile/addPost',
                        element: (
                            <ProtectedAdmin>
                                <AddPost/>
                            </ProtectedAdmin>
                        ),
                    },
                    {
                        path:'/profile/addProduct',
                        element: (
                            <ProtectedAdmin>
                                <AddProduct/>
                            </ProtectedAdmin>
                        ),
                    },
                    {
                        path:'/profile/adminUser',
                        element: (
                            <ProtectedAdmin>
                                <AdminUser/>
                            </ProtectedAdmin>
                        ),
                    },
                    {
                        path:'/profile/updateProduct',
                        element: (
                            <ProtectedAdmin>
                                <UpdateProduct/>
                            </ProtectedAdmin>
                        ),
                    },
                    {
                        path:'/profile/updatePost',
                        element: (
                            <ProtectedAdmin>
                                <UpdatePost/>
                            </ProtectedAdmin>
                        ),
                    },
                    
                ]
            },
            {
                path:'/gallery',
                element: (
                        <Gallery/>
                ),      
            },
            {
                path:'/post/:id',
                element: <PostRoute/>
            },
            {
                path:'/shop',
                element: (
                        <Shop/>
                ),
            },
            {
                path:'/product/:name',
                element: <ProductRoute/>
            },
            {
                path:'*',
                element: <NotFound/>,
            },         
        ]
    }
])