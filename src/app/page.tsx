"use client";

import { useGoogleOneTapLogin, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  const sendTokenToBackend = async (token: string) => {
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.error("Backend Error:", data.message);
      }
    } catch (error) {
      console.error("Error sending token:", error);
    }
  };

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      if (credentialResponse.credential) {
        sendTokenToBackend(credentialResponse.credential);
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
    },
  });

  return (
    <div
      style={{
        backgroundImage: "url(/authBgImage.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backdropFilter: "blur(1px)",
      }}
      className="flex justify-center items-center h-screen bg-gray-100"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-black">Naye Pankh Foundation</h2>
        <p className="text-gray-600 mt-2">Enter the portal</p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              sendTokenToBackend(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default Home;
