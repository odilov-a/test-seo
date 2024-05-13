import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "components";
import { useHooks } from "hooks";
import { privateRoutes, publicRoutes } from "./data";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import NotFound from "pages/notFound";
import useStore from "store";

const RoutesWrapper = () => {
  const { get } = useHooks();
  const {
    auth: { isLoggedIn },
  } = useStore((state) => state);

  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Layout />}>
          {publicRoutes.length > 0 &&
            publicRoutes.map((route, idx) => {
              return (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    <Suspense
                      fallback={
                        <div className="flex justify-center items-center mt-10"></div>
                      }
                    >
                      <PublicRoute children={route.element} />
                    </Suspense>
                  }
                >
                  {get(route, "inner")?.map((innerRoute, innerKey) => (
                    <Route
                      key={innerKey}
                      path={innerRoute.path}
                      element={
                        <Suspense
                          fallback={
                            <div className="flex justify-center items-center mt-10"></div>
                          }
                        >
                          {innerRoute.element}
                        </Suspense>
                      }
                    />
                  ))}
                </Route>
              );
            })}
        </Route>
        <Route
          path={"/login"}
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-10"></div>
              }
            ></Suspense>
          }
        />
        <Route
          path={"*"}
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-10"></div>
              }
            >
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default RoutesWrapper;
