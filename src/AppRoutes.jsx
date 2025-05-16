import { Route, Routes } from "react-router-dom";
// Layouts
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";

// Admin Pages
import Dashboard from "./pages/Admin/Dasboard/Dashboard.jsx";
import Project from "./pages/Admin/Project/Project.jsx";
import Category from "./pages/Admin/Category/Category.jsx";
import Appointment from "./pages/Admin/Appointment/Appointment.jsx";
import Service from "./pages/Admin/Service/Service.jsx";
import Faq from "./pages/Admin/Faq.jsx";
import OurTeam from "./pages/Admin/OurTeam/OurTeam.jsx";
import Testimonial from "./pages/Admin/Testimonial/Testimonial.jsx";
import User from "./pages/Admin/User/User.jsx";
import Blog from "./pages/Admin/Blog/Blog.jsx";
import Profile from "./pages/Admin/Profile.jsx";


// User Pages
import Home from "./pages/User/Home.jsx";
import Login from "./pages/User/Login.jsx";
import AboutUs from "./pages/User/AboutUs.jsx";
import Services from "./pages/User/Services.jsx";
import ContactUs from "./pages/User/ContactUs.jsx";
import Blogs from "./pages/User/Blogs.jsx";
import Faqs from "./pages/User/Faq.jsx";
import Team from "./pages/User/Team.jsx";
import Projects from "./pages/User/Project.jsx";
import BlogDetails from "./pages/User/BlogDetails.jsx";
import ServiceDetails from "./pages/User/ServiceDetails.jsx";
import ProjectDetails from "./pages/User/ProjectDetails.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="*" element={
        <UserLayout>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/our-team" element={<Team />} />
            <Route path="/faq" element={<Faqs />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </UserLayout>
      } />


      {/* Protected Admin Dashboard Routes */}
      <Route
        path="/admin/*"
        element={
          <AdminLayout>
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/services" element={<Service />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/team" element={<OurTeam />} />
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/user" element={<User />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
