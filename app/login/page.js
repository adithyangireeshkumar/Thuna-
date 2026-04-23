import { OtpLoginCard } from "@/components/otp-login-card";

export const metadata = {
  title: "THUNA Login"
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center py-10">
      <OtpLoginCard />
    </div>
  );
}
