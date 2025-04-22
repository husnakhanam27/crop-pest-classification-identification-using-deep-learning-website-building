
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const { t } = useTranslation();

  // Sample data for the charts
  const pestDistributionData = [
    { name: "Fall Armyworm", count: 24 },
    { name: "Aphid", count: 18 },
    { name: "Whitefly", count: 15 },
    { name: "Thrips", count: 12 },
    { name: "Mealybug", count: 9 }
  ];

  const scanHistoryData = [
    { month: "Jan", scans: 10 },
    { month: "Feb", scans: 15 },
    { month: "Mar", scans: 12 },
    { month: "Apr", scans: 8 },
    { month: "May", scans: 20 },
    { month: "Jun", scans: 24 }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const recentScans = [
    {
      id: 1,
      pestName: "Fall Armyworm",
      confidence: 95.7,
      date: "2025-04-20",
      isBeneficial: false
    },
    {
      id: 2,
      pestName: "Ladybug",
      confidence: 98.2,
      date: "2025-04-18",
      isBeneficial: true
    },
    {
      id: 3,
      pestName: "Spider Mite",
      confidence: 91.5,
      date: "2025-04-15",
      isBeneficial: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center border-b border-green-100">
        <Link to="/" className="text-2xl font-bold text-green-800">
          {t("app.title")}
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link to="/">
            <Button variant="outline">{t("navigation.home")}</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">{t("navigation.logout")}</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-8 text-green-800">{t("dashboard.title")}</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.pestDistribution")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{}} className="h-full">
                  <PieChart>
                    <Pie
                      data={pestDistributionData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={(entry) => entry.name}
                    >
                      {pestDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.scanHistory")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{}} className="h-full">
                  <BarChart data={scanHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="scans" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recentScans")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-2">Pest Name</th>
                    <th className="text-left p-2">Confidence</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan) => (
                    <tr key={scan.id} className="border-b border-gray-200">
                      <td className="p-2">{scan.pestName}</td>
                      <td className="p-2">{scan.confidence}%</td>
                      <td className="p-2">{scan.date}</td>
                      <td className="p-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            scan.isBeneficial
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {scan.isBeneficial ? t("results.isBeneficial") : t("results.isHarmful")}
                        </span>
                      </td>
                      <td className="p-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
