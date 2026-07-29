import {
    useState,
    type FormEvent,
} from 'react';

import {
    Link,
    useLocation,
    useNavigate,
} from 'react-router';

import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError('');
        setIsSubmitting(true);

        try {
            await login({
                email,
                password,
            });

            const state = location.state as
                | { from?: string; }
                | null;

            navigate(state?.from ?? '/dashboard', {
                replace: true,
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Login failed'
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-heading">
                    <p className="eyebrow">
                        Business Evaluation Tool
                    </p>

                    <h1>Welcome back</h1>

                    <p>
                        Log in to manage your business valuations.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            autoComplete="email"
                            placeholder="you@example.com"
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                        />
                    </label>

                    {error && (
                        <p className="form-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        className="button button-primary button-full"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in…' : 'Log in'}
                    </button>
                </form>

                <p className="auth-switch">
                    No account yet?{' '}
                    <Link to="/register">Create one</Link>
                </p>
            </section>
        </main>
    );
}