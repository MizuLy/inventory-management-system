import { TbUsersGroup } from "react-icons/tb";

export default function Customers() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3 font-belanosima text-3xl text-nord-900">
          <TbUsersGroup className="text-nord-purple" />
          <span>Orders</span>
        </div>
      </div>
    </div>
  );
}
