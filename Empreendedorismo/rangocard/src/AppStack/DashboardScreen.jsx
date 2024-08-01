import { Box } from '@mui/material';
import Header from '../Components/Header';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

const DashboardScreen = () => {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];
    return (
        <Box sx={{ mx: 6, pt: 4 }}>
            <Header title={'Dashboard'} />

            <Box display="flex">
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
                <LineChart
                    width={500}
                    height={300}
                    series={[
                        { data: pData, label: 'pv', yAxisKey: 'leftAxisId' },
                        { data: uData, label: 'uv', yAxisKey: 'rightAxisId' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                    rightAxis="rightAxisId"
                />
            </Box>
            <Box mt={5}>
                <BarChart
                    series={[
                        { data: [35, 44, 24, 34] },
                        { data: [51, 6, 49, 30] },
                        { data: [15, 25, 30, 50] },
                        { data: [60, 50, 15, 25] },
                    ]}
                    height={290}
                    xAxis={[
                        { data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' },
                    ]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
            </Box>
        </Box>
    );
};
export default DashboardScreen;
