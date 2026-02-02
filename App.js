
// // import React, { useState, useEffect } from 'react';
// // import { View } from 'react-native';
// // import SplashScreen from './src/Screens/SplashScreen';
// // import SignUpScreen from './src/Screens/SignUpScreen';
// // import LoginScreen from './src/Screens/Login';
// // import Dashboard from './src/Screens/LogWorkout';
// // import { initDatabase, checkUserSession } from './src/Services/Database';

// // const App = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [hasAccount, setHasAccount] = useState(true); 

// //   useEffect(() => {
// //     initDatabase(); 
    

// //     setTimeout(() => {
// //       checkUserSession((status) => {
// //         setIsLoggedIn(status);
// //         setIsLoading(false);
// //       });
// //     }, 3000);
// //   }, []);

// //   if (isLoading) {
// //     return <SplashScreen />;
// //   }

 
// //   if (isLoggedIn) {
// //     return <Dashboard />;
// //   }

// //   if (!hasAccount) {
// //     return <SignUpScreen onSignUpSuccess={() => setHasAccount(true)} />;
// //   } else {
// //     return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} onGoToSignUp={() => setHasAccount(false)} />;
// //   }
// // };

// // export default App;



// import React, { useState, useEffect } from 'react';
// import SplashScreen from './src/Screens/SplashScreen';
// import SignUpScreen from './src/Screens/SignUpScreen';
// import LoginScreen from './src/Screens/Login';
// import Dashboard from './src/Screens/LogWorkout';
// import { initDatabase, checkUserSession } from './src/Services/Database';

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [hasAccount, setHasAccount] = useState(false); 

//   useEffect(() => {
//     initDatabase(); 

//     setTimeout(() => {
//       checkUserSession((status) => {
//         setIsLoggedIn(status);
//         setIsLoading(false);
//         if (status) setHasAccount(true);
//       });
//     }, 3000);
//   }, []);

//   if (isLoading) {
//     return <SplashScreen />;
//   }

  
//   if (isLoggedIn) {
//     return <Dashboard />;
//   }


//   if (!hasAccount) {
//     return <SignUpScreen onSignUpSuccess={() => setHasAccount(true)} />;
//   } 
  
  
//   return (
//     <LoginScreen 
//       onLoginSuccess={() => setIsLoggedIn(true)} 
//       onGoToSignUp={() => setHasAccount(false)} 
//     />
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import SplashScreen from './src/Screens/SplashScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import LoginScreen from './src/Screens/Login';
import MainContainer from './src/Navigation/MainContainer'; 
import { initDatabase, checkUserSession } from './src/Services/Database';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false); 

  useEffect(() => {
    initDatabase(); 

    setTimeout(() => {
      checkUserSession((status) => {
        setIsLoggedIn(status);
        setIsLoading(false);
        if (status) setHasAccount(true);
      });
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

 
  if (isLoggedIn) {
    return <MainContainer />; 
  }

  
  if (!hasAccount) {
    return <SignUpScreen onSignUpSuccess={() => setHasAccount(true)} />;
  } 
  
  
  return (
    <LoginScreen 
      onLoginSuccess={() => setIsLoggedIn(true)} 
      onGoToSignUp={() => setHasAccount(false)} 
    />
  );
};

export default App;