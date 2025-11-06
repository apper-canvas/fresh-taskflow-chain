import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 mx-auto animate-pulse" />
        </div>

        {/* Task counter skeleton */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-card p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse" />
            <div className="h-8 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl w-24 animate-pulse" />
          </div>
        </div>

        {/* Task list skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-card p-6 border border-white/20 animate-pulse"
            >
              <div className="flex items-start gap-4">
                {/* Checkbox skeleton */}
                <div className="w-5 h-5 bg-gradient-to-br from-gray-200 to-gray-300 rounded border-2 border-gray-200 mt-1 flex-shrink-0" />
                
                {/* Content skeleton */}
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4" />
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full" />
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3" />
                </div>
                
                {/* Delete button skeleton */}
                <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* FAB skeleton */}
        <div className="fixed bottom-6 right-6">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full shadow-fab animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loading;