import { useEffect, useState } from 'react';
import { businessService } from '../api/business_service';
import type {
  Business,
  UpdateBusinessPayload,
} from '../contracts/business';

export function useBusiness(id: number) {
  const [business, setBusiness] =
    useState<Business | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBusiness() {
      setIsLoading(true);
      setError('');

      try {
        const data = await businessService.getById(id);
        setBusiness(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Could not load business'
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadBusiness();
  }, [id]);

  async function updateBusiness(
    payload: UpdateBusinessPayload
  ) {
    setIsSaving(true);
    setError('');

    try {
      const updatedBusiness =
        await businessService.update(id, payload);

      setBusiness(updatedBusiness);

      return updatedBusiness;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Could not update business'
      );

      throw error;
    } finally {
      setIsSaving(false);
    }
  }

  return {
    business,
    isLoading,
    isSaving,
    error,
    updateBusiness,
  };
}