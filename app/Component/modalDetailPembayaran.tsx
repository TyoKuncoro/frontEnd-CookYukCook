import { Modal, Tag } from "antd";

function DetailPembayaran({ dataApprove }) {
    console.log(dataApprove, "ini data approveeee")
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
//   const formattedDate = new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).format(new Date(dataApprove.date));
//   const formattedTime = new Intl.DateTimeFormat("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   }).format(new Date(dataApprove.date));
  // const date = dataApprove.date.getDate()
  return (
    <div className="text-start">
      <div className="flex justify-between">
        {/* <div className="text-base font-medium">{formattedDate}</div> */}
        {/* <div className="text-base font-medium">{formattedTime}</div> */}
      </div>
      <hr />
      <div className="flex justify-between">
        <div className="text-base">Status</div>
        <Tag color="green" className="text-base">
          {dataApprove.status}
        </Tag>
      </div>
      <div className="flex justify-between">
      <div className="text-base">Metode Pembayaran</div>
      <div className="text-base mr-2 mt-1">{dataApprove.payment_method}</div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-lg font-semibold">Kelas Regular</div>
          <div className="text-base">{dataApprove.regular.courseName}</div>
          <div className="text-base">{dataApprove.regular.theme.name}</div>
        </div>
        <div className="text-xl font-semibold">
          {formatter.format(dataApprove.price)}
        </div>
      </div>
    </div>
  );
}
export default DetailPembayaran;
