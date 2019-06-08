import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { AccountBox, AccountCircle, Brightness4, ExitToApp } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import { TOGGLE_THEME } from '../mutations';
import { LOG_OUT } from '../../User/mutations';

const UserSection = ({ history }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogOut = logout => () => {
		logout();
		history.push('/');
	};

	return (
		<Mutation mutation={LOG_OUT}>
			{logout => (
				<Fragment>
					<IconButton
						aria-owns={isMenuOpen ? 'material-appbar' : undefined}
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="inherit"
						size="small"
					>
						<AccountCircle fontSize="large" />
					</IconButton>
					<Menu
						disableAutoFocusItem
						anchorEl={anchorEl}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						open={isMenuOpen}
						onClose={handleMenuClose}
					>
						<MenuItem component={Link} to='/profile' onClick={handleMenuClose}>
							<ListItemIcon><AccountBox /></ListItemIcon>
							<ListItemText primary="Profile" />
						</MenuItem>
						<Mutation mutation={TOGGLE_THEME}>
							{toggleTheme => (
								<MenuItem onClick={toggleTheme}>
									<ListItemIcon><Brightness4 /></ListItemIcon>
									<ListItemText primary="Drak Theme" />
								</MenuItem>
							)}
						</Mutation>
						<MenuItem onClick={handleLogOut(logout)}>
							<ListItemIcon><ExitToApp /></ListItemIcon>
							<ListItemText primary="Log Out" />
						</MenuItem>
					</Menu>
				</Fragment>
			)}
		</Mutation>
	);
};

UserSection.propTypes = {
	history: PropTypes.object.isRequired
};

export default withRouter(UserSection);
