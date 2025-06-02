import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import MainLayout from "@/Layout/MainLayout";
import { Home, Login, Otp, Register, Center, Branches, Resources, CEO, Profile, Fovorites, Reseptions } from "@/page";
import AutheLayout from "@/Layout/AuthLayout";


export default function Router(){
    const root = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route path='/' element={<MainLayout />}>
					<Route path='/' element={<Home/>} />
                    <Route path="/center/:id" element={<Center/>}/>
                    <Route path="/branches/:id" element={<Branches/>}/>
                    <Route path="/resources" element={<Resources/>}/>
                    <Route path="/ceo" element={<CEO/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/favorites" element={<Fovorites/>}/>
                    <Route path="/reseptions" element={<Reseptions/>}/>
				</Route>
				<Route element={<AutheLayout />}>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/otp' element={<Otp />} />
				</Route>
            </Route>
        )
    )
    return <RouterProvider router={root} />
}