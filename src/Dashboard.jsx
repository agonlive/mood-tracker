import React, { useState } from 'react';
import { Container, Header, Button, Form, Segment, Dimmer, Loader, Grid } from 'semantic-ui-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [moodData, setMoodData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://sheetdb.io/api/v1/apk71jlwjb97m');
            const data = await response.json();

            // Filter data based on date range
            const filteredData = data.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            });

            // Process data for pie chart
            const moodCounts = filteredData.reduce((acc, item) => {
                acc[item.mood] = (acc[item.mood] || 0) + 1;
                return acc;
            }, {});

            const total = Object.values(moodCounts).reduce((sum, count) => sum + count, 0);
            console.log('filteredData:', filteredData);
            console.log('Mood counts:', moodCounts);
            console.log('total:', total);

            setMoodData({
                labels: Object.keys(moodCounts),
                datasets: [{
                    data: Object.values(moodCounts).map(count => (count / total * 100).toFixed(2)),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value}%`;
                    }
                }
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Segment padded="very" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: '0 auto', maxWidth: '100%' }}>
                <Header as='h1' style={{ marginTop: '2rem' }}>✨ สรุปอารมณ์สุดว้าว! 🎉</Header>
                <Segment>
                    <Form>
                        <Grid stackable columns={2}>
                            <Grid.Column>
                                <Form.Field>
                                    <label>Start Date</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        customInput={<Form.Input fluid />}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <label>End Date</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={date => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        customInput={<Form.Input fluid />}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid>
                        <Button primary onClick={fetchData} style={{ marginTop: '1rem' }}>
                            แสดงผล 🔍
                        </Button>
                        <Button secondary onClick={() => navigate('/')} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
                            กลับ 🏠
                        </Button>
                    </Form>
                </Segment>
                <Segment>
                    <Dimmer active={loading} inverted>
                        <Loader>กำลังโหลดข้อมูล... 🐱</Loader>
                    </Dimmer>
                    {moodData && (
                        <Pie data={moodData} options={options} />
                    )}
                </Segment>
            </Segment >
        </motion.div>
    );
}

export default Dashboard;