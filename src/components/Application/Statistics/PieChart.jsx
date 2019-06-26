import { ResponsivePie } from '@nivo/pie';
import { Paper, Typography, Divider } from '@material-ui/core';
import React from 'react';

const StatisticsPieChart = ({ data, title = 'Pie Chart', colors = { scheme: 'set2' } }) => {
	const theme = {
		labels: { text: { fontSize: 16 } }
	};
	return (
		<Paper>
			<div style={{ height: 360 }}>
				<ResponsivePie
					data={data}
					margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
					padAngle={0.7}
					cornerRadius={3}
					colors={colors}
					borderWidth={1}
					borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
					radialLabelsSkipAngle={10}
					radialLabelsTextXOffset={6}
					radialLabelsTextColor="#333333"
					radialLabelsLinkOffset={0}
					radialLabelsLinkDiagonalLength={16}
					radialLabelsLinkHorizontalLength={24}
					radialLabelsLinkStrokeWidth={1}
					radialLabelsLinkColor={{ from: 'color' }}
					slicesLabelsSkipAngle={10}
					slicesLabelsTextColor="#333333"
					animate={true}
					motionStiffness={90}
					motionDamping={15}
					theme={theme}
					defs={[
						{
							id: 'dots',
							type: 'patternDots',
							background: 'inherit',
							color: 'rgba(255, 255, 255, 0.3)',
							size: 4,
							padding: 1,
							stagger: true
						},
						{
							id: 'lines',
							type: 'patternLines',
							background: 'inherit',
							color: 'rgba(255, 255, 255, 0.3)',
							rotation: -45,
							lineWidth: 6,
							spacing: 10
						}
					]}
					fill={[
						{
							match: {
								id: 'ruby'
							},
							id: 'dots'
						},
						{
							match: {
								id: 'Refused'
							},
							id: 'dots'
						},
						{
							match: {
								id: 'go'
							},
							id: 'dots'
						},
						{
							match: {
								id: 'Female'
							},
							id: 'dots'
						},
						{
							match: {
								id: 'Male'
							},
							id: 'lines'
						},
						{
							match: {
								id: 'Accepted'
							},
							id: 'lines'
						},
						{
							match: {
								id: 'elixir'
							},
							id: 'lines'
						},
						{
							match: {
								id: 'javascript'
							},
							id: 'lines'
						}
					]}
				/>
			</div>
			<Divider />
			<Typography style={{ padding: 16 }} align="center" variant="h5" component="h2">
				{title}
			</Typography>
		</Paper >
	);
};

export default StatisticsPieChart;