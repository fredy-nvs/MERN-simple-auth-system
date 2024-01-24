import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";

const SignUp = () => {

	const navigate = useNavigate()
	const [inputValue, setInputValue] = useState({
		email: "",
		name: "",
		password: ""
	});
	//const {email, name, password} = inputValue

	const handleChange = (event) => {
		const {name, value} = event.target
		setInputValue({...inputValue, [name]: value})
	}

	const handleError = (error) => {
		toast.error(error, {
			position: "bottom-left"
		})
	}

	const handleSuccess = (message) => {
		toast.success(message, {
			position: "bottom-left"
		})
	}

	const handleRegistration = async (event) => {
		event.preventDefault()
		try {
			const {data} = await axios.post(
				"http://localhost:5000/api/register",
				{...inputValue},
				{withCredentials: true})

			const {userId, message} = data
			if (userId === undefined) {
				handleError(message)
			} else {
				handleSuccess(message)
				setTimeout(() => { navigate("/") }, 1000)
			}
		} catch (error) {
			console.error(error.message)
		}
		setInputValue({
			...inputValue,
			email: "",
			password: "",
			name: ""
		})
	}

	return (
		<div className="form-container">
			<h2>Create an account</h2>
			<form onSubmit={handleRegistration}>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" placeholder="john@example.com" onChange={handleChange}/>
				</div>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" placeholder="John Doe" onChange={handleChange}/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" name="password" onChange={handleChange}/>
				</div>
				<button type="submit" >Create</button>

				<span>Already have an account? <Link to={"/login"}>Sign in</Link></span>
			</form>
			<ToastContainer />
		</div>
	)
}

export default SignUp