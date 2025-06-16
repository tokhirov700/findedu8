import { Outlet } from 'react-router-dom'
import { NotificationHandler } from './components/I/NotificationHandler'
import { useEffect } from 'react'
import { isCenters } from './store/isCenters'
import { isUser } from './store/user'
import { Likes } from './store/liked'
function App() {
	const { getCenters } = isCenters()
	const {getMyUser} = isUser()
	const {getLikes} = Likes()
	

	useEffect(() => {
		getMyUser() 
		getCenters(); 
		getLikes() 
	}, [getCenters, getMyUser, getLikes])

	return (
		<section className='w-full overflow-x-hidden'>
			<NotificationHandler />
			<Outlet/>
		</section>
	)
}

export default App
