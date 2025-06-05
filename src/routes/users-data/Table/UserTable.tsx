import { UserData } from "../../../hooks/useUsersWithCPF";
import { UserFormFields } from "../../complete-signup/types";
import {
  headItem,
  table,
  tableBody,
  tableHead,
  tableItem,
  tableItemGroup,
} from "./UserTable.css";

export type UserTableProps = {
  users: UserData[];
  setSelectedUser: (value: React.SetStateAction<UserFormFields | null>) => void;
};

export function getDisabilityLabel(disability: string): string {
  switch (disability) {
    case "fisica":
      return "Cadeirantes";
    case "visual":
      return "Def. visual";
    case "auditiva":
      return "Def. auditiva";
    case "cognitiva":
      return "Cognitiva";
    case "cronica":
      return "Crônicas";
    case "nenhuma":
    default:
      return "Nenhuma";
  }
}

const UserTable = ({ users, setSelectedUser }: UserTableProps) => {
  return (
    <table className={table}>
      <thead className={tableHead}>
        <tr>
          <th className={headItem}>Nome</th>
          <th className={headItem}>Vulnerabilidade</th>
          <th className={headItem}>Município</th>
          <th className={headItem}>Estado</th>
          <th className={headItem}>Telefone</th>
        </tr>
      </thead>
      <tbody className={tableBody}>
        {users.map((user, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === users.length - 1;

          return (
            <tr
              className={tableItemGroup}
              key={user.id}
              onClick={() => setSelectedUser(user)}
              style={{
                borderTop: isFirst ? "none" : "1px solid #F1F1F1",
                borderBottom: isLast ? "none" : "1px solid #F1F1F1",
              }}
            >
              <td className={tableItem}>{user.name}</td>
              <td className={tableItem}>
                {getDisabilityLabel(user.disability)}
              </td>
              <td className={tableItem}>{user.address.city}</td>
              <td className={tableItem}>{user.address.state}</td>
              <td className={tableItem}>{user.phoneNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
