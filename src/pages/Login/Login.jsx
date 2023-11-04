import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {

    const { signIn, googleSignIn, facebookSignIn } = useContext(AuthContext);
    const location = useLocation()
    console.log(location)
    const navigate = useNavigate()


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(location.state ? location.state : '/')
            })
            .catch(error => console.log(error));
    }


    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result)
            })
            .catch(error => console.error(error))
    }

    const handleFacebook = () => {
        facebookSignIn()
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' required placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' required placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <div className='text-center space-y-2'>
                            <p>Or Sign In with</p>
                            <div className='flex gap-3 justify-center'>
                                <button onClick={handleFacebook} className='btn btn-circle bg-white text-2xl text-blue-600'><FaFacebook></FaFacebook></button>
                                <button className='btn btn-circle text-2xl text-blue-600 bg-white'><FaLinkedinIn></FaLinkedinIn></button>
                                <button onClick={handleGoogle} className='btn bg-white btn-circle text-2xl'><FcGoogle></FcGoogle></button>
                            </div>
                            <h2>Have an account? <Link to='/signUp' className='text-[#FF3811] font-bold'>Register</Link></h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;