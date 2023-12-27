import { Card } from "antd/lib/index";

const ListTrainee = ({ usersData }:any) => {
  return (
    <Card
      title="List Trainee"
      bordered={false}
      style={{ width: 300, backgroundColor: "#FFC672" }}
      headStyle={{ fontSize: 24, borderBottom: 0 }}
    >
      <ol className="text-xl space-y-1">
        {usersData.usersPay.map((items: any) => (
          <li key={items.id}>{items.users.name}</li>
        ))}
      </ol>
    </Card>
  );
};
export default ListTrainee;
