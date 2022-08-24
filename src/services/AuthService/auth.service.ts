import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize } from "serializr";
import { User } from "../../models/user.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { useState } from "react";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppRoutes, NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const UserService = () => {
	const navigate = useNavigate();

	const [error, setError] = useState<Error>();

	const [loading, setLoading] = useState(false);

	const { setAuthenticated, unauthenticate } = AuthContext();

	const loginUser = (data: User) => {
		setLoading(true);
		const payload = {user : data}
		return axiosInstance
			.post(ApiRoutes.USER_LOGIN, payload)
			.then((response) => {
				const user = deserialize(User, response.data["user"]);
				Notification({
					message: "Login",
					description: "Logged in successfully",
					type: NotificationTypes.SUCCESS,
				});
				setAuthenticated(user);
				window.localStorage.setItem('isLoggedIn','true');
				navigate(AppRoutes.HOME);
			})
			.catch((error) => {
				Notification({
					message: "Login failed",
					description: "incorrect email or password",
					type: NotificationTypes.ERROR,
				});
			
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const logoutUser = () => {
		setLoading(true);
		try{
			unauthenticate();
			navigate(NavigationRoutes.LOGIN);
			window.localStorage.removeItem('isLoggedIn');
			
		}
		catch (error:any) {
			
			Notification({
				message: "Logout",
				description: "Logged failed! ",
				type: NotificationTypes.ERROR,
			});
			setError(error);
		}
		finally{
			setLoading(false);
		};
	} 
	return {
		error,
		loading,
		loginUser,
		logoutUser
	};
};

export default UserService;
