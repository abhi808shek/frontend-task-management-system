import AXIOS from "../../../services/axios";

const Auth = {
  loginApi: async (data: { email: string; password: string }) => {
    const endpoint = "/auth/login";
    const response = await AXIOS.post(endpoint, data);
    return response.data;
  },
  signupApi: async (data: { name: string; email: string; password: string }) => {
    const endpoint = "/auth/signup";
    const response = await AXIOS.post(endpoint, data);
    return response.data;
  },
};
export default Auth;