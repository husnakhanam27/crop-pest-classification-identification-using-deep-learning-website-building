
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultsDisplayProps {
  selectedImage: string | null;
  result: {
    pestName: string;
    confidence: number;
    description: string;
  } | null;
}

const ResultsDisplay = ({ selectedImage, result }: ResultsDisplayProps) => {
  if (!selectedImage) {
    return (
      <div className="text-center text-gray-500">
        No image selected. Upload an image to see the analysis results.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square max-w-sm mx-auto relative rounded-lg overflow-hidden">
        <img
          src={selectedImage}
          alt="Selected pest"
          className="w-full h-full object-cover"
        />
      </div>

      {result ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-green-700">{result.pestName}</h3>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={result.confidence} className="flex-1" />
              <span className="text-sm text-gray-600">{result.confidence}%</span>
            </div>
          </div>
          <p className="text-gray-600">{result.description}</p>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="text-gray-500 mt-4">Analyzing image...</p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
