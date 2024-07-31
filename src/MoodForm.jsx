import React, { useState } from 'react';
import { Form, Button, Radio, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';

function MoodForm() {
    const [mood, setMood] = useState('');
    const [meal, setMeal] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/moods', { mood, meal });
            setSuccess(true);
            setMood('');
            setMeal('');
        } catch (error) {
            console.error('Error submitting mood:', error);
        }
        setLoading(false);
    };

    const formStyle = {
        fontFamily: "'Noto Sans Thai', sans-serif",
        fontSize: '1em',
    };

    const labelStyle = {
        color: 'black',
        fontSize: '1.2em',
        marginBottom: '0.7em',
        fontWeight: 500
    };

    return (
        <Segment padded="very" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: '0 auto', maxWidth: '100%' }}>
            <Form onSubmit={handleSubmit} success={success} loading={loading} style={formStyle}>
                <Form.Group grouped>
                    <label style={labelStyle}>วันนี้อารมณ์เป็นอย่างไร</label>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Form.Field style={{ marginBottom: '0.7em', width: '100%' }}>
                            <Radio
                                style={{ fontSize: '1.2em' }}
                                label='🥺 แย่'
                                name='moodRadioGroup'
                                value='แย่'
                                checked={mood === 'แย่'}
                                onChange={(e, { value }) => setMood(value)}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginBottom: '0.7em', width: '100%' }}>
                            <Radio
                                style={{ fontSize: '1.2em' }}
                                label='😐 กลาง'
                                name='moodRadioGroup'
                                value='กลาง'
                                checked={mood === 'กลาง'}
                                onChange={(e, { value }) => setMood(value)}
                            />
                        </Form.Field>
                        <Form.Field style={{ width: '100%' }}>
                            <Radio
                                style={{ fontSize: '1.2em' }}
                                label='☺️ ดี'
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
                        <label style={labelStyle}>🍛 วันนี้กินข้าวกับอะไร</label>
                        <Form.Input
                            placeholder='เช่น ข้าวผัด, ส้มตำ'
                            value={meal}
                            onChange={(e) => setMeal(e.target.value)}
                            style={{ fontSize: '1em' }}
                        />
                    </Form.Field>
                </Form.Group>

                <Button type='submit' primary fluid style={{ fontSize: '1.1em' }}>✨ บันทึกข้อมูล</Button>
                <Message
                    success
                    header='บันทึกข้อมูลสำเร็จ'
                    content='ข้อมูลอารมณ์ของคุณถูกบันทึกเรียบร้อยแล้ว'
                    style={{ fontSize: '1em' }}
                />
            </Form>
        </Segment>
    );
}

export default MoodForm;