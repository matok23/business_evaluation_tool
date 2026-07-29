import {
    useEffect,
    useState,
    type FormEvent,
} from 'react';

import {
    Link,
    Navigate,
    useNavigate,
    useParams,
} from 'react-router';

import { industryService } from '../api/asset_service';
import { useBusiness } from '../hooks/useBusinessSingle';
import type { Industry } from '../contracts/business';
import type { UpdateBusinessPayload } from '../contracts/business';

type BusinessFormState = {
    name: string;
    industryId: string;
    annualRevenue: string;
    ebitda: string;
    cash: string;
    interestBearingDebt: string;
    yearsInBusiness: string;
    employeeCount: string;
    revenueGrowthPercent: string;
    recurringRevenuePercent: string;
    largestCustomerRevenuePercent: string;
};

const emptyForm: BusinessFormState = {
    name: '',
    industryId: '',
    annualRevenue: '',
    ebitda: '',
    cash: '',
    interestBearingDebt: '',
    yearsInBusiness: '',
    employeeCount: '',
    revenueGrowthPercent: '',
    recurringRevenuePercent: '',
    largestCustomerRevenuePercent: '',
};

function toInputValue(
    value: string | number | null | undefined
): string {
    if (value === null || value === undefined) {
        return '';
    }

    return String(value);
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error
        ? error.message
        : 'Something went wrong';
}

