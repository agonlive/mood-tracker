import React, { useState } from 'react';
import { Container, Header, Grid, Input, Button } from 'semantic-ui-react';
import MoodForm from './MoodForm';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [tempUrl, setTempUrl] = useState('');

  const handleUrlChange = (e, { value }) => setTempUrl(value);
  const handleUrlSubmit = () => setBackgroundUrl(tempUrl);

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden',
    width: '100vw',
    fontFamily: "'Noto Sans Thai', sans-serif",
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url('https://img2.pic.in.th/pic/IMG_8027.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(2px)',
    transform: 'scale(1.1)', // Prevents blurred edges
    zIndex: 0,
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;700&display=swap');
          
          body {
            font-family: 'Noto Sans Thai', sans-serif;
          }

          body {
            font-family: 'Noto Sans Thai', sans-serif;
            font-size: 16px;
          }

          @media (max-width: 768px) {
            body {
              font-size: 18px;
            }
          }

          h1 {
            font-size: 2.5em !important;
          }

          @media (max-width: 768px) {
            h1 {
              font-size: 2em !important;
            }
          }
        `}
      </style>
      <div style={containerStyle}>
        <div style={backgroundStyle}></div>
        <Container fluid style={{ padding: 0 }}>
          <Header as='h1' textAlign='center' style={{ color: 'white', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', position: 'sticky' }}>📅 บันทึกอารมณ์ประจำวัน</Header>
          <Grid centered columns={1}>
            <Grid.Column mobile={16} tablet={16} computer={12}>
              <MoodForm />
            </Grid.Column>
          </Grid>

        </Container>
      </div>
    </>
  );
}

export default App;