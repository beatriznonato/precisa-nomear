import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import {
  header,
  logo,
  formButton,
  formElm,
  progress,
  formNavigation,
  navButton,
  upcomingNavButton,
  currentProgress,
  container,
  cardWrapper,
  card,
} from "./CompleteSignUp.css";
import { selected } from "../../components/Card/Card.css";
import { useState } from "react";
import Card from "../../components/Card/Card";
import { StepOne as UserStepOne } from "./user/StepOne";
import { StepTwo as UserStepTwo } from "./user/StepTwo";
import { StepThree as UserStepThree } from "./user/StepThree";
import { StepFour as UserStepFour } from "./user/StepFour";
import { StepFive as UserStepFive } from "./user/StepFive";
import { StepSix as UserStepSix } from "./user/StepSix";
import { StepOne as InstitutionStepOne } from "./institution/StepOne";
import { StepTwo as InstitutionStepTwo } from "./institution/StepTwo";
import { StepThree as InstitutionStepThree } from "./institution/StepThree";
import FormHeader from "../../components/Form/FormHeader/FormHeader";
import { instFormFields, userFormFields } from "./types";

export default function CompleteSignUp() {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userType, setUserType] = useState<"pessoa" | "instituicao" | null>(
    null
  );

  const [institutionForm, setInstitutionForm] = useState(instFormFields);
  const handleInstFormChange = (name: string, value: string) => {
    const keys = name.split(".");

    setInstitutionForm((prev: any) => {
      const updated = { ...prev };

      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      return updated;
    });
  };

  const [userForm, setUserForm] = useState(userFormFields);

  const handleUserFormChange = (name: string, value: string) => {
    const keys = name.split(".");

    setUserForm((prev: any) => {
      const updated = structuredClone(prev);

      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      return updated;
    });
  };

  if (!uid) return <Navigate to={"/signup"} />;

  const stepsNav = userType === "instituicao" ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6, 7];
  const progressPercent = Math.min(
    ((currentStep - 1 + 0.5) / (stepsNav.length - 1)) * 100,
    100
  );

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const renderStep = () => {
    if (!userType) return null;

    // fluxo para pessoa
    if (userType === "pessoa") {
      switch (currentStep) {
        case 2:
          return (
            <UserStepOne
              uid={uid}
              onNext={nextStep}
              onBack={prevStep}
              form={userForm}
              onFormChange={handleUserFormChange}
            />
          );
        case 3:
          return (
            <UserStepTwo
              uid={uid}
              onNext={nextStep}
              onBack={prevStep}
              form={userForm}
              onFormChange={handleUserFormChange}
            />
          );
        case 4:
          return (
            <UserStepThree
              uid={uid}
              onNext={nextStep}
              onBack={prevStep}
              form={userForm}
              onFormChange={handleUserFormChange}
            />
          );
        case 5:
          return (
            <UserStepFour
              uid={uid}
              onNext={nextStep}
              onBack={prevStep}
              form={userForm}
              onFormChange={handleUserFormChange}
            />
          );
        case 6:
          return (
            <UserStepFive
              uid={uid}
              onNext={nextStep}
              onBack={prevStep}
              form={userForm}
              onFormChange={handleUserFormChange}
            />
          );
        case 7:
          return (
            <UserStepSix
              uid={uid}
              onNext={nextStep}
              onBack={prevStep}
              form={userForm}
              onFormChange={handleUserFormChange}
            />
          );
      }
    }

    // fluxo para instituição
    if (userType === "instituicao") {
      switch (currentStep) {
        case 2:
          return (
            <InstitutionStepOne
              uid={uid}
              onNext={nextStep}
              onBack={prevStep}
              onFormChange={handleInstFormChange}
              form={institutionForm}
            />
          );
        case 3:
          return (
            <InstitutionStepTwo
              uid={uid}
              onNext={nextStep}
              onBack={prevStep}
              form={institutionForm}
              onFormChange={handleInstFormChange}
            />
          );
        case 4:
          return (
            <InstitutionStepThree
              uid={uid}
              onNext={() => navigate("/signup-success")}
              onBack={prevStep}
              form={institutionForm}
              onFormChange={handleInstFormChange}
            />
          );
      }
    }

    return null;
  };

  const handleCardClick = (type: "pessoa" | "instituicao") => {
    setUserType(type);
  };

  return (
    <>
      <header className={header}>
        <Icon className={logo} type="logo" />
      </header>
      <main className={container}>
        <nav className={formNavigation}>
          <div className={progress}>
            <div
              className={currentProgress}
              style={{
                width: `${progressPercent}%`,
              }}
            />
          </div>
          {stepsNav.map((step) => (
            <Button
              key={step}
              variant="circle"
              className={`${
                +step <= currentStep ? undefined : upcomingNavButton
              } ${navButton}`}
            >
              {step}
            </Button>
          ))}
        </nav>
        {currentStep === 1 && (
          <>
            <FormHeader
              headline="Antes de continuarmos, quem é você?"
              subline="Escolha como deseja usar a plataforma."
            />
            <form
              className={formElm}
              onSubmit={(e) => {
                e.preventDefault();
                if (userType) setCurrentStep(2);
              }}
            >
              <fieldset className={cardWrapper}>
                <Card
                  className={`${card} ${userType === "pessoa" ? selected : ""}`}
                  text="Pessoa"
                  icon="user"
                  onClick={() => handleCardClick("pessoa")}
                />
                <Card
                  className={`${card} ${
                    userType === "instituicao" ? selected : ""
                  }`}
                  text="Instituição"
                  icon="institution"
                  onClick={() => handleCardClick("instituicao")}
                />
              </fieldset>

              <Button className={formButton} type="submit" disabled={!userType}>
                Continuar
              </Button>
            </form>
          </>
        )}

        {currentStep != 1 && renderStep()}
      </main>
    </>
  );
}
