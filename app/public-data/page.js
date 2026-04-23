import { RecordsBrowser } from "@/components/records-browser";

export const metadata = {
  title: "THUNA Public Data"
};

export default function PublicDataPage({ searchParams }) {
  return <RecordsBrowser initialQuery={searchParams?.q || ""} />;
}
