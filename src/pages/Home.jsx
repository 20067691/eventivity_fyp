import SignOutButton from "../components/SignOutButton";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F4F4]">
      <h1 className="text-4xl font-bold text-[#552834] mb-4">Welcome to Eventivity</h1>
      <SignOutButton />
    </div>
  );
}
// This component serves as the landing page for the Eventivity application.
// It could include a welcome message, an overview of the app's features, or any other introductory content.
// The Login component is included to allow users to authenticate and access the application.
// The Home component is the first page users see when they visit the application, providing a friendly introduction to Eventivity.