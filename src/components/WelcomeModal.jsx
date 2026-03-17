import React from 'react';
import { Modal, Paper, Typography, Box, Button, IconButton } from '@mui/material';
import { Map, Zap, Layers, BarChart3, Info, X } from 'lucide-react';
import './WelcomeModal.css';

const WelcomeModal = ({ onClose }) => {
  return (
    <Modal open onClose={onClose} className="welcome-modal-backdrop">
      <Paper elevation={12} className="welcome-modal-paper">
        <Box className="welcome-modal-glow-effect" />
        <IconButton onClick={onClose} className="welcome-modal-close-button">
          <X />
        </IconButton>

        <Box className="welcome-modal-header">
          <Box className="welcome-modal-header-icon-container">
            <Map className="welcome-modal-header-icon" />
          </Box>
          <Box>
            <Typography variant="h4" component="h2" className="welcome-modal-title">
              Bienvenido al Dashboard
            </Typography>
            <Typography variant="subtitle2" component="p" className="welcome-modal-subtitle">
              Desigualdad Urbana en Córdoba
            </Typography>
          </Box>
        </Box>

        <Box className="welcome-modal-body">
          <Typography paragraph>
            Esta plataforma interactiva permite explorar visualmente datos territoriales cruzando la <strong>pobreza estructural (Censo)</strong> con la infraestructura de <strong>servicios públicos municipal (2023)</strong> a lo largo de 495 barrios oficiales de la Capital.
          </Typography>

          <Paper variant="outlined" className="welcome-modal-instructions-card">
            <Typography variant="h6" component="h3" className="welcome-modal-instructions-title">
              <Info />
              ¿Cómo usar esta herramienta?
            </Typography>
            <ul className="welcome-modal-instructions-list">
              <li><Layers /><span>Usa el <strong>Panel Izquierdo</strong> para cambiar la capa de datos. Cada botón representa una variable distinta (Ej: Escuelas, Salud, Transporte).</span></li>
              <li><BarChart3 /><span>Los círculos en el mapa (<strong>Heatmap</strong>) cambiarán de tamaño y color. Los tonos de azul oscuro indican valores bajos, mientras que los tonos <strong>Morados y Rojos Neón</strong> indican alta concentración.</span></li>
              <li><Zap /><span>Haz clic o pasa el ratón (<strong>Hover</strong>) sobre cualquier círculo para ver la Ficha Técnica exacta de dicho barrio.</span></li>
            </ul>
          </Paper>
        </Box>

        <Box className="welcome-modal-footer">
          <Button
            variant="contained"
            onClick={onClose}
            className="welcome-modal-cta-button"
          >
            Comenzar a explorar
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default WelcomeModal;
