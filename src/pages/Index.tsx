
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/ImageUploader";
import ResultsDisplay from "@/components/ResultsDisplay";
import { useState } from "react";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<{
    pestName: string;
    confidence: number;
    description: string;
  } | null>(null);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    // Simulate classification result
    setTimeout(() => {
      setResult({
        pestName: "Fall Armyworm",
        confidence: 95.7,
        description: "A significant pest of corn and other grass family crops. Known for rapid reproduction and spread.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="py-8 px-4 text-center border-b border-green-100">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Pest Recognition System</h1>
        <p className="text-green-600 max-w-2xl mx-auto">
          Advanced AI-powered pest identification system for agricultural and research purposes
        </p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Upload Image</h2>
            <ImageUploader onImageSelect={handleImageSelect} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Analysis Results</h2>
            <ResultsDisplay selectedImage={selectedImage} result={result} />
          </Card>
        </div>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-green-700">About the Project</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <InfoCard
              title="102 Pest Species"
              description="Comprehensive coverage of common agricultural pests"
            />
            <InfoCard
              title="AI-Powered"
              description="Using advanced Convolutional Neural Networks"
            />
            <InfoCard
              title="Research-Grade"
              description="Built on peer-reviewed academic research"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

const InfoCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold mb-2 text-green-700">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

export default Index;
