import { lazy } from "react";
import { ProductsData } from "services/data/products";

const NotFound = lazy(() => import("pages/notFound"));
const Main = lazy(() => import("pages/main"));
const About = lazy(() => import("pages/about"));
const Products = lazy(() => import("pages/products"));
const Goals = lazy(() => import("pages/goals"));
const Partners = lazy(() => import("pages/partners"));
const News = lazy(() => import("pages/news"));
const Contact = lazy(() => import("pages/contact"));
const Blog = lazy(() => import("pages/blog"));

export interface IRoute {
  path: string;
  access?: string[] | "*";
  element: JSX.Element;
  inner?: IRoute[];
  index?: boolean;
  title: string;
}

const privateRoutes: IRoute[] = [];

const publicRoutes: IRoute[] = [
  {
    path: "/",
    title: "Home page",
    element: <Main />,
  },
  {
    path: "/about",
    title: "About",
    element: <About />,
  },
  {
    path: "/products/:id",
    title: "Products",
    element: <Products data={ProductsData} />,
  },
  {
    path: "/goals",
    title: "Goals",
    element: <Goals />,
  },
  {
    path: "/partners",
    title: "Partners",
    element: <Partners />,
  },
  {
    path: "/news",
    title: "News",
    element: <News />,
  },
  {
    path: "/news/:id",
    title: "Blog item",
    element: <Blog />,
  },
  {
    path: "/contact",
    title: "Contact",
    element: <Contact />,
  },
  {
    path: "*",
    title: "",
    element: <NotFound />,
  },
];

export { privateRoutes, publicRoutes };
