import Button from "../../../components/Button/Button";
import {
  returnBtn,
  sideLayer,
  stateData,
} from "../../../components/Map/Map.css";
import { UserFormFields } from "../../complete-signup/types";
import ProfilePhoto from "../../../assets/images/profile-photo.png";
import { cardWrapper, infoBox, profilePhoto, userName } from "./SideLayer.css";
import { getDisabilityLabel } from "../Table/UserTable";
import MiniCard from "../MiniCard/MiniCard";
import { getAge } from "../../../utils/getAge";

export type SideLayerProps = {
  selectedUser: UserFormFields | null;
  setSelectedUser: (value: React.SetStateAction<UserFormFields | null>) => void;
};

const SideLayer = ({ selectedUser, setSelectedUser }: SideLayerProps) => {
  return (
    <div
      className={sideLayer}
      style={{
        right: selectedUser ? 0 : "-100%",
      }}
    >
      {selectedUser && (
        <>
          <Button
            className={returnBtn}
            variant="transparent"
            icon="arrowLeft"
            onClick={() => setSelectedUser(null)}
          >
            Voltar
          </Button>

          <div className={stateData}>
            <div className={profilePhoto}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={ProfilePhoto}
                alt=""
              />
            </div>

            <p className={userName}>{selectedUser.name}</p>

            <div className={cardWrapper}>
              <MiniCard
                icon="age"
                label="Idade"
                value={`${getAge(selectedUser.birthDate)} anos`}
              />

              <MiniCard
                icon="gender"
                label="Gênero"
                value={selectedUser.gender}
              />

              <MiniCard
                icon="home"
                label="Moradia"
                value={
                  selectedUser.livesAlone === "sim"
                    ? "Sozinho(a)"
                    : selectedUser.livesWith
                }
              />

              <MiniCard
                icon="medication"
                label="Moradia"
                value={selectedUser.takesMedication === "sim" ? "Sim" : "Não"}
              />
            </div>

            <div className={infoBox}>
              <h4>Endereço</h4>
              <p>
                {selectedUser.address.street}, {selectedUser.address.number}
              </p>
              <p>
                {selectedUser.address.district} - {selectedUser.address.zip}
              </p>
              <p>
                {selectedUser.address.city}, {selectedUser.address.state}
              </p>
            </div>

            <div className={infoBox}>
              <h4>Telefone</h4>
              <p>{selectedUser.phoneNumber}</p>
            </div>

            {selectedUser.takesMedication === "sim" && (
              <div className={infoBox}>
                <h4>Medicação</h4>
                <p>{selectedUser.medication}</p>
              </div>
            )}

            {selectedUser.hasDisability === "sim" && (
              <div className={infoBox}>
                <h4>Vulnerabilidade</h4>
                <p>{getDisabilityLabel(selectedUser.disability)}</p>
              </div>
            )}

            {selectedUser.needsMedicalEquip === "sim" && (
              <div className={infoBox}>
                <h4>Equipamento Médico</h4>
                <p>{selectedUser.medicalEquip}</p>
              </div>
            )}

            <div className={infoBox}>
              <h4>CPF</h4>
              <p> {selectedUser.cpf}</p>
            </div>

            <div className={infoBox}>
              <h4>Contato de Emergência</h4>
              <p>{selectedUser.emergencyContact.name}</p>
              <p>{selectedUser.emergencyContact.relationship}</p>
              <p>{selectedUser.emergencyContact.phoneNumber}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideLayer;
