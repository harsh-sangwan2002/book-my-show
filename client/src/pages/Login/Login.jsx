import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { loginUser } from '../../api/user'

const Login = () => {
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const login = async (values) => {
        try {
            const response = await loginUser(values);
            const data = response.data;
            const token = data.token;
            if (data.success) {
                setMessage(data.message);
                setIsError(false);
                localStorage.setItem('token', token);
            } else {
                setMessage(data.message || 'Login failed');
                setIsError(true);
            }
        } catch (err) {
            console.log(err);
            setMessage('Something went wrong');
            setIsError(true);
        } finally {
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }

    return (
        <>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1 style={{ fontSize: '2.3rem' }}>Login to BookMyShow</h1>
                    </section>
                    <section className="right-section">
                        {message && (
                            <div style={{
                                marginBottom: '1rem',
                                padding: '10px',
                                color: isError ? '#ff4d4f' : '#52c41a',
                                background: isError ? '#fff1f0' : '#f6ffed',
                                border: `1px solid ${isError ? '#ffa39e' : '#b7eb8f'}`,
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}>
                                {message}
                            </div>
                        )}
                        <Form layout='vertical' onFinish={login}>
                            <Form.Item
                                name="email"
                                label="Email"
                                className='d-block'
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input type="email" placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                className='d-block'
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input type="password" placeholder="Password" />
                            </Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                block
                                style={{ fontSize: '1rem', fontWeight: '500' }}
                            >
                                Login
                            </Button>
                        </Form>
                        <div>
                            <p>
                                New user? <Link to="/register">Register</Link>
                            </p>
                            <p>
                                Forgot Passowrd? <Link to="/forgot-password">Click Here</Link>
                            </p>
                        </div>
                    </section>
                </main>
            </header>
        </>
    )
}

export default Login
