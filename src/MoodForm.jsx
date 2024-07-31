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

    return (
        <Segment padded="very" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: '0 auto', maxWidth: '100%' }}>
            <Form onSubmit={handleSubmit} success={success} loading={loading}>
                <Form.Group grouped>
                    <label style={{ color: 'black', fontSize: '1.1em', marginBottom: '0.5em' }}>วันนี้อารมณ์ PD 🌟 เป็นอย่างไร</label>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Form.Field style={{ marginBottom: '0.5em', width: '100%' }}>
                            <Radio
                                label='🥺 แย่'
                                name='moodRadioGroup'
                                value='แย่'
                                checked={mood === 'แย่'}
                                onChange={(e, { value }) => setMood(value)}
                            />
                        </Form.Field>
                        <Form.Field style={{ marginBottom: '0.5em', width: '100%' }}>
                            <Radio
                                label='😐 กลาง'
                                name='moodRadioGroup'
                                value='กลาง'
                                checked={mood === 'กลาง'}
                                onChange={(e, { value }) => setMood(value)}
                            />
                        </Form.Field>
                        <Form.Field style={{ width: '100%' }}>
                            <Radio
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
                        <label style={{ color: 'black', fontSize: '1.1em' }}>วันนี้กินข้าวกับอะไร</label>
                        <Form.Input
                            placeholder='เช่น ข้าวผัด, ส้มตำ'
                            value={meal}
                            onChange={(e) => setMeal(e.target.value)}
                        />
                    </Form.Field>
                </Form.Group>

                <Button type='submit' primary fluid>บันทึกข้อมูล</Button>
                <Message
                    success
                    header='บันทึกข้อมูลสำเร็จ'
                    content='ข้อมูลอารมณ์ของคุณถูกบันทึกเรียบร้อยแล้ว'
                />
            </Form>
        </Segment>
    );
}

export default MoodForm;