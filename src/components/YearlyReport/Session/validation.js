import dayjs from 'dayjs';
import { date, object } from 'yup';

const now = dayjs().subtract(1, 'day');
const after2month = dayjs(now).add(2, 'month');
const afterWeek = dayjs(after2month).add(1, 'week');

export default object().shape({
	submissionsStartDate: date().min(now, 'Must be not be a past date').required(),
	submissionsEndDate: date().min(after2month, 'Must be 2 months after start date').required(),
	mettingDate: date().min(afterWeek, 'Must be 1 week after end date').required(),
});