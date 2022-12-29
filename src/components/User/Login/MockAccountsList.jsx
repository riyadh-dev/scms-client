import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	Modal,
	Paper,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { Query } from 'react-apollo';
import { GET_USERS } from './queries';

const useStyles = makeStyles({
	model: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	paper: {
		width: '450px',
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		height: '80vh',
	},
	divider: { margin: '1rem -20px' },
	list: { overflow: 'auto', marginRight: '-20px' },
});

const MockAccountsList = ({
	openMockAccountsList,
	handleCloseOpenMockAccountsList,
	login,
}) => {
	const classes = useStyles();
	return (
		<Modal
			open={openMockAccountsList}
			onClose={handleCloseOpenMockAccountsList}
			aria-labelledby='sign-up-form'
			className={classes.model}
		>
			<Paper className={classes.paper}>
				<Typography variant='h4' fontWeight={600}>
					Mock Accounts List
				</Typography>
				<Divider className={classes.divider} />
				<Query query={GET_USERS}>
					{({ data, loading, error }) =>
						loading || error ? (
							<h2>Loading...</h2>
						) : (
							<List className={classes.list}>
								{data.users.map((account) => (
									<ListItem
										button
										key={account._id}
										onClick={() =>
											login({
												variables: {
													email: account.email,
													password: 'password',
												},
											})
										}
									>
										<ListItemAvatar>
											<Avatar>{account.firstName[0]}</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={account.firstName + ' ' + account.lastName}
											secondary={account.roles.toString().replace(',', ', ')}
										/>
									</ListItem>
								))}
							</List>
						)
					}
				</Query>
			</Paper>
		</Modal>
	);
};

export default MockAccountsList;
