import React, { useState, useEffect, useRef } from 'react';
import bilde from './spinner.png';

// A fun fidget spinner component that accelerates with each press and decelerates over time
const BildeFidgetToy = () => {

    const [spinner, setSpinner] = useState(false); // State for whether the spinner is spinning
    const [speed, setSpeed] = useState(0); // Speed of the spinner, starts at 0
    const spinnerRef = useRef(null); // Reference to the spinner image element
    const decelerationRate = 0.3; // Rate at which the speed decreases over time
    const speedIncrease = 3; // How much the speed increases with each button press

    // This effect handles the spinner animation and deceleration
    useEffect(() => {
        let animationFrameId;
        const spinInterval = 1000 / 60; // 60 FPS for smooth animation
        let lastTimestamp = 0;

        const animateSpinner = (timestamp) => {
            if (spinnerRef.current && speed > 0) {
                const deltaTime = timestamp - lastTimestamp;
                const rotation = (speed * deltaTime) / 1000; // Convert speed to a degree per frame
                const currentRotation = parseFloat(spinnerRef.current.style.transform.replace('rotate(', '').replace('deg)', '') || 0);
                spinnerRef.current.style.transform = `rotate(${currentRotation + rotation}deg)`;

                // Gradually reduce the speed for deceleration
                setSpeed((prevSpeed) => Math.max(prevSpeed - decelerationRate, 0));

                lastTimestamp = timestamp;
            }

            animationFrameId = requestAnimationFrame(animateSpinner);
        };

        if (speed > 0) {
            animationFrameId = requestAnimationFrame(animateSpinner);
        }

        return () => cancelAnimationFrame(animationFrameId);

    }, [speed]);

    // Handle button click - increase speed and start spinning
    const handleClick = () => {
        setSpeed((prevSpeed) => prevSpeed + speedIncrease); // Increase speed on button press
        setSpinner(true); // Start the spinning animation
    };

    return (
        <div>
            <style>{`
                .spinny-bilde {
                    height: 40vmin;
                    pointer-events: none;
                    transition: transform 0.1s linear;
                }

                .spinneknapp {
                    padding: 15px 30px;
                    margin-top: 20px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                }
            `}</style>

            {/* Image of the fidget spinner */}
            <img src={bilde} ref={spinnerRef} className="spinny-bilde" alt="bilde" />

            {/* Button to trigger the spinner */}
            <button onClick={handleClick} className="spinneknapp">
                Spinn!
            </button>
        </div>
    );
}

export default BildeFidgetToy;