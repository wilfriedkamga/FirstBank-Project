
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
  en: {
    translation: {
      hello: "English translation for hello",
      usermanagement: {
        signin: {
          title: "Signin",
          welcomeMessage: "Fill in these fields to sign in.",
          signupButton: "Sign up",
          signinButton: "Sign in",
          haveAccountMessage: "Don't have an account?",
          labelViewPassword: "View password",
          messageForgetPassword: "Forgot password",
          placeHolderPassword: "Enter your password",
          labelPassword: "Password",
          labelPhone: "Phone"
        },
        signup: {
          title: "Sign up",
          labelFullName: "Full name",
          labelEmail: "Email",
          labelBirthDate: "Date of birth",
          labelGender: "Gender",
          placeHolderGender: "Choose your gender",
          valueMale: "Male",
          valueFemale: "Female",
          welcomeMessage: "Fill in these fields to sign in.",
          nextButton: "Next",
          signinButton: "Sign in",
          signupButton: "Create an account",
          haveAccountMessage: "Do you already have an account?",
          labelViewPassword: "View password",
          messageForgetPassword: "Forgot password",
          placeHolderConfirmPassword: "Confirm your password",
          labelConfirmPassword: "Confirm your password"
        }
      }
    }
  },
  fr: {
    translation: {
      hello: "Traduction française pour hello",
      usermanagement: {
        signin: {
          title: "Connexion",
          welcomeMessage: "Remplir ces champs pour vous connecter.",
          signupButton: "S'inscrire",
          signinButton: "Se connecter",
          haveAccountMessage: "Vous n'avez pas de compte ?",
          labelViewPassword: "Voir mot de passe",
          messageForgetPassword: "Mot de passe oublié",
          placeHolderPassword: "Entrez votre mot de passe",
          labelPassword: "Mot de passe",
          labelPhone: "Téléphone"
        },
        signup: {
          title: "S'inscrire",
          labelFullName: "Nom complet",
          labelEmail: "Email",
          labelBirthDate: "Date de naissance",
          labelGender: "Sexe",
          placeHolderGender: "choisir votre genre",
          valueMale: "Homme",
          valueFemale: "Femme",
          welcomeMessage: "Remplir ces champs pour vous connecter.",
          nextButton: "Suivant",
          signinButton: "Connexion",
          signupButton: "Créer son compte",
          haveAccountMessage: "Avez-vous déjà un compte ?",
          labelViewPassword: "Voir mot de passe",
          messageForgetPassword: "Mot de passe oublié",
          placeHolderConfirmPassword: "Confirmation de votre mot de passe",
          labelConfirmPassword: "Confirmer votre mot de passe"
        },
        otp: {
          title: "Verification de l'otp",
          welcomeMessage1: "Un code à 5 chiffre a été envoyé sur ce numero : ",
          welcomeMessage2: "Veuillez entrer ce code dans le champ ci-dessous. ",
          labelOtp: "Entrer le code",
          verifyButton: "Verifier",
          haventReceive: "Vous ne l'avez pas reçu ?",
          resendButton: "Renvoyer",
          signinButton: "Connexion"
        },
        putPhone: {
          title: "Mot de passe oublié",
          welcomeMessage: "Entrez votre numéro de téléphone",
          sendButton: "Envoyer le code de vérification",
          backMessage: "Aller à",
          signinButton: "Connexion"
        },
        passwordManagement: {
          title: "Définir votre mot de passe",
          title2: "Réinitialiser votre mot de passe",
          labelActualPassword: "Mot de passe actuel",
          validateButton: "Valider",
          cancelButton: "Annuler",
          saveButton: "Enregistrer"
        }
      },
      association: {
        list: {
          name: "Nom",
          address: "Adresse",
          actions: "Actions"
        }
      },
      saving: {
        add: "Ajouter",
        edit: "Modifier",
        delete: "Supprimer"
      }
    }
  }
},
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
  