import { MainLayout } from "@/layouts/mainLayout";
import { withAuth } from "@/lib/withAuth";
import { useParams } from "next/navigation";

export const getServerSideProps = withAuth()

export default function User() {
  const {id} = useParams()
  return (
    <MainLayout><h1>{id} User Edit Page</h1></MainLayout>
  )
}