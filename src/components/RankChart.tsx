import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
    { time: '01시', score: 400 },
    { time: '02시', score: 430 },
    { time: '03시', score: 500 },
    { time: '04시', score: 600 },
    { time: '05시', score: 650 },
    { time: '06시', score: 700 }, // 가장 최신 데이터
  ];

  export default function RankChart() {
    return (
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#a78bfa"
              strokeWidth={2}
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  const CustomDot = ({ cx, cy, index }) => {
    const isLast = index === data.length - 1;
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="#a78bfa" />
        {isLast && (
          <image
            href="/images/member.png" // 여기에 실제 이미지 경로 넣기
            x={cx}
            y={cy - 10}
            width={32}
            height={32}
            style={{ transform: 'translateX(0px)' }}
          />
        )}
      </g>
    );
  };