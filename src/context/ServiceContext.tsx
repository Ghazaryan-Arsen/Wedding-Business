'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ServiceContextType {
  selectedServiceIds: string[];
  toggleService: (id: string) => void;
  selectService: (id: string) => void;
  deselectService: (id: string) => void;
  clearSelections: () => void;
  isServiceSelected: (id: string) => boolean;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['photo-1', 'venue-1']);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('weddingday_selected_services');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedServiceIds(parsed);
        }
      }
    } catch {
      // Fallback to default
    }
  }, []);

  const saveSelections = (ids: string[]) => {
    setSelectedServiceIds(ids);
    try {
      localStorage.setItem('weddingday_selected_services', JSON.stringify(ids));
    } catch {
      // Ignore
    }
  };

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      saveSelections(selectedServiceIds.filter((item) => item !== id));
    } else {
      saveSelections([...selectedServiceIds, id]);
    }
  };

  const selectService = (id: string) => {
    if (!selectedServiceIds.includes(id)) {
      saveSelections([...selectedServiceIds, id]);
    }
  };

  const deselectService = (id: string) => {
    saveSelections(selectedServiceIds.filter((item) => item !== id));
  };

  const clearSelections = () => {
    saveSelections([]);
  };

  const isServiceSelected = (id: string) => selectedServiceIds.includes(id);

  return (
    <ServiceContext.Provider
      value={{
        selectedServiceIds,
        toggleService,
        selectService,
        deselectService,
        clearSelections,
        isServiceSelected,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};
