import React, { useState } from 'react';
import { Form, Button, Radio, Message, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function MoodForm() {
    const [mood, setMood] = useState('');
    const [meal, setMeal] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate('/dashboard');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        try {
            const response = await fetch('https://sheetdb.io/api/v1/apk71jlwjb97m', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [
                        {
                            'mood': mood,
                            'food': meal,
                            'date': currentDate
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setSuccess(true);
            setMood('');
            setMeal('');
        } catch (error) {
            console.error('Error submitting mood:', error);
            setError('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
        }
    };

    const formStyle = {
        fontFamily: "'Noto Sans Thai', sans-serif",
        fontSize: '1em',
    };

    const labelStyle = {
        color: 'black',
        fontSize: '1.2em',
        marginBottom: '0.7em',
        fontWeight: 'bold'
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Segment padded="very" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: '0 auto', maxWidth: '100%' }}>
                <Form onSubmit={handleSubmit} success={success} error={!!error} loading={loading} style={formStyle}>
                    <Form.Group grouped>
                        <label style={labelStyle}>วันนี้อารมณ์เป็นอย่างไร</label>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Form.Field style={{ marginBottom: '0.7em', width: '100%' }}>
                                <Radio
                                    label='🥺 แย่'
                                    style={{ fontSize: '1.2em' }}
                                    name='moodRadioGroup'
                                    value='แย่'
                                    checked={mood === 'แย่'}
                                    onChange={(e, { value }) => setMood(value)}
                                />
                            </Form.Field>
                            <Form.Field style={{ marginBottom: '0.7em', width: '100%' }}>
                                <Radio
                                    label='😐 กลาง'
                                    style={{ fontSize: '1.2em' }}
                                    name='moodRadioGroup'
                                    value='กลาง'
                                    checked={mood === 'กลาง'}
                                    onChange={(e, { value }) => setMood(value)}
                                />
                            </Form.Field>
                            <Form.Field style={{ width: '100%' }}>
                                <Radio
                                    label='☺️ ดี'
                                    style={{ fontSize: '1.2em' }}
                                    name='moodRadioGroup'
                                    value='ดี'
                                    checked={mood === 'ดี'}
                                    onChange={(e, { value }) => setMood(value)}
                                />
                            </Form.Field>
                        </div>
                    </Form.Group>

                    <Form.Group grouped>
                        <Form.Field>
                            <label style={labelStyle}>วันนี้กินข้าวกับอะไร</label>
                            <Form.Input
                                placeholder='เช่น ข้าวผัด, ส้มตำ'
                                value={meal}
                                onChange={(e) => setMeal(e.target.value)}
                                style={{ fontSize: '1em' }}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Button type='submit' primary fluid style={{ fontSize: '1.1em', marginBottom: '8px' }}>  บันทึกข้อมูล 📝</Button>
                    <Button type='button' secondary fluid style={{ fontSize: '1.1em', marginBottom: '8px' }} onClick={handleDashboardClick}>
                        ไปดู Dashboard 📊
                    </Button>
                    <Button type='button' secondary fluid style={{ fontSize: '1.1em' }} onClick={() => navigate('/mood-tracker/eggycoin')}>
                        คำนวน Eggy Coin 🪙
                    </Button>
                    <Message
                        success
                        header='บันทึกข้อมูลสำเร็จ'
                        content='ข้อมูลอารมณ์ของคุณถูกบันทึกเรียบร้อยแล้ว'
                        style={{ fontSize: '1em' }}
                    />
                    <Message
                        error
                        header='เกิดข้อผิดพลาด'
                        content={error}
                        style={{ fontSize: '1em' }}
                    />
                </Form>
            </Segment>
        </motion.div>
    );
}

export default MoodForm;