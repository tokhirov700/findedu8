import { Outlet } from 'react-router-dom'
import { NotificationHandler } from './components/I/NotificationHandler'
import { useEffect } from 'react'
import { isCenters } from './store/isCenters'
import { isUser } from './store/user'
function App() {
	const { getCenters } = isCenters()
	const {getMyUser} = isUser()
	

	useEffect(() => {
		getMyUser() // Login qilgan User get qilinib olinadi
		getCenters(); // CENTERS get qilinib olinyapti
	}, [getCenters, getMyUser])

	return (
		<section className='w-full overflow-x-hidden'>
			<NotificationHandler />
			<Outlet/>
		</section>
	)
}

export default App
