import { createApiClient } from '@cross-platform-ts-starter/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Card,
  IconButton,
  MD3Colors,
  Provider as PaperProvider,
  Paragraph,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { env } from './env';
import { theme } from './theme';

const apiClient = createApiClient(env.API_BASE_URL);

function App(): React.JSX.Element {
  // Use TanStack Query to fetch health data
  const { isLoading, isError, error } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await apiClient.get<boolean>('/api/health');
      return response.data;
    },
  });

  const paperTheme = useTheme();

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <View style={styles.introSection}>
            <View style={styles.iconContainer}>
              <IconButton
                icon="code-tags"
                size={26}
                iconColor={paperTheme.colors.primary}
                style={styles.codeIcon}
              />
            </View>
            <Text style={styles.title}>Cross-Platform TS Starter</Text>
            <Text style={styles.subtitle}>
              Includes React Native, Paper UI, TanStack Query, Axios, and more.
            </Text>
          </View>

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.cardTitle}>Backend Connection</Title>
              <Paragraph style={styles.cardParagraph}>
                Checking connection to your API...
              </Paragraph>

              <View style={styles.statusContainer}>
                {isLoading ? (
                  <View style={styles.statusIndicator}>
                    <ActivityIndicator
                      size={48}
                      color={paperTheme.colors.primary}
                    />
                    <Text style={styles.statusText}>Connecting...</Text>
                  </View>
                ) : isError ? (
                  <View style={styles.statusIndicator}>
                    <Icon
                      name="alert-circle"
                      size={56}
                      color={MD3Colors.error50}
                    />
                    <Text style={[styles.statusText, styles.errorText]}>
                      Connection failed
                    </Text>
                    <Text style={styles.errorMessage}>
                      {(error as Error).message}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statusIndicator}>
                    <Icon
                      name="check-circle"
                      size={56}
                      color={MD3Colors.tertiary40}
                    />
                    <Text style={[styles.statusText, styles.successText]}>
                      Connected!
                    </Text>
                  </View>
                )}
              </View>
            </Card.Content>
          </Card>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(103, 80, 164, 0.03)', // Light purple background similar to web
    padding: 16,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    marginBottom: 16,
  },
  codeIcon: {
    backgroundColor: 'rgba(103, 80, 164, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6750A4', // Primary color
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#49454F', // Secondary text color
    textAlign: 'center',
    marginHorizontal: 20,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: 8,
  },
  cardContent: {
    padding: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6750A4',
    textAlign: 'center',
  },
  cardParagraph: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#49454F',
  },
  statusContainer: {
    paddingVertical: 24,
  },
  statusIndicator: {
    alignItems: 'center',
    gap: 16,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: MD3Colors.error50,
  },
  errorMessage: {
    fontSize: 14,
    color: '#49454F',
  },
  successText: {
    color: MD3Colors.tertiary40,
    fontWeight: 'bold',
  },
});

export default App;
