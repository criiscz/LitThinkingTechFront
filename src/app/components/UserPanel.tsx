
import {handleSignOut} from "@/app/lib/cognitoActions";
import {Button} from "antd";
import {useRouter} from "next/navigation";

export default function UserPanel(){

  const router = useRouter();

  const handleLogOut = async () => {
    await handleSignOut();
    router.push('/login');
  }

    return(
        <div>
          <Button onClick={() => handleLogOut()}>Sign Out</Button>
        </div>
    )
}
