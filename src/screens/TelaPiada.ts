export interface Joke {
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
}

export async function fetchJoke(): Promise<Joke> {
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=pt');
  if (!response.ok) throw new Error('Erro ao buscar piada');
  const data = await response.json();
  return data as Joke;
}