import { getMonthWeeks } from '../../utils/dateUtils';

const staticLabels = {
  yearly: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

export default grouping => {
  if (grouping === 'monthly') {
    const weeks = getMonthWeeks();
    return weeks.map((val, i) => `Week #${i + 1}`);
  }
  return staticLabels[grouping];
};
