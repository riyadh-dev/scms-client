import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TopBar from './Topbar';
import Sidebar from './Sidebar';

const Navbar = ({ history }) => {
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
	const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);

	useEffect(() => {
		const unlisten = history.listen(() => {
			setIsSidebarOpen(false);
		});
		return () =>{
			unlisten();
		};
	}, [history]);

	return (
		<Fragment>
			<TopBar toggleSidebar={toggleSidebar} />
			<Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
		</Fragment>
	);
};

export default withRouter(Navbar);


