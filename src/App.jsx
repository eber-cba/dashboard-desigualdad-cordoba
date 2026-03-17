import React, { useEffect, useState } from 'react';
import { loadData } from './utils/DataLoader';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import WelcomeModal from './components/WelcomeModal';
import { Map as MapIcon, Users, AlertTriangle, School, Bus, Activity, Shield } from 'lucide-react';
import { Box, CircularProgress, Typography } from '@mui/material';

const VARIABLES = [
  { key: 'infraestructura_score', label: 'Índice de Infraestructura (Score)', icon: MapIcon, desc: 'Índice ponderado de acceso a transporte, educación, salud y seguridad.' },
  { key: 'pct_nbi', label: 'Vulnerabilidad Social (% NBI)', icon: AlertTriangle, desc: 'Porcentaje de hogares con Necesidades Básicas Insatisfechas.' },
  { key: 'densidad_poblacional', label: 'Densidad Poblacional (Hab/Km2)', icon: Users, desc: 'Cantidad de habitantes por kilómetro cuadrado.' },
  { key: 'tamano_promedio_hogar', label: 'Hacinamiento (Hab/Hogar)', icon: Users, desc: 'Promedio de personas viviendo en un mismo hogar.' },
  { key: 'escuelas_por_1000_hab', label: 'Cobertura Educativa (x1000)', icon: School, desc: 'Cantidad de escuelas disponibles por cada 1000 habitantes.' },
  { key: 'paradas_por_1000_hab', label: 'Cobertura de Transporte (x1000)', icon: Bus, desc: 'Cantidad de paradas de colectivo por cada 1000 habitantes.' },
  { key: 'dispensarios_municipales', label: 'Dispensarios Municipales', icon: Activity, desc: 'Cantidad de centros de atención primaria de salud municipal.' },
  { key: 'comisarias', label: 'Comisarías', icon: Shield, desc: 'Dependencias policiales en el territorio.' }
];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVariable, setActiveVariable] = useState(VARIABLES[0]);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    loadData().then(parsedData => {
      setData(parsedData);
      setLoading(false);
    });
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        activeVariable={activeVariable}
        setActiveVariable={setActiveVariable}
        variables={VARIABLES}
      />
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', position: 'relative' }}>
        {loading ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 2
          }}>
            <CircularProgress />
            <Typography>Cargando datos espaciales...</Typography>
          </Box>
        ) : (
          <Map data={data} activeVariable={activeVariable} />
        )}
      </Box>

      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
    </Box>
  );
}

export default App;
