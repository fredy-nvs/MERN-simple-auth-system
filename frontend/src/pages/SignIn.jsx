import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useState} from "react";
import axios from "axios";

const SignIn = () => {
	const navigate = useNavigate()
	const [inputValue, setInputValue] = useState({
		email: "",
		password: ""
	})

	const handleChange = (event) => {
		const {name, value} = event.target
		setInputValue({
			...inputValue,
			[name]: value
		})
	}

	const handleError = (error) => {
		toast.error(error, {
			position: "bottom-left"
		})
	}

	const handleSignIn = async (event) => {
		event.preventDefault()
		try {
			const { data } = await axios.post(
				"http://localhost:5000/api/login",
				{...inputValue},
				{withCredentials: true})
			const {success, message} = data

			if (success) {
				setTimeout(() => { navigate("/") }, 1000)
			} else {
				handleError(message)
			}
		} catch (error) {
			console.error(error.message)
		}
		setInputValue({
			...inputValue,
			email: "",
			password: ""
		})
	}

	return (
		<div className="form-container">
			<h2>Sign in</h2>
			<form onSubmit={handleSignIn}>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="name" placeholder="johndoe@example.com" required onChange={handleChange}/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" required onChange={handleChange}/>
				</div>
				<button type="submit">Connect</button>

				<span>No account? <Link to="/register">Create new account here</Link></span>
			</form>
			<ToastContainer />
		</div>
	)
}

export default SignIn