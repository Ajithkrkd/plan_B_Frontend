import toast from 'react-hot-toast'



const errorHandle =(AxiosError) =>{
    const axiosError = AxiosError;

    if(axiosError.response?.data  && axiosError.response){

        const errorResponse = axiosError.response.data;

        if(errorResponse.message === 'You are blocked by Admin'){
            localStorage.clear();
            location.href('/login')
            toast.error(errorResponse.message);
        }
        else {
            console.log('Error response has no message');
            throw(axiosError)
        }
    }
    else {
        toast.error('An error occurred. Please try again!');
        console.log(axiosError.message);
        throw(axiosError)
    }
}
export default errorHandle;