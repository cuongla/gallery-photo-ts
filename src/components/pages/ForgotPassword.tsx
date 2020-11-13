import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../shared/Input';
import Button from '../shared/Button';
import Message from '../shared/Message';
import { sendPasswordResetEmail, setError, setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState("");    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { error, success } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''));
            }
            if(success) {
                dispatch(setSuccess(''));
            }
        }
    }, [error, success, dispatch]);


    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(sendPasswordResetEmail(email, "Email sent!"));
        setLoading(false);
    }

    return (
        <section className="section">
            <div className="container">
                <h2 className="has-text-centered is-size-2 mb-3">Reset Password</h2>
                <form
                    className="form"
                    onSubmit={submitHandler}>
                    {error && <Message type="danger" msg={error} />}
                    {success && <Message type="success" msg={success} />}
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email Address"
                        label="Email Address"
                    />
                    <Button 
                        text={loading ? "Loading..." : "Send Request"} 
                        className="is-primary is-fullwidth mt-5"
                        disabled={loading}    
                    />
                </form>
            </div>
        </section>
    )
}

export default ForgotPassword;

