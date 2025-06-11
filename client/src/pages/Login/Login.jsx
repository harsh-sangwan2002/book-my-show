import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/user'

const Login = () => {
    const [messageApi, contentHolder] = message.useMessage();
    const navigate = useNavigate();

    const login = async (values) => {
        try {
            const response = await loginUser(values);
            const data = response.data;
            const token = data.token;
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

    return (
        <>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1 style={{ fontSize: '2.3rem' }}>Login to BookMyShow</h1>
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
