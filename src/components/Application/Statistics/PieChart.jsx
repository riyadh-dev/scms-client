import { Divider, Paper, Typography } from '@material-ui/core';
import { ResponsivePie } from '@nivo/pie';
import React from 'react';
import { graphql } from 'react-apollo';
import { GET_THEME } from '../../Layout/queries';

const StatisticsPieChart = ({ data, chartData, title = 'Pie Chart', colors = { scheme: 'set2' } }) => {
	const theme = { labels: { text: { fontSize: 16, } } };
	const fontColor = data.theme ? 'white' : '#333333';
	return (
		<Paper>
			<div style={{ height: 360 }}>
				<ResponsivePie
					data={chartData}
					margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
					padAngle={0.7}
					cornerRadius={3}
					colors={colors}
					borderWidth={1}
					borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
					radialLabelsSkipAngle={10}
					radialLabelsTextXOffset={6}
					radialLabelsTextColor={fontColor}
					radialLabelsLinkOffset={0}
					radialLabelsLinkDiagonalLength={16}
					radialLabelsLinkHorizontalLength={24}
					radialLabelsLinkStrokeWidth={1}
					radialLabelsLinkColor={{ from: 'color' }}
					slicesLabelsSkipAngle={10}
					slicesLabelsTextColor={fontColor}
					animate={true}
					motionStiffness={90}
					motionDamping={15}
					isInteractive={false}
					theme={theme}
				/>
			</div>
			<Divider />
			<Typography style={{ padding: 16 }} align="center" variant="h5" component="h2">
				{title}
			</Typography>
		</Paper >
	);
};

export default graphql(GET_THEME)(StatisticsPieChart);