import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Navigation, { Tab } from "../../../components/Navigation/Navigation";
import { isValidCNPJ } from "../../../utils/isValidCNPJ";
import { formatCNPJ } from "../../../utils/formatCNPJ";
import { useAuth } from "../../../firebase/AuthProvider";
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
  summaryCnpj,
  summaryInstName,
  tabsItem,
  tabsNavigation,
} from "./InstitutionSettings.css";
import FormField from "../../../components/Form/FormField/FormField";
import { db } from "../../../firebase/FirebaseConfig";
import {
  header,
  profilePhoto,
  settingsIcon,
  upperNav,
  userNav,
} from "../../app/user/UserHome.css";
import Icon from "../../../components/Icon/Icon";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import {
  fieldset,
  loaderContainer,
  smallField,
} from "../../complete-signup/Step.css";
import Loader from "../../../components/Loader/Loader";
import Button from "../../../components/Button/Button";
import FormDropdown from "../../../components/Form/FormDropdown/FromDropdown";
import { states } from "../../complete-signup/institution/StepThree";
import { instFormFields } from "../../complete-signup/types";
import ProfilePhoto from "../../../assets/images/profile-photo.png";
import { formatZip } from "../../../utils/formatZip";
import { autoFillAddressFromZip } from "../../../utils/autoFillAddressFromZip";
import { isValidZip } from "../../../utils/isValidZip";

const NavTabs: Tab[] = [
  { name: "Home", icon: "home", to: "/" },
  { name: "Configurações", icon: "settings", to: "/configuracoes" },
];
export const InstSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<
    "profile" | "data" | "address" | "health"
  >("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [instData, setInstData] = useState(instFormFields);
  const [cpfError, setCpfError] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zipError, setZipError] = useState<string | undefined>(undefined);

  const isFormValid = () => {
    const requiredFields = [
      instData.email,
      instData.institutionName,
      instData.cnpj,
      instData.organizationType,
      instData.personInCharge.name,
      instData.personInCharge.position,
      instData.address.street,
      instData.address.number,
      instData.address.district,
      instData.address.city,
      instData.address.state,
      instData.address.zip,
    ];

    return requiredFields.every((field) => field.trim() !== "");
  };

  useEffect(() => {
    async function fetchInstData() {
      try {
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setInstData({
            email: data.email || "",
            institutionName: data.institutionName || "",
            cnpj: data.cnpj || "",
            organizationType: data.organizationType || "",
            personInCharge: {
              name: data.personInCharge?.name || "",
              position: data.personInCharge?.position || "",
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

    fetchInstData();
  }, [user]);

  const [instName, setInstName] = useState<string>("");

  useEffect(() => {
    async function fetchUserName() {
      try {
        if (!user) {
          setInstName("Instituição");

          return;
        }

        const userId = user.uid;

        const userRef = doc(db, "users", userId);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          const instName = userData.institutionName || "";

          setInstName(instName);
        } else {
          setInstName("Instituição");
        }
      } catch (error) {
        console.error("Error fetching user:", error);

        setInstName("Instituição");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserName();
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user) return;
    setIsSubmitting(true);

    if (!isValidCNPJ(instData.cnpj)) {
      setCpfError("CNPJ inválido");
      setIsSubmitting(false);
      return;
    } else {
      setCpfError(undefined);
    }

    const cleanedZip = instData.address.zip.replace(/\D/g, "");
    if (!isValidZip(cleanedZip) || zipError) {
      setZipError("Informe um CEP válido antes de continuar.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, instData);
      alert("Dados salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar dados.");
    }

    setIsSubmitting(false);
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "cnpj") {
      value = formatCNPJ(value);
    }

    if (name === "address.zip") {
      value = formatZip(value);
      setInstData({
        ...instData,
        address: { ...instData.address, zip: value },
      });

      await autoFillAddressFromZip(
        value,
        (field, val) => {
          // field aqui é a string do campo que deve atualizar
          if (field.startsWith("address.")) {
            const addressField = field.split(".")[1];
            setInstData((prev) => ({
              ...prev,
              address: { ...prev.address, [addressField]: val },
            }));
          } else {
            setInstData((prev) => ({ ...prev, [field]: val }));
          }
        },
        setZipError,
        undefined
      );

      return;
    }

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setInstData({
        ...instData,
        address: { ...instData.address, [addressField]: value },
      });
    } else if (name.startsWith("personInCharge.")) {
      const personField = name.split(".")[1];
      setInstData({
        ...instData,
        personInCharge: { ...instData.personInCharge, [personField]: value },
      });
    } else {
      setInstData({ ...instData, [name]: value });
    }
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
              Instituição
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
              <div>
                <div className={fieldsWrapper}>
                  <div className={profileSummary}>
                    <img className={profileImg} src={ProfilePhoto} alt="" />
                    <div>
                      <p className={summaryInstName}>{instName}</p>
                      <p className={summaryCnpj}>{instData.cnpj}</p>
                    </div>
                  </div>
                  <FormField
                    label="E-mail"
                    name="email"
                    value={instData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={fieldsWrapper} style={{ margin: "50px 0" }}>
                  <h2 className={settingTabTitle}>
                    Responsável pela Instituição
                  </h2>
                  <form className={settingTabForm}>
                    {/* <div className={fieldsWrapper}> */}
                    <FormField
                      label="Nome Completo do Responsável"
                      name="personInCharge.name"
                      value={instData.personInCharge.name}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="Cargo / Função"
                      name="personInCharge.position"
                      value={instData.personInCharge.position}
                      onChange={handleChange}
                      required
                    />
                    {/* </div> */}
                  </form>
                </div>
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
                  label="Nome da Instituição"
                  name="institutionName"
                  value={instData.institutionName}
                  onChange={handleChange}
                  required
                />

                <FormField
                  label="CNPJ"
                  name="cnpj"
                  value={instData.cnpj}
                  onChange={handleChange}
                  required
                  error={cpfError}
                />

                <FormDropdown
                  label="Tipo de Organização"
                  name="organizationType"
                  value={instData.organizationType}
                  onChange={handleChange}
                  options={[
                    { label: "ONG", value: "ong" },
                    { label: "Outra", value: "outra" },
                  ]}
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

        {selectedTab === "address" && (
          <>
            <h2 className={settingTabTitle}>Endereço</h2>
            <form className={settingTabForm}>
              <div className={fieldsWrapper}>
                <FormField
                  label="CEP"
                  name="address.zip"
                  value={instData.address.zip}
                  onChange={handleChange}
                  error={zipError}
                  required
                />

                <fieldset className={fieldset}>
                  <FormField
                    label="Logradouro"
                    name="address.street"
                    value={instData.address.street}
                    onChange={handleChange}
                    required
                  />

                  <FormField
                    label="Número"
                    name="address.number"
                    type="number"
                    value={instData.address.number}
                    onChange={handleChange}
                    className={smallField}
                    required
                  />
                </fieldset>

                <FormField
                  label="Complemento"
                  name="address.additionalAddressInfo"
                  value={instData.address.additionalAddressInfo}
                  onChange={handleChange}
                  required={false}
                />

                <FormField
                  label="Bairro"
                  name="address.district"
                  value={instData.address.district}
                  onChange={handleChange}
                  required
                />

                <fieldset className={fieldset}>
                  <FormField
                    label="Cidade"
                    name="address.city"
                    value={instData.address.city}
                    onChange={handleChange}
                    required
                  />

                  <FormDropdown
                    label="Estado"
                    name="address.state"
                    value={instData.address.state}
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

export default InstSettings;
