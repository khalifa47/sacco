import Auth from "@/app/(components)/auth/Auth";

export default function LoginRegister() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Auth />
    </main>
  );
}
