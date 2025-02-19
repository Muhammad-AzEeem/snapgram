// == step 5 create comp
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const isAuthenicated = false;
  return (
    <>
      {isAuthenicated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src="/public/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
}

// == step 6 in SingupForm
