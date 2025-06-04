import Navigation, { Tab } from "../../../components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useAuth } from "../../../firebase/AuthProvider";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import Icon from "../../../components/Icon/Icon";
import {
  header,
  userNav,
  upperNav,
  settingsIcon,
  profilePhoto,
} from "../../app/user/UserHome.css";
import {
  clearBtn,
  container,
  contentWrapper,
  fieldsWrapper,
  goBack,
  goBackIcon,
  profileImg,
  profileSummary,
  selectedStyles,
  settingsBtn,
  settingTabForm,
  settingTabTitle,
  summaryCpf,
  summaryName,
  tabsItem,
  tabsNavigation,
} from "./UserSettings.css";
import FormField from "../../../components/Form/FormField/FormField";
import { userFormFields } from "../../complete-signup/types";
import { formatCPF } from "../../../utils/formatCPF";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import {
  fieldset,
  loaderContainer,
  smallField,
} from "../../complete-signup/Step.css";
import { states } from "../../complete-signup/institution/StepThree";
import Button from "../../../components/Button/Button";
import { FormRadio } from "../../../components/Form/FormRadio/FormRadio";
import { isValidCPF } from "../../../utils/isValidCPF";
import { isValidPhoneNumber } from "../../../utils/isValidPhoneNumber";
import Loader from "../../../components/Loader/Loader";
import ProfilePhoto from "../../../assets/images/profile-photo.png";
import { autoFillAddressFromZip } from "../../../utils/autoFillAddressFromZip";
import FormDropdown from "../../../components/Form/FormDropdown/FromDropdown";

const NavTabs: Tab[] = [
  { name: "Home", icon: "home", to: "/" },
  { name: "Configurações", icon: "settings", to: "/configuracoes" },
];

