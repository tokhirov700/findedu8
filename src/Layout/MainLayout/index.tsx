
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import AppFooter from '../components/footer'



const MainLayout = () => {
	return (
		<div>
			<Header/>
			<main className='main'>
				<Outlet />
			</main>
			<AppFooter/>
		</div>
	)
}

export default MainLayout
