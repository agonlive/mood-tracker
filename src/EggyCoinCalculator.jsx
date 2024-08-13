import React, { useState, useEffect } from 'react';
import { Container, Header, Input, Segment, Button, Image } from 'semantic-ui-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './EggyCoinCalculator.css'; // เพิ่ม import สำหรับ CSS file

const eggyCoinPackages = [
    { eggy: 10, thb: 4 },
    { eggy: 60, thb: 29 },
    { eggy: 120, thb: 58 },
    { eggy: 300, thb: 145 },
    { eggy: 700, thb: 339 },
    { eggy: 1380, thb: 669 },
    { eggy: 2080, thb: 1008 },
    { eggy: 3450, thb: 1673 },
    { eggy: 6880, thb: 3336 }
];

function EggyCoinCalculator() {
    const [inputEggy, setInputEggy] = useState('');
    const [outputTHB, setOutputTHB] = useState('');

    const calculateTHB = (eggy) => {
        if (!eggy) return '';
        let thb = 0;
        let remainingEggy = parseInt(eggy);

        for (const pkg of eggyCoinPackages.slice().reverse()) {
            while (remainingEggy >= pkg.eggy) {
                thb += pkg.thb;
                remainingEggy -= pkg.eggy;
            }
        }

        if (remainingEggy > 0) {
            thb += Math.ceil(remainingEggy * (eggyCoinPackages[0].thb / eggyCoinPackages[0].eggy));
        }

        return thb.toFixed(2);
    };

    useEffect(() => {
        setOutputTHB(calculateTHB(inputEggy));
    }, [inputEggy]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'relative', paddingTop: '2rem' }}
        >
            <Container style={{ width: '100%', maxWidth: '600px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', padding: '20px' }}>
                <Header as='h1' style={{ marginBottom: '2rem', textAlign: 'center' }}>🥚 Eggy Coin Calculator 🧮</Header>

                <Segment>
                    <div className="eggy-coin-form">
                        <div className="input-group">
                            <Image src="https://hfc20-mgb-hz-allysdk.s3.nie.netease.com/e3207bb7f75b19f8b17b2adb0579c9f3_script.png" size="mini" className="eggy-coin-icon" />
                            <Input
                                type="number"
                                placeholder="Enter Eggy Coins"
                                value={inputEggy}
                                onChange={(e) => setInputEggy(e.target.value)}
                                fluid
                                className="eggy-coin-input"
                            />
                        </div>
                        <div className="input-group">
                            <span className="money-icon">💰</span>
                            <Input
                                type="text"
                                value={outputTHB}
                                readOnly
                                fluid
                                label={{ basic: true, content: 'THB' }}
                                labelPosition='right'
                                className="thb-input"
                            />
                        </div>
                    </div>
                </Segment>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Button as={Link} to="/mood-tracker" secondary>
                        กลับ 🏠
                    </Button>
                </div>
            </Container>
        </motion.div>
    );
}

export default EggyCoinCalculator;