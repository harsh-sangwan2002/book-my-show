import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { loginUser } from '../../api/user'

const Login = () => {

    const login = async (values) => {
        try {
            const response = await loginUser(values);
            const data = response.data;
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Login to BookMyShow</h1>
                    </section>
                    <section className="right-section">
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
                        </div>
                    </section>
                </main>
            </header>
        </>
    )
}

export default Login
