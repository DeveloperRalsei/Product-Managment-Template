import { DashboardLayout } from "@/layouts/DashboardLayout";
import { withAuth } from "@/lib/withAuth";
import { useParams } from "next/navigation";

export const getServerSideProps = withAuth()

export default function User() {
  const {id} = useParams()
  return (
    <DashboardLayout><h1>{id} User Edit Page</h1></DashboardLayout>
  )
}