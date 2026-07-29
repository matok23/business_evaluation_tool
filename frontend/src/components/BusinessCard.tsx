import BusinessValuationChart from './BusinessValuationChart';
import type {
    Business,
    Valuation,
} from '../contracts/business';
import { Link } from 'react-router';

type BusinessCardProps = {
    business: Business;
    isDeleting: boolean;
    isReevaluating: boolean;
    onDelete: (businessId: number) => Promise<void>;
    onReevaluate: (businessId: number) => Promise<void>;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
});

function getLatestValuation(
    valuations: Valuation[]
): Valuation | null {
    if (valuations.length === 0) {
        return null;
    }

    return valuations.reduce((latest, valuation) => {
        const latestTime = new Date(latest.createdAt).getTime();
        const valuationTime = new Date(
            valuation.createdAt
        ).getTime();

        return valuationTime > latestTime
            ? valuation
            : latest;
    });
}

export default function BusinessCard({
    business,
    isDeleting,
    isReevaluating,
    onDelete,
    onReevaluate,
}: BusinessCardProps) {
    const latestValuation = getLatestValuation(
        business.valuations
    );

    const isBusy = isDeleting || isReevaluating;

    async function handleDelete() {
        const shouldDelete = window.confirm(
            `Delete "${business.name}"? This cannot be undone.`
        );

        if (!shouldDelete) {
            return;
        }

        await onDelete(business.id);
    }

    async function handleReevaluate() {
        await onReevaluate(business.id);
    }

    return (
        <article className="business-card">
            <div className="business-card-heading">
                <div>
                    <h2>{business.name}</h2>

                    <div className="business-valuation">
                        <span>Current Valuation</span>

                        {latestValuation ? (
                            <strong>
                                {currencyFormatter.format(
                                    latestValuation.lower
                                )}
                                {' - '}
                                {currencyFormatter.format(
                                    latestValuation.upper
                                )}
                            </strong>
                        ) : (
                            <strong>Not evaluated</strong>
                        )}
                    </div>
                </div>

                <div className="business-actions">
                    <Link
                        className="button button-secondary"
                        to={`/businesses/${business.id}/edit`}
                    >
                        Edit
                    </Link>

                    <button
                        className="button button-secondary"
                        type="button"
                        onClick={handleReevaluate}
                        disabled={isBusy}
                    >
                        {isReevaluating
                            ? 'Evaluating…'
                            : 'Reevaluate'}
                    </button>

                    <button
                        className="button button-danger"
                        type="button"
                        onClick={handleDelete}
                        disabled={isBusy}
                    >
                        {isDeleting ? 'Deleting…' : 'Delete'}
                    </button>
                </div>
            </div>

            <BusinessValuationChart
                valuations={business.valuations}
            />
        </article>
    );
}