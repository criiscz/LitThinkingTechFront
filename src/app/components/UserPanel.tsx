import { handleSignOut } from "@/app/lib/cognitoActions";
import { Button, Card, Avatar, Space } from "antd";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import useAuthUser from "@/app/hooks/useAuthUser";
import { UserOutlined } from "@ant-design/icons";

export default function UserPanel() {
  const router = useRouter();
  const t = useTranslations();
  const user = useAuthUser();

  const handleLogOut = async () => {
    await handleSignOut();
    router.push("/login");
  };

  return (
      <Space direction="vertical" className="w-full text-center">
        <Avatar size={64} icon={<UserOutlined />} />
        <h3 className="text-lg font-semibold text-gray-800">
          {user?.name || t("guest")}
        </h3>
        <Button type="primary" danger onClick={handleLogOut}>
          {t("signOut")}
        </Button>
      </Space>
  );
}
