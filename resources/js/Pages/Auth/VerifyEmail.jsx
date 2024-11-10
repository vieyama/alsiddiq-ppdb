import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import Head from '@/Components/Head';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const csrfToken = usePage().props.csrf_token;

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'), {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex items-center justify-between mt-4">
                    <PrimaryButton disabled={processing}>
                        Resend Verification Email
                    </PrimaryButton>
                    <Link
                        className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        href={route('logout')}
                        method="post"
                        as="button"
                        headers={{ 'X-CSRF-TOKEN': csrfToken }}
                    >
                        Logout
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
