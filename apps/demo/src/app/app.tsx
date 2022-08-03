import React, { Suspense } from 'react';
import { Link, BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import './app.scss';

const ArrayField = React.lazy(() => import(`./components/ArrayField`));
const MultipleStepsForm = React.lazy(
  () => import(`./components/MultipleSteps`)
);
const QuickStart = React.lazy(() => import(`./components/QuickStart`));
const Dependencies = React.lazy(() => import(`./components/Dependencies`));
const Dynamic = React.lazy(() => import(`./components/Dynamic`));
const YupValidation = React.lazy(() => import('./components/NestedValidation'));

const Wrapper = styled.div`
  max-width: 768px;
  padding: 1rem;
  margin: 1rem auto;
  background: #fefefe;
  border: 1px solid #eee;
  display: flex;
  flex-direction: row;
`;

const Nav = styled.nav`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  min-width: 160px;

  a {
    display: block;
    margin-bottom: 2px;
  }
`;

const Index = () => {
  return (
    <Wrapper>
      <Nav>
        <Link to="quick-start">start</Link>
        <Link to="multiple-steps">Multiple Steps Form</Link>
        <Link to="array">Array Fields</Link>
        <Link to="default-values">Default Values</Link>
        <Link to="rerender">Mock Fetch Data</Link>
        <Link to="conditional">Conditional</Link>
        <Link to="dynamic">Dynamic</Link>
        <Link to="yup-validation">Yup Validation</Link>
      </Nav>
      {/* Demo outlet */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="demo">
          <Outlet />
        </div>
      </Suspense>
    </Wrapper>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="/multiple-steps" element={<MultipleStepsForm />} />
          <Route path="/array" element={<ArrayField />} />
          <Route path="/quick-start" element={<QuickStart />} />
          <Route path="/conditional" element={<Dependencies />} />
          <Route path="/dynamic" element={<Dynamic />} />
          <Route path="/yup-validation" element={<YupValidation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
