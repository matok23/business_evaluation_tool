import {
    useState,
    type FormEvent,
} from 'react';

import {
    Link,
    useNavigate,
} from 'react-router';

import { useAuth } from '../auth/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
            await register({
                email,
                password,
                passwordConfirmation
            });

            navigate('/dashboard', {
                replace: true,
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Registration failed'
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

                    <h1>Create account</h1>

                    <p>
                        Register to create and manage business
                        valuations.
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
                            autoComplete="new-password"
                            placeholder="Create a password"
                            minLength={8}
                            required
                        />
                    </label>

                    <label>
                        Repeat Password
                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={(event) =>
                                setPasswordConfirmation(event.target.value)
                            }
                            autoComplete="new-password"
                            placeholder="Create a password"
                            minLength={8}
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
                        {isSubmitting
                            ? 'Creating account…'
                            : 'Create account'}
                    </button>
                </form>

                <p className="auth-switch">
                    Already registered?{' '}
                    <Link to="/login">Log in</Link>
                </p>
            </section>
        </main>
    );
}