export default function EditBusinessPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const businessId = Number(id);
    const isValidBusinessId =
        Number.isInteger(businessId) && businessId > 0;

    const {
        business,
        isLoading,
        isSaving,
        error: businessError,
        updateBusiness,
    } = useBusiness(businessId);

    const [form, setForm] =
        useState<BusinessFormState>(emptyForm);

    const [industries, setIndustries] =
        useState<Industry[]>([]);

    const [isLoadingIndustries, setIsLoadingIndustries] =
        useState(true);

    const [industryError, setIndustryError] =
        useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadIndustries() {
            setIsLoadingIndustries(true);
            setIndustryError('');

            try {
                const result = await industryService.getAll();

                if (!isMounted) {
                    return;
                }

                setIndustries(
                    Array.isArray(result) ? result : []
                );

                if (!Array.isArray(result)) {
                    setIndustryError(
                        'The industries response is not an array'
                    );
                }
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setIndustries([]);
                setIndustryError(getErrorMessage(error));
            } finally {
                if (isMounted) {
                    setIsLoadingIndustries(false);
                }
            }
        }

        void loadIndustries();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!business) {
            return;
        }

        setForm({
            name: toInputValue(business.name),
            industryId: toInputValue(business.industryId),

            annualRevenue: toInputValue(
                business.annualRevenue
            ),

            ebitda: toInputValue(business.ebitda),
            cash: toInputValue(business.cash),

            interestBearingDebt: toInputValue(
                business.interestBearingDebt
            ),

            yearsInBusiness: toInputValue(
                business.yearsInBusiness
            ),

            employeeCount: toInputValue(
                business.employeeCount
            ),

            revenueGrowthPercent: toInputValue(
                business.revenueGrowthPercent
            ),

            recurringRevenuePercent: toInputValue(
                business.recurringRevenuePercent
            ),

            largestCustomerRevenuePercent: toInputValue(
                business.largestCustomerRevenuePercent
            ),
        });
    }, [business]);

    function updateField(
        field: keyof BusinessFormState,
        value: string
    ) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const payload: UpdateBusinessPayload = {
            name: form.name.trim(),
            industryId: Number(form.industryId),
            annualRevenue: Number(form.annualRevenue),
            ebitda: Number(form.ebitda),
            cash: Number(form.cash),

            interestBearingDebt: Number(
                form.interestBearingDebt
            ),

            yearsInBusiness: Number(
                form.yearsInBusiness
            ),

            employeeCount: Number(
                form.employeeCount
            ),

            revenueGrowthPercent: Number(
                form.revenueGrowthPercent
            ),

            recurringRevenuePercent: Number(
                form.recurringRevenuePercent
            ),

            largestCustomerRevenuePercent: Number(
                form.largestCustomerRevenuePercent
            ),
        };

        try {
            await updateBusiness(payload);

            navigate('/dashboard', {
                replace: true,
            });
        } catch {
            // The hook exposes the error through businessError.
        }
    }

    if (!isValidBusinessId) {
        return <Navigate to="/dashboard" replace />;
    }

    if (isLoading) {
        return (
            <div className="dashboard-status">
                Loading business…
            </div>
        );
    }

    if (!business) {
        return (
            <div className="dashboard-status dashboard-error">
                {businessError || 'Business not found'}
            </div>
        );
    }

    const error = businessError || industryError;

    return (
        <section className="business-form-page">
            <div className="business-form-heading">
                <div>
                    <h2>Edit {business.name}</h2>

                    <p>
                        Saving changes will create a new valuation.
                    </p>
                </div>

                <Link
                    className="button button-secondary"
                    to="/dashboard"
                >
                    Cancel
                </Link>
            </div>

            <form
                className="business-form"
                onSubmit={handleSubmit}
            >
                {error && (
                    <div
                        className="dashboard-inline-error"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                <div className="business-form-grid">
                    <label className="business-form-full">
                        Business name

                        <input
                            type="text"
                            value={form.name}
                            maxLength={255}
                            required
                            onChange={(event) =>
                                updateField(
                                    'name',
                                    event.target.value
                                )
                            }
                        />
                    </label>

                    <label className="business-form-full">
                        Industry

                        <select
                            value={form.industryId}
                            required
                            disabled={isLoadingIndustries}
                            onChange={(event) =>
                                updateField(
                                    'industryId',
                                    event.target.value
                                )
                            }
                        >
                            <option value="">
                                {isLoadingIndustries
                                    ? 'Loading industries…'
                                    : 'Select an industry'}
                            </option>

                            {industries.map((industry) => (
                                <option
                                    key={industry.id}
                                    value={String(industry.id)}
                                >
                                    {industry.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Annual revenue

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.annualRevenue}
                            required
                            onChange={(event) =>
                                updateField(
                                    'annualRevenue',
                                    event.target.value
                                )
                            }
                        />
                    </label>

                    <label>
                        EBITDA

                        <input
                            type="number"
                            step="0.01"
                            value={form.ebitda}
                            required
                            onChange={(event) =>
                                updateField(
                                    'ebitda',
                                    event.target.value
                                )
                            }
                        />
                    </label>

                    <label>
                        Cash

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.cash}
                            required
                            onChange={(event) =>
                                updateField(
                                    'cash',
                                    event.target.value
                                )
                            }
                        />
                    </label>

                    <label>
                        Interest-bearing debt

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.interestBearingDebt}
                            required
                            onChange={(event) =>
                                updateField(
                                    'interestBearingDebt',
                                    event.target.value
                                )
                            }
                        />
                    </label>

                    <label>
                        Years in business

                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={form.yearsInBusiness}
                            required
                            onChange={(event) =>
                                updateField(
                                    'yearsInBusiness',
                                    event.target.value
                                )
                            }
                        />
                    </label>

                    <label>
                        Employee count

                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={form.employeeCount}
                            required
                            onChange={(event) =>
                                updateField(
                                    'employeeCount',
                                    event.target.value
                                )
                            }
                        />
                    </label>

                    <label>
                        Revenue growth %

                        <input
                            type="number"
                            step="0.01"
                            value={form.revenueGrowthPercent}
                            required
                            onChange={(event) =>
                                updateField(
                                    'revenueGrowthPercent',
                                    event.target.value
                                )
                            }
                        />
                    </label>

                    <label>
                        Recurring revenue %

                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={form.recurringRevenuePercent}
                            required
                            onChange={(event) =>
                                updateField(
                                    'recurringRevenuePercent',
                                    event.target.value
                                )
                            }
                        />
                    </label>

                    <label>
                        Largest customer revenue %

                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={
                                form.largestCustomerRevenuePercent
                            }
                            required
                            onChange={(event) =>
                                updateField(
                                    'largestCustomerRevenuePercent',
                                    event.target.value
                                )
                            }
                        />
                    </label>
                </div>

                <div className="business-form-actions">
                    <Link
                        className="button button-secondary"
                        to="/dashboard"
                    >
                        Cancel
                    </Link>

                    <button
                        className="button button-primary"
                        type="submit"
                        disabled={
                            isSaving ||
                            isLoadingIndustries ||
                            industries.length === 0
                        }
                    >
                        {isSaving
                            ? 'Saving…'
                            : 'Save changes'}
                    </button>
                </div>
            </form>
        </section>
    );
}