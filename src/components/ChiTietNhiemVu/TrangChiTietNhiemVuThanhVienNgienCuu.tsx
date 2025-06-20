import React, { Suspense, lazy } from 'react';

// Lazy load các component con
const TaskHeader = lazy(() => import('./TaskHeader'));
const TaskDetails = lazy(() => import('./TaskDetails'));
const Presentation = lazy(() => import('./Presentation'));
const FileUpload = lazy(() => import('./FileUpload'));
const SubmitButton = lazy(() => import('./SubmitButton'));

// Component loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const TrangChiTietNhiemVuThanhVienNgienCuu: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <TaskHeader />
      </Suspense>

      <div className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <TaskDetails />
        </Suspense>
      </div>

      <div className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <Presentation />
        </Suspense>
      </div>

      <div className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <FileUpload />
        </Suspense>
      </div>

      <div className="mt-6">
        <Suspense fallback={<LoadingSpinner />}>
          <SubmitButton 
            onSubmit={() => {
              // Handle submission logic here
              console.log('Submitting task...');
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default TrangChiTietNhiemVuThanhVienNgienCuu; 