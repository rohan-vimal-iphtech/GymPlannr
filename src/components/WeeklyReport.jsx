import React,{useMemo} from 'react';
import { useSelector } from 'react-redux';
import { getWeekDates } from './dateUtils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const calculateEstimatedTime = (exercises) => {
  if (!Array.isArray(exercises)) return 0;

  let totalSeconds = 0;
  exercises.forEach(ex => {
    const setTime = ex.sets * 120;
    const restTime = (ex.sets - 1) * (ex.restTime || 0);
    totalSeconds += setTime + restTime;
  });

  return Math.ceil(totalSeconds / 60); // convert to minutes
};

const WeeklyReport = ({ onClose }) => {
  const { days, activeDate } = useSelector((state) => state.planner);

  const currentWeekDates = useMemo(() => getWeekDates(activeDate), [activeDate]);

  const reportData = currentWeekDates.map((date, index) => ({
    name: new Date(date).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }),
     minutes: days[date]?.isRestDay ? 0 : calculateEstimatedTime(days[date]?.exercises || []),
    isRestDay: days[date]?.isRestDay,
  }));


  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-3xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Weekly Report</h2>
          <button onClick={onClose} className="text-gray-600 text-3xl hover:text-black">&times;</button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={reportData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00A6F4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00A6F4" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value, name) => [`${value} min`, name]} />
            <Area
              type="monotone"
              dataKey="minutes"
              stroke="#00A6F4"
              fill="url(#colorMinutes)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-4 text-sm text-gray-500">
          <p>* Rest days show as 0 minutes.</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport;
