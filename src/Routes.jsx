import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductCatalog from './pages/product-catalog';
import Login from './pages/login';
import ArtisanUploadForm from './pages/artisan-upload-form';
import HomepageLanding from './pages/homepage-landing';
import Register from './pages/register';
import DummyLogin from "pages/login/components/DummyLogin";

// testing dummy page on versal 


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ArtisanUploadForm />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<DummyLogin />} />

        <Route path="/artisan-upload-form" element={<ArtisanUploadForm />} />
        <Route path="/homepage-landing" element={<HomepageLanding />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
