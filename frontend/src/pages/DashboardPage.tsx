import BusinessCard from '../components/BusinessCard';
import { useBusinesses } from '../hooks/useBusinesses';

export default function DashboardPage() {
    const {
        businesses,
        isLoading,
        error,
        activeAction,
        reload,
        deleteBusiness,
        reevaluateBusiness,
    } = useBusinesses();

    if (isLoading) {
        return (
            <div className="dashboard-status">
                Loading businesses…
            </div>
        );
    }

    if (error && businesses.length === 0) {
        return (
            <div className="dashboard-status dashboard-error">
                <p>{error}</p>

                <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => void reload()}
                >
                    Try again
                </button>
            </div>
        );
    }

    if (businesses.length === 0) {
        return (
            <div className="dashboard-empty-state">
                <h2>No businesses yet</h2>

                <p>
                    Create your first business to calculate its
                    valuation.
                </p>
            </div>
        );
    }

    return (
        <section>
            {error && (
                <div className="dashboard-inline-error">
                    {error}
                </div>
            )}

            <div className="business-grid">
                {businesses.map((business) => (
                    <BusinessCard
                        key={business.id}
                        business={business}
                        isDeleting={
                            activeAction?.businessId === business.id &&
                            activeAction.type === 'delete'
                        }
                        isReevaluating={
                            activeAction?.businessId === business.id &&
                            activeAction.type === 'reevaluate'
                        }
                        onDelete={deleteBusiness}
                        onReevaluate={reevaluateBusiness}
                    />
                ))}
            </div>
        </section>
    );
}