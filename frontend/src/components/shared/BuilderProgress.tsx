/* ===================================
Builder Progress Component
=================================== */
interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  completed: boolean;
}

interface BuilderProgressProps {
  sections: Section[];
  currentStep: number;
}

export default function BuilderProgress({ sections, currentStep }: BuilderProgressProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex overflow-x-auto pb-4 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0 sm:overflow-visible">
        <div className="flex items-center justify-between min-w-max sm:min-w-0 sm:flex-wrap">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = index === currentStep;
            const isCompleted = section.completed;
            const isPast = index < currentStep;
            return (
              <div key={section.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/50"
                        : isCompleted || isPast
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {isCompleted || isPast ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center truncate w-full ${
                      isActive ? "text-white font-medium" : "text-gray-400"
                    }`}
                  >
                    {section.title.split(" ")[0]}
                  </span>
                </div>
                {index < sections.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${isPast ? "bg-green-600" : "bg-gray-700"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
