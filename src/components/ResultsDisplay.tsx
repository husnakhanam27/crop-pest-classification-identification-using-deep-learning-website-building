
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ResultsDisplayProps {
  selectedImage: string | null;
  result: {
    pestName: string;
    confidence: number;
    description: string;
    isBeneficial?: boolean;
    uses?: string;
    environmentalImpact?: string;
  } | null;
}

const ResultsDisplay = ({ selectedImage, result }: ResultsDisplayProps) => {
  const { t } = useTranslation();

  if (!selectedImage) {
    return (
      <div className="text-center text-gray-500">
        {t("results.noImage")}
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
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-green-700">{result.pestName}</h3>
              <Badge variant={result.isBeneficial ? "outline" : "destructive"}>
                {result.isBeneficial ? t("results.isBeneficial") : t("results.isHarmful")}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={result.confidence} className="flex-1" />
              <span className="text-sm text-gray-600">{result.confidence}%</span>
            </div>
          </div>
          
          <Card className="p-4">
            <h4 className="font-semibold mb-2">{t("results.usesTitle")}</h4>
            <p className="text-gray-600">{result.description}</p>
            {result.uses && (
              <p className="text-gray-600 mt-2">{result.uses}</p>
            )}
          </Card>
          
          {result.environmentalImpact && (
            <Card className="p-4">
              <h4 className="font-semibold mb-2">{t("results.impactTitle")}</h4>
              <p className="text-gray-600">{result.environmentalImpact}</p>
            </Card>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="text-gray-500 mt-4">{t("results.loading")}</p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
