import { MainLayout } from "@/layouts/mainLayout";
import { withAuth } from "@/lib/withAuth";

export const getServerSideProps = withAuth()

export default function Users() {
  return (
    <MainLayout>
      <h1>Users Page</h1>
    </MainLayout>
  )
}