import React from 'react'
import Slider from '@mui/material/Slider';

const ProgBar = (progBarRef) => {
    return (
        <>
            <Slider
                sx={{
                    height: 3,
                    color: '#fff',
                    '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        borderRadius: '100%',
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#535353',
                    },
                }}
                value={progBarRef.current}
                onChange={(event, value) => {
                    progBarRef.current = value;
                    // Update the audio progress bar with the new value
                }}
            />
        </>
    )
}

export default ProgBar