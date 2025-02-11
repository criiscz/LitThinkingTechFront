'use client';
import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import useAuthUser from "@/app/hooks/useAuthUser";
import AuthenticatedLayout from "@/app/components/AuthenticatedLayout";


export default function Template({children}: { children: ReactNode }) {
  const router = useRouter();
  const user = useAuthUser();
  console.log('user a: ', user);
  return (
     user && <AuthenticatedLayout>{children}</AuthenticatedLayout> || children
  )
}
