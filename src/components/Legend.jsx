import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { Info, Minimize2 } from 'lucide-react';
import './Legend.css';

const Legend = ({ activeVariable, onCloseMobile }) => {
  return (
    <Paper elevation={3} className="legend-container">
      <Box className="legend-header">
        <Info className="legend-header-icon" />
        <Typography variant="caption" component="h3" className="legend-header-title">
          Guía de Visualización
        </Typography>
        <IconButton onClick={onCloseMobile} className="legend-close-button">
          <Minimize2 />
        </IconButton>
      </Box>

      <Box className="legend-section">
        <Box className="legend-color-range-labels">
          <Typography variant="caption">Menor Intensidad</Typography>
          <Typography variant="caption">Mayor Intensidad</Typography>
        </Box>
        <Box className="legend-color-range-bar"></Box>
        <Typography variant="body2" className="legend-section-description">
          Los colores indican el nivel de <strong>{activeVariable.label}</strong> en cada barrio.
        </Typography>
      </Box>

      <Box className="legend-section">
        <Box className="legend-circle-size-visualizer">
          <Box className="legend-circle-container">
            <Box className="legend-circle small"></Box>
            <Typography variant="caption">Bajo</Typography>
          </Box>
          <Box className="legend-circle-separator"></Box>
          <Box className="legend-circle-container">
            <Box className="legend-circle large"></Box>
            <Typography variant="caption" className="text-highlight">Alto</Typography>
          </Box>
        </Box>
        <Typography variant="body2" className="legend-section-description">
          El <strong>tamaño del círculo</strong> representa proporcionalmente el valor absoluto de la métrica.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Legend;
