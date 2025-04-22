
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const QRCodeShare = () => {
  const { t } = useTranslation();
  const appUrl = window.location.href;

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/30 border-none shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <QrCode className="w-8 h-8 text-green-700" />
        <h3 className="text-xl font-semibold text-green-800">{t("qr.scanTitle")}</h3>
        <div className="w-48 h-48 bg-white p-2 rounded-lg">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(appUrl)}`}
            alt="QR Code"
            className="w-full h-full"
          />
        </div>
        <p className="text-sm text-green-700 text-center">
          {t("qr.scanDescription")}
        </p>
        <Button 
          variant="outline" 
          className="bg-white/50 hover:bg-white/80"
          onClick={() => window.location.href = appUrl}
        >
          {t("qr.openApp")}
        </Button>
      </div>
    </Card>
  );
};

export default QRCodeShare;
