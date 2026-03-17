import React, { useState } from 'react';
import { Drawer, SwipeableDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Paper, IconButton } from '@mui/material';
import { Map, Zap, School, Bus, Lightbulb, Shield, Users, Building, AlertTriangle, Activity } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Sidebar.css';

const Sidebar = ({ activeVariable, setActiveVariable, variables }) => {
  const theme = useTheme();
  // We use down('md') for mobile devices (approx max-width 900px)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Shared content inside the sidebar/bottom sheet
  const sidebarContent = (
    <>
      <Box className="sidebar-container">
        {isMobile && (
          <Box className="mobile-handle-container" onClick={() => setIsCollapsed(!isCollapsed)}>
            <Box className="mobile-handle" />
            <Typography variant="caption" className="mobile-handle-text" sx={{ pb: 1 }}>
              Deslizar hacia abajo para ocultar
            </Typography>
          </Box>
        )}
        <Box className="sidebar-header" sx={{ mt: isMobile ? 1 : 0 }}>
          <Paper elevation={3} className="sidebar-header-icon-container">
            <Map className="sidebar-header-icon" />
          </Paper>
          <Box>
            <Typography variant="h5" component="h1" className="sidebar-header-title">
              Desigualdad Urbana
            </Typography>
            <Typography variant="caption" className="sidebar-header-subtitle">
              Córdoba Capital
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" className="sidebar-description">
          Plataforma de <strong>Urban Data Science V19</strong>. Selecciona una métrica territorial para visualizar su huella geoespacial en la ciudad.
        </Typography>

        <Paper elevation={0} className="sidebar-metric-description">
          <Box className="sidebar-metric-description-highlight-bar"></Box>
          <Typography variant="subtitle1" component="h3" className="sidebar-metric-description-title">
            {activeVariable.icon && React.createElement(activeVariable.icon, { className: 'sidebar-metric-description-icon' })}
            {activeVariable.label}
          </Typography>
          <Typography variant="body2" className="sidebar-metric-description-text">
            {activeVariable.desc}
          </Typography>
        </Paper>

        <Typography variant="h6" component="h2" className="sidebar-variables-title">
          <Zap className="sidebar-variables-title-icon" />
          Métricas Geoespaciales
        </Typography>

        <List className="sidebar-variables-list">
          {variables.map((v) => {
            const Icon = v.icon;
            const isActive = activeVariable.key === v.key;

            return (
              <ListItem key={v.key} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    setActiveVariable(v);
                    if (isMobile) {
                      setIsCollapsed(true);
                    }
                  }}
                  className={`sidebar-variable-button ${isActive ? 'active' : ''}`}
                >
                  <ListItemIcon className="sidebar-variable-icon-container">
                    {Icon && <Icon className={`sidebar-variable-icon ${isActive ? 'active' : ''}`} />}
                  </ListItemIcon>
                  <ListItemText primary={v.label} className="sidebar-variable-text" />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box className="sidebar-footer">
        <Typography variant="overline" className="sidebar-footer-title">
          Ingeniería & Datos
        </Typography>
        <Paper elevation={3} className="sidebar-footer-card">
          <Typography variant="h6" className="sidebar-footer-name">Eber Coronel</Typography>
          <Typography variant="body2" className="sidebar-footer-job">Principal Urban Data Scientist</Typography>
          <Box className="sidebar-footer-links">
            <a href="https://linkedin.com/in/ebercoronel" target="_blank" rel="noreferrer" className="sidebar-footer-link">
              LinkedIn
            </a>
            <a href="https://github.com/eber-cba" target="_blank" rel="noreferrer" className="sidebar-footer-link">
              GitHub
            </a>
          </Box>
          <a href="https://github.com/eber-cba/dataset-desigualdad-cordoba" target="_blank" rel="noreferrer" className="sidebar-footer-repo-link">
            Ver Repo V19
          </a>
        </Paper>
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Helper bottom bar when closed */}
        <Box 
          onClick={() => setIsCollapsed(false)}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            bgcolor: 'rgba(15, 23, 42, 0.95)',
            borderTop: '1px solid rgba(56, 189, 248, 0.2)',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            p: 2,
            pt: 1.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Box className="mobile-handle" sx={{ mb: 1 }} />
          <Typography variant="caption" className="mobile-handle-text" sx={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
            VER MÉTRICAS Y HERRAMIENTAS
          </Typography>
        </Box>

        <SwipeableDrawer
          anchor="bottom"
          open={!isCollapsed}
          onClose={() => setIsCollapsed(true)}
          onOpen={() => setIsCollapsed(false)}
          swipeAreaWidth={56}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: 'rgba(15, 23, 42, 0.98)',
              backdropFilter: 'blur(16px)',
              height: '85vh',
              color: 'var(--text-primary)',
              backgroundImage: 'none' // remove MUI default overlay
            }
          }}
        >
          {sidebarContent}
        </SwipeableDrawer>
      </>
    );
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{ paper: 'sidebar-paper' }}
      sx={{
        width: 360,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 360, boxSizing: 'border-box' },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;
