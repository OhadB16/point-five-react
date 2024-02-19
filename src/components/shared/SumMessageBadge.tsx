import React from 'react';
import { Box } from "@mui/material";

type SumBadgeProps = {
    text: string;
};

const SumMessageBadge: React.FC<SumBadgeProps> = ({ text }) => {

  return (
    <Box  sx={{  marginLeft: 2,
        height: 30,
        width: 150,
        backgroundColor: '#ffe4e1',
        borderRadius: 5, // Set border-radius to half of height for a round shape
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}}>
        <Box  sx={{ marginTop: 0.1, marginLeft: 0.5, color:'#b666d2', fontSize: 12, fontWeight: 600 }}>
             {text}
        </Box>
    </Box>
  );
};

export default React.memo(SumMessageBadge);
