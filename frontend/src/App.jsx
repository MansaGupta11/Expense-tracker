import React from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/usercontext';

const App = () => {
  return (
    <UserProvider>
   <div>
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signUp" exact element={<SignUp />} />
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/income" exact element={<Income />} />
        <Route path="/expense" exact element={<Expense />} />
        <Route path="*" element={<Navigate to ="/" />} />
      </Routes>
    </Router>
   </div>
   </UserProvider>
  )
}

export default App

const Root = () => {
  //check if token is present in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //redirect to dashboard if authenticated
  return isAuthenticated ? (
    <Navigate to="/dashboard"  />
  ) : (
    <Navigate to="/login" />
  );
};