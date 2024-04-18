"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/service/authentication/AuthProvider";
import DashboardAdmin from "./Admin";
import Login from "./Login";

export default function Page() {
  const { auth, err, LogOut, isLogin } = useContext(AuthContext);

  return (
    <>
      <div className="relative w-full h-screen min-h-fit flex flex-col items-center justify-start">
        <div>
          {!isLogin && (
            <section className="w-dvw h-dvh flex justify-center items-center ">
              <Login></Login>
            </section>
          )}
          {isLogin && auth.admin && <DashboardAdmin />}
        </div>
      </div>
    </>
  );
}
