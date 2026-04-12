import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCases, fetchStations, isSupabaseConfigured } from '../lib/supabase';
import { getEnrichedCases, demoStations } from '../lib/demoData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [cases, setCases] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsingRealData, setIsUsingRealData] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      if (isSupabaseConfigured()) {
        try {
          const { data: caseData, error: caseError } = await fetchCases();
          const { data: stationData, error: stationError } = await fetchStations();
          
          if (!caseError && !stationError) {
            // Map Supabase structure to match the frontend expectations (demoData structure)
            const mappedCases = caseData.map(c => ({
              ...c,
              station: c.fir?.police_stations || c.officers?.police_stations || {},
            }));
            
            setCases(mappedCases);
            setStations(stationData);
            setIsUsingRealData(true);
          } else {
            console.warn('Database error, falling back to demo data:', caseError || stationError);
            useDemo();
          }
        } catch (err) {
          console.error('Failed to load real data:', err);
          useDemo();
        }
      } else {
        useDemo();
      }
      setLoading(false);
    }

    function useDemo() {
      setCases(getEnrichedCases());
      setStations(demoStations);
      setIsUsingRealData(false);
    }

    loadData();
  }, []);

  const refresh = async () => {
    if (isSupabaseConfigured()) {
      const { data } = await fetchCases();
      if (data) setCases(data);
    }
  };

  return (
    <DataContext.Provider value={{ cases, stations, loading, isUsingRealData, refresh }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
