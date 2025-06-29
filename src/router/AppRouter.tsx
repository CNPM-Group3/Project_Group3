// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import AuthLayout from '../components/Protect/AuthLayout';
// import MainLayout from '../components/Protect/MainLayout';
// import ProtectedRoute from '../components/Protect/ProtectedRoute';
// import SignInPage from '../pages/SignInPage';
// import DashboardPage from '../pages/DashboardPage';
// import SignUpPage from '../pages/SignUpPage';
// import HomePage from '../pages/HomePage';
// import AboutPage from '../pages/AboutPage';
// import FeaturesPage from '../pages/FeaturesPage';
// import ContactPage from '../pages/ContactPage';
// import PricingPage from '../pages/PricingPage';

// const AppRouter: React.FC = () => {
//   return (
//     <Routes>
//       {/* Auth Routes */}
//       <Route element={<AuthLayout />}>
//         <Route path="/signin" element={<SignInPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//       </Route>

//       {/* Main Layout Routes */} 
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/features" element={<FeaturesPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/pricing" element={<PricingPage />} />
        
//         {/* Protected Routes */}
//         <Route path="/Dashboard" element={
//           <ProtectedRoute action="read" subject="Dashboard">
//             <DashboardPage />
//           </ProtectedRoute>
//         } />
        

         
//       </Route>

//       {/* Error Pages */}
 
//     </Routes>
//   );
// };

// export default AppRouter;
