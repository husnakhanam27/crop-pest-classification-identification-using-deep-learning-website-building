
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/ImageUploader";
import ResultsDisplay from "@/components/ResultsDisplay";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<{
    pestName: string;
    confidence: number;
    description: string;
    isBeneficial?: boolean;
    uses?: string;
    environmentalImpact?: string;
  } | null>(null);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    // Simulate classification result
    setTimeout(() => {
      setResult({
        pestName: "Fall Armyworm",
        confidence: 95.7,
        description: "A significant pest of corn and other grass family crops. Known for rapid reproduction and spread.",
        isBeneficial: false,
        uses: "Fall armyworms are harmful pests that damage crops. They do not provide any beneficial uses for agriculture.",
        environmentalImpact: "Can cause significant damage to crops, leading to economic losses. They can consume large amounts of plant material in a short time."
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="py-4 px-6 flex justify-between items-center border-b border-green-100">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/d0d4fe56-308e-49f9-8e44-9c409cf53d87.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-green-800">{t("app.title")}</h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-green-700 hover:text-green-900">
              {t("navigation.home")}
            </Link>
            <Link to="/dashboard" className="text-green-700 hover:text-green-900">
              {t("navigation.dashboard")}
            </Link>
          </nav>
          <Link to="/login">
            <Button variant="outline">{t("navigation.login")}</Button>
          </Link>
        </div>
      </header>

      <div className="py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-2">{t("app.title")}</h1>
        <p className="text-green-600 max-w-2xl mx-auto">
          {t("app.subtitle")}
        </p>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">{t("upload.title")}</h2>
            <ImageUploader onImageSelect={handleImageSelect} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">{t("results.title")}</h2>
            <ResultsDisplay selectedImage={selectedImage} result={result} />
          </Card>
        </div>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-green-700">{t("about.title")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <InfoCard
              title={t("about.species")}
              description={t("about.speciesDesc")}
            />
            <InfoCard
              title={t("about.ai")}
              description={t("about.aiDesc")}
            />
            <InfoCard
              title={t("about.research")}
              description={t("about.researchDesc")}
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
