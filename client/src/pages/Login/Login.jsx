import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/user'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/userSlice'
import { useEffect } from 'react'

const Login = () => {
    const [messageApi, contentHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (values) => {
        try {
            const response = await loginUser(values);
            const data = response.data;
            const user = data.user
            const token = data.token;
            dispatch(setUser({ user }));
            if (data.success) {
                messageApi.open({
                    type: "success",
                    content: data.message
                })
                localStorage.setItem('token', token);
                navigate('/')
            } else {
                messageApi.open({
                    type: "error",
                    content: data.message
                })
            }
        } catch (err) {
            console.log(err);
            messageApi.open({
                type: "error",
                content: "Login Failed"
            })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1 style={{ fontSize: '2.3rem', marginBottom: '2rem' }}>Login to BookMyShow</h1>
                    </section>
                    <section className="right-section">
                        {contentHolder}
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
                        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