export const UserSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<
    "profile" | "data" | "address" | "health"
  >("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(userFormFields);
  const [cpfError, setCpfError] = useState<string | undefined>(undefined);
  const [phoneNumberError, setPhoneNumberError] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zipError, setZipError] = useState<string | undefined>(undefined);
  const [isZipValid, setIsZipValid] = useState<boolean>(true);

  const isFormValid = () => {
    const requiredFields = [
      userData.email,
      userData.cpf,
      userData.birthDate,
      userData.gender,
      userData.phoneNumber,
      userData.address.zip,
      userData.address.street,
      userData.address.number,
      userData.address.district,
      userData.address.city,
      userData.address.state,
    ];

    // Verifica condicionalmente campos de saúde
    if (userData.hasDisability === "sim" && !userData.disability) {
      return false;
    }

    if (userData.needsMedicalEquip === "sim" && !userData.medicalEquip) {
      return false;
    }

    if (userData.takesMedication === "sim" && !userData.medication) {
      return false;
    }

    // if (isZipValid) return false;

    return requiredFields.every((field) => field.trim() !== "");
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData({
            name: data.name || "",
            email: data.email || "",
            cpf: data.cpf || "",
            birthDate: data.birthDate || "",
            gender: data.gender || "",
            phoneNumber: data.phoneNumber || "",
            livesAlone: data.livesAlone || "",
            livesWith: data.livesWith || "",
            hasDisability: data.hasDisability || "",
            disability: data.disability || "",
            needsMedicalEquip: data.needsMedicalEquip || "",
            medicalEquip: data.medicalEquip || "",
            takesMedication: data.takesMedication || "",
            medication: data.medication || "",
            emergencyContact: {
              name: data.emergencyContact?.name || "",
              relationship: data.emergencyContact?.relationship || "",
              phoneNumber: data.emergencyContact?.phoneNumber || "",
            },
            address: {
              street: data.address?.street || "",
              number: data.address?.number || "",
              additionalAddressInfo: data.address?.additionalAddressInfo || "",
              district: data.address?.district || "",
              city: data.address?.city || "",
              state: data.address?.state || "",
              zip: data.address?.zip || "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user) return;
    setIsSubmitting(true);

    if (!isValidCPF(userData.cpf)) {
      setCpfError("CPF inválido");
      setIsSubmitting(false);
      return;
    } else {
      setCpfError(undefined);
    }

    if (!isValidPhoneNumber(userData.phoneNumber)) {
      setPhoneNumberError("Número de telefone inválido");
      setIsSubmitting(false);
      return;
    } else {
      setPhoneNumberError(undefined);
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, userData);
      alert("Dados salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar dados.");
    }
    setIsSubmitting(false);
  };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name } = e.target;
  //   let { value } = e.target;

  //   if (name === "cpf") {
  //     value = formatCPF(value);
  //   }

  //   if (name === "phoneNumber") {
  //     value = formatPhoneNumber(value);
  //   }

  //   setUserData({ ...userData, [name]: value });
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "cpf") {
      value = formatCPF(value);
    }

    if (name === "phoneNumber") {
      value = formatPhoneNumber(value);
    }

    // Atualiza campos aninhados no endereço
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];

      // Atualiza userData.address[addressField]
      setUserData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));

      // Se for campo zip, chama autoFillAddressFromZip para atualizar endereço
      if (addressField === "zip") {
        autoFillAddressFromZip(
          value,
          (field, val) => {
            setUserData((prev) => ({
              ...prev,
              address: {
                ...prev.address,
                [field.split(".")[1]]: val,
              },
            }));
          },
          setZipError,
          setIsZipValid
        );
      }

      return; // evita duplicar setUserData
    }

    // Caso geral para campos fora do endereço
    setUserData({ ...userData, [name]: value });
  };

  if (isLoading) {
    return (
      <div className={container}>
        <Navigation tabs={NavTabs} className={userNav} />
        <div className={contentWrapper}>
          <header className={header}>
            <h2>Configurações</h2>
            <nav className={upperNav}>
              <Icon
                className={settingsIcon}
                type="settings"
                onClick={() => navigate("/configuracoes")}
              />
              <div className={profilePhoto}>
                <img style={{ width: "100%" }} src={ProfilePhoto} alt="" />
              </div>
            </nav>
          </header>
          <LoadingScreen />
        </div>
      </div>
    );
  }

  return (
    <div className={container}>
      <Navigation tabs={NavTabs} className={userNav} />
      <div className={contentWrapper}>
        <header className={header}>
          <h2 className={goBack}>
            <Icon
              className={goBackIcon}
              onClick={() => navigate("/")}
              type="arrowLeft"
            />
            Configurações
          </h2>
          <nav className={upperNav}>
            <Icon
              className={settingsIcon}
              type="settings"
              onClick={() => navigate("/configuracoes")}
            />
            <div className={profilePhoto}>
              <img style={{ width: "100%" }} src={ProfilePhoto} alt="" />
            </div>
          </nav>
        </header>

        <ul className={tabsNavigation}>
          <li className={tabsItem}>
            <button
              style={selectedTab === "profile" ? selectedStyles : undefined}
              onClick={() => setSelectedTab("profile")}
              className={clearBtn}
            >
              Perfil
            </button>
          </li>
          <li className={tabsItem}>
            <button
              style={selectedTab === "data" ? selectedStyles : undefined}
              onClick={() => setSelectedTab("data")}
              className={clearBtn}
            >
              Dados
            </button>
          </li>
          <li className={tabsItem}>
            <button
              style={selectedTab === "health" ? selectedStyles : undefined}
              onClick={() => setSelectedTab("health")}
              className={clearBtn}
            >
              Saúde
            </button>
          </li>
          <li className={tabsItem}>
            <button
              style={selectedTab === "address" ? selectedStyles : undefined}
              onClick={() => setSelectedTab("address")}
              className={clearBtn}
            >
              Endereço
            </button>
          </li>
        </ul>

        {selectedTab === "profile" && (
          <>
            <h2 className={settingTabTitle}>Conta</h2>
            <form className={settingTabForm}>
              <div className={fieldsWrapper}>
                <div className={profileSummary}>
                  <img className={profileImg} src={ProfilePhoto} alt="" />
                  <div>
                    <p className={summaryName}>{userData.name}</p>
                    <p className={summaryCpf}>{userData.cpf}</p>
                  </div>
                </div>
                <FormField
                  label="Nome Completo"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="E-mail"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {isSubmitting ? (
                <div
                  className={loaderContainer}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Loader />
                </div>
              ) : (
                <Button
                  className={settingsBtn}
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={!isFormValid()}
                >
                  Salvar
                </Button>
              )}
            </form>
          </>
        )}

        {selectedTab === "data" && (
          <>
            <h2 className={settingTabTitle}>Geral</h2>
            <form className={settingTabForm}>
              <div className={fieldsWrapper}>
                <FormField
                  label="CPF"
                  name="cpf"
                  value={userData.cpf}
                  onChange={handleChange}
                  required
                  error={cpfError}
                />

                <FormField
                  label="Data de Nascimento"
                  name="birthDate"
                  value={userData.birthDate}
                  type="date"
                  onChange={handleChange}
                  required
                />

                <FormDropdown
                  label="Gênero"
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  options={[
                    { label: "Feminino", value: "feminino" },
                    { label: "Masculino", value: "masculino" },
                    { label: "Prefiro não informar", value: "prefereNaoDizer" },
                    { label: "Outro", value: "outro" },
                  ]}
                  required
                />
                <FormField
                  label="Telefone"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  required
                  error={phoneNumberError}
                />
              </div>

              {isSubmitting ? (
                <div
                  className={loaderContainer}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Loader />
                </div>
              ) : (
                <Button
                  className={settingsBtn}
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={!isFormValid()}
                >
                  Salvar
                </Button>
              )}
            </form>
          </>
        )}

        {selectedTab === "health" && (
          <>
            <form className={settingTabForm}>
              <h2 className={settingTabTitle}>Mobilidade</h2>
              <div className={fieldsWrapper}>
                <FormRadio
                  label="Você possui alguma deficiência?"
                  name="hasDisability"
                  value={userData.hasDisability}
                  options={[
                    { label: "Sim", value: "sim" },
                    { label: "Não", value: "nao" },
                  ]}
                  onChange={handleChange}
                />

                {userData.hasDisability === "sim" && (
                  <FormDropdown
                    label="Qual?"
                    name="disability"
                    value={userData.disability}
                    onChange={handleChange}
                    options={[
                      { label: "Deficiência física", value: "fisica" },
                      { label: "Deficiência visual", value: "visual" },
                      { label: "Deficiência auditiva", value: "auditiva" },
                      { label: "Deficiência cognitiva", value: "cognitiva" },
                      { label: "Doença ou condição crônica", value: "cronica" },
                    ]}
                  />
                )}

                <FormRadio
                  label="Você usa algum equipamento médico essencial?"
                  name="needsMedicalEquip"
                  value={userData.needsMedicalEquip}
                  options={[
                    { label: "Sim", value: "sim" },
                    { label: "Não", value: "nao" },
                  ]}
                  onChange={handleChange}
                />

                {userData.needsMedicalEquip === "sim" && (
                  <FormField
                    label="Quais?"
                    name="medicalEquip"
                    value={userData.medicalEquip}
                    onChange={handleChange}
                    required
                    error="Separe os equipamentos com uma vírgula."
                  />
                )}
              </div>

              <div className={fieldsWrapper} style={{ margin: "50px 0" }}>
                <h2 className={settingTabTitle}>Medicação</h2>
                <FormRadio
                  label="Toma medicação contínua?"
                  name="takesMedication"
                  value={userData.takesMedication}
                  options={[
                    { label: "Sim", value: "sim" },
                    { label: "Não", value: "nao" },
                  ]}
                  onChange={handleChange}
                />

                {userData.takesMedication === "sim" && (
                  <FormField
                    label="Quais?"
                    name="medication"
                    value={userData.medication}
                    onChange={handleChange}
                    required
                    error="Separe os medicamentos com uma vírgula."
                  />
                )}
              </div>

              {isSubmitting ? (
                <div
                  className={loaderContainer}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Loader />
                </div>
              ) : (
                <Button
                  className={settingsBtn}
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={!isFormValid()}
                >
                  Salvar
                </Button>
              )}
            </form>
          </>
        )}

        {selectedTab === "address" && (
          <>
            <h2 className={settingTabTitle}>Endereço</h2>
            <form className={settingTabForm}>
              <div className={fieldsWrapper}>
                <FormField
                  label="CEP"
                  name="address.zip"
                  value={userData.address.zip}
                  onChange={handleChange}
                  required
                  error={zipError}
                />

                <fieldset className={fieldset}>
                  <FormField
                    label="Logradouro"
                    name="address.street"
                    value={userData.address.street}
                    onChange={handleChange}
                    required
                  />

                  <FormField
                    label="Número"
                    name="address.number"
                    type="number"
                    value={userData.address.number}
                    onChange={handleChange}
                    className={smallField}
                    required
                  />
                </fieldset>

                <FormField
                  label="Complemento"
                  name="address.additionalAddressInfo"
                  value={userData.address.additionalAddressInfo}
                  onChange={handleChange}
                  required={false}
                />

                <FormField
                  label="Bairro"
                  name="address.district"
                  value={userData.address.district}
                  onChange={handleChange}
                  required
                />

                <fieldset className={fieldset}>
                  <FormField
                    label="Cidade"
                    name="address.city"
                    value={userData.address.city}
                    onChange={handleChange}
                    required
                  />

                  <FormDropdown
                    label="Estado"
                    name="address.state"
                    value={userData.address.state}
                    onChange={handleChange}
                    placeholder="UF"
                    required
                    className={smallField}
                    options={states}
                  />
                </fieldset>
              </div>

              {isSubmitting ? (
                <div
                  className={loaderContainer}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Loader />
                </div>
              ) : (
                <Button
                  className={settingsBtn}
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={!isFormValid()}
                >
                  Salvar
                </Button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
