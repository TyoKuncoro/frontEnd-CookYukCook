import { Card } from "antd/lib/index";

const ListTrainee = () => {
  return (
    <Card
      title="List Trainee"
      bordered={false}
      style={{ width: 300, backgroundColor: "#FFC672"}}
      headStyle={{ fontSize: 24, borderBottom: 0 }}
    >
      <ol className="text-xl space-y-1">
        <li>Cecilia Siregar</li>
        <li>Cecilia Siregar</li>
        <li>Cecilia Siregar</li>
        <li>Cecilia Siregar</li>
        <li>Cecilia Siregar</li>
        <li>Cecilia Siregar</li>
      </ol>
    </Card>
  );
};
export default ListTrainee;