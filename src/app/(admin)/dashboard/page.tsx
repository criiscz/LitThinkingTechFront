import { Card } from "antd";
import {useTranslations} from "next-intl";

export default function DashboardPage() {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-center h-full mb-5 ">
      <Card className="w-full max-w-xl text-center shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-gray-800">{t('welcomeDashboard')}</h1>
        <p className="text-gray-600 mt-2">
          {t('dashboardDescription')}
        </p>
      </Card>
    </div>
  );
}
