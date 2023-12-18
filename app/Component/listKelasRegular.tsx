import { Collapse } from "antd"
const ListKelasRegular = (props:any) => {
    const {items} = props;
    return (
        <Collapse
              size="small"
              items={items}
              className="w-[1000px] bg-white m-auto text-lg border-list"
            />
    )
}
export default ListKelasRegular