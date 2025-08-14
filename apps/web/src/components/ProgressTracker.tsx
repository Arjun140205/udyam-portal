type Step = {
  number: number;
  label: string;
  completed: boolean;
};

export default function ProgressTracker({ steps, currentStep }: { steps: Step[]; currentStep: number }) {
  return (
    <div className="flex justify-between mb-8 px-4">
      {steps.map((step) => (
        <div 
          key={step.number} 
          className={`flex items-center ${
            step.completed ? 'text-green-600' : 
            step.number === currentStep ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            step.completed ? 'border-green-600 bg-green-600 text-white' : 
            step.number === currentStep ? 'border-blue-600 bg-blue-100' : 'border-gray-300'
          }`}>
            {step.number}
          </div>
          <span className="ml-2 text-sm font-medium hidden md:inline">{step.label}</span>
          <div className={`h-1 w-full ${
            step.completed ? 'bg-green-600' : 'bg-gray-200'
          }`} />
        </div>
      ))}
    </div>
  );
}
