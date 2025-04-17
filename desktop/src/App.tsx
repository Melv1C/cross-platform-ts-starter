import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import ErrorIcon from '@mui/icons-material/Error';
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createApiClient } from '@cross-platform-ts-starter/core';
import { env } from './env';

// You may want to use a .env or config for this
const apiClient = createApiClient(env.VITE_API_BASE_URL);

function App() {
  const {
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await apiClient.get<boolean>('/api/health');
      return response.data;
    },
  });

  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: alpha(theme.palette.primary.main, 0.03),
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
        }}
      >
        {/* Intro section */}
        <Box sx={{ textAlign: 'center', mb: 5, width: '100%' }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CodeIcon color="primary" sx={{ fontSize: 26 }} />
            </Box>
          </Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: -0.5,
              mb: 1,
              background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            Cross-Platform TS Starter
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              maxWidth: 0.85,
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            Includes React, Material UI, TanStack Query, Axios, Zustand, Vitest,
            and more.
          </Typography>
        </Box>

        {/* Connection status card */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
            width: '100%',
            maxWidth: 420,
            mx: 'auto',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
          >
            Backend Connection
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Checking connection to your API...
          </Typography>

          {/* Status indicator */}
          <Box sx={{ py: 3 }}>
            {isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <CircularProgress size={48} color="primary" />
                <Typography variant="body1">Connecting...</Typography>
              </Box>
            ) : isError ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <ErrorIcon color="error" sx={{ fontSize: 56 }} />
                <Typography color="error" variant="h6">
                  Connection failed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {(error as Error).message}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <CheckCircleIcon color="success" sx={{ fontSize: 56 }} />
                <Typography
                  color="success.main"
                  variant="h5"
                  sx={{ fontWeight: 600 }}
                >
                  Connected!
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
