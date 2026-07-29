import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { businessService } from '../api/business_service';
import type { Business } from '../contracts/business';

type BusinessAction = {
  businessId: number;
  type: 'delete' | 'reevaluate';
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
}

export function useBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeAction, setActiveAction] =
    useState<BusinessAction | null>(null);

  const loadBusinesses = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await businessService.getAll();
      setBusinesses(data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBusinesses();
  }, [loadBusinesses]);

  const deleteBusiness = useCallback(
    async (businessId: number) => {
      setActiveAction({
        businessId,
        type: 'delete',
      });

      setError('');

      try {
        await businessService.delete(businessId);

        setBusinesses((currentBusinesses) =>
          currentBusinesses.filter(
            (business) => business.id !== businessId
          )
        );
      } catch (error) {
        setError(getErrorMessage(error));
        throw error;
      } finally {
        setActiveAction(null);
      }
    },
    []
  );

  const reevaluateBusiness = useCallback(
    async (businessId: number) => {
      setActiveAction({
        businessId,
        type: 'reevaluate',
      });

      setError('');

      try {
        const updatedBusiness =
          await businessService.reevaluate(businessId);

        setBusinesses((currentBusinesses) =>
          currentBusinesses.map((business) =>
            business.id === businessId
              ? updatedBusiness
              : business
          )
        );
      } catch (error) {
        setError(getErrorMessage(error));
        throw error;
      } finally {
        setActiveAction(null);
      }
    },
    []
  );

  return {
    businesses,
    isLoading,
    error,
    activeAction,
    reload: loadBusinesses,
    deleteBusiness,
    reevaluateBusiness,
  };
}