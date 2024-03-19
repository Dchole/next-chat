import Contacts from "./components/contacts";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Contacts />
      {children}
    </>
  );
}
