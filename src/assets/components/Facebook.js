import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react'
import { useSignIn } from 'react-auth-kit';
import { toast } from 'react-toastify';
import { LoginSocialFacebook } from 'reactjs-social-login';

export default function Facebook() {
  const signIn = useSignIn();

  const onSignIn = async ( params, email )  => {
    try {
      const response = await axios.post("api/user/signin", params);
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: email },
      });
      toast.success("Successfully Logged In", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });

      setInterval(() => {
        window.location.pathname = "/home";
      }, 1000);
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const onSignUp = async ( params, email )  => {
    try {
      await axios.post("api/user/signup", params);
      onSignIn(params, email);
    } catch (err) {
      onSignIn(params, email);
      console.log("Error: ", err)
    }
  }

  const onLogin = async (response) => {
    const params = { email: `${response.provider}.${response.data.email}`, password: `${response.provider}:${response.data.id}` }
    try{
      onSignUp(params, response.email)
    }catch(err){
      console.log('Error: ', err);
    }
  }

  const onError = (error)=>{
    toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
  }

  return (
    <div style={styles.iconContainer}>
      <LoginSocialFacebook appId={process.env.REACT_APP_FACEBOOK_APP_ID} onResolve={(response) => onLogin(response)} onReject={(error)=> onError(error)} >
        <FontAwesomeIcon icon={faFacebookF} color='white' size='lg'/>
      </LoginSocialFacebook>
    </div>
  )
}

const styles = {
  iconContainer: {
    backgroundColor: '#1877f2', // Facebook's blue color
    width: '40px',
    height: '40px',
    borderRadius: '50%', // Makes it rounded
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
