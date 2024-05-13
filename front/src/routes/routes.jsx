import {createBrowserRouter} from "react-router-dom"
import  App  from "../App"
import { ProtectedCheckChildren } from "../components/ProtectedRoutes/ProtectedCheckChildren"
import { Protected } from "../components/ProtectedRoutes/Protected"

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
                path:'/changeForgottenPassword',
                element: <ChangeForgottenPassword/>,
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
                                <Profile/>
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
                children: [
                    {
                        path:'/gallery',
                        element: <Gallery/>
                    },
                    {
                        path:'/gallery/post',
                        element: <Post/>
                    },
                ]
            },
            {
                path:'/shop',
                element: (
                        <Shop/>
                ),
                children: [
                    {
                        path:'/shop',
                        element: <Shop/>
                    },
                    {
                        path:'/shop/product',
                        element: <Product/>
                    },
                ]
            },
            {
                path:'*',
                element: <NotFound/>,
            },
            
            
            
        ]
    }
])