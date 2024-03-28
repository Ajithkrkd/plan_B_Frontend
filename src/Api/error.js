import toast from 'react-hot-toast'



const errorHandle =(AxiosError) =>{
    const axiosError = AxiosError;

    if(axiosError.response?.data  && axiosError.response){

        if(axiosError && axiosError.response.data.message === 'You are blocked by Admin'){
            localStorage.clear();
            location.href('/login')
            throw(axiosError);
        }
        else {
            console.log('Error response has no message');
            throw(axiosError)
        }
    }
    else {
        toast.error('An error occurred. Please try again!');
        throw(axiosError)
    }
}
export default errorHandle;