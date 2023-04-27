import { useEffect, useState } from 'react';

import { auth } from '../firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';

import { Navigate } from 'react-router-dom';

export default function Private({ children }) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          };
          localStorage.setItem('@detailUser', JSON.stringify(userData));
          setLoading(false);
          setSigned(true);
        } else {
          setLoading(false);
          setSigned(false);
        }
      });
    }

    checkLogin();
  }, []);

  if(loading) {
    return(
      <div></div>
    )
  } 

  if(!signed) {
    return <Navigate to="/" />
  }
  
  return children;
};
