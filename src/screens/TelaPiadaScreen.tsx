
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchJoke, Joke } from './TelaPiada';

export default function TelaPiadaScreen() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchJoke = async () => {
    setLoading(true);
    try {
      const data = await fetchJoke();
      setJoke(data);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleFetchJoke} disabled={loading}>
        <Text style={styles.buttonText}>Ver piada</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

      {joke && (
        <View style={styles.jokeContainer}>
          {joke.type === 'single' && <Text style={styles.jokeText}>{joke.joke}</Text>}
          {joke.type === 'twopart' && (
            <>
              <Text style={styles.jokeText}>{joke.setup}</Text>
              <Text style={styles.jokeText}>{joke.delivery}</Text>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16 },
  jokeContainer: { marginTop: 30, alignItems: 'center' },
  jokeText: { fontSize: 18, textAlign: 'center', marginVertical: 8 },
});
