import SignupForm from "../ui/signup-form";

export const metadata = {
  title: "Inscription",
};

/**
 * Page "Créer un compte"
 * @returns JSX.Element
 */
export default function Register() {
  return (
    <SignupForm />
  );
}