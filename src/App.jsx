import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeatherHome from './pages/WeatherHome';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherHome />
    </QueryClientProvider>
  );
}

export default App;
