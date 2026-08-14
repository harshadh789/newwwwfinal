import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import ExecutiveOverview from './pages/ExecutiveOverview';
import VisionMission from './pages/VisionMission';
import StrategicPlan from './pages/StrategicPlan';
import StrategicPriorities from './pages/StrategicPriorities';
import TourPortfolio from './pages/tours/TourPortfolio';
import OperationsCalendar from './pages/tours/OperationsCalendar';
import ConfirmedTours from './pages/tours/ConfirmedTours';
import OperationsPlanning from './pages/tours/OperationsPlanning';
import FestivalsCalendar from './pages/tours/FestivalsCalendar';
import MarketingStrategy from './pages/marketing/MarketingStrategy';
import SalesStrategy from './pages/sales/SalesStrategy';
import FinancePlanning from './pages/FinancePlanning';
import AlignmentMatrix from './pages/AlignmentMatrix';
import AdminCenter from './pages/admin/AdminCenter';
import DataQuality from './pages/admin/DataQuality';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ExecutiveOverview />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/strategic-plan" element={<StrategicPlan />} />
          <Route path="/strategic-priorities" element={<StrategicPriorities />} />
          <Route path="/tours/portfolio" element={<TourPortfolio />} />
          <Route path="/tours/calendar" element={<OperationsCalendar />} />
          <Route path="/tours/confirmed" element={<ConfirmedTours />} />
          <Route path="/tours/planning" element={<OperationsPlanning />} />
          <Route path="/tours/festivals" element={<FestivalsCalendar />} />
          <Route path="/marketing-strategy" element={<MarketingStrategy />} />
          <Route path="/sales-strategy" element={<SalesStrategy />} />
          <Route path="/finance-planning" element={<FinancePlanning />} />
          <Route path="/alignment-matrix" element={<AlignmentMatrix />} />
          <Route path="/admin" element={<AdminCenter />} />
          <Route path="/data-quality" element={<DataQuality />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
