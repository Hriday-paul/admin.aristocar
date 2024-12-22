import { Bell, Trash2 } from "lucide-react";
import moment from "moment";

export default function NotificationCard({ notification }) {
  return (
    <div
      className={`flex items-center justify-between gap-x-5 rounded-xl border border-white px-3 py-4 text-white`}
    >
      <Bell size={40} />

      <div>
        <p
          className={`text-[22px] text-xl font-${!notification?.read ? "bold" : "semibold"}`}
        >
          {notification.message}
        </p>
        <p className={"text-md"}> {notification.description}</p>
      </div>

      <p
        className={`ml-3 font-${!notification?.read ? "bold" : "semibold"} text-dark`}
      >
        {moment(notification.createdAt).startOf("hour").fromNow()}
      </p>

      {/* <button>
          <Trash2 size={18} color="#F16365" />
        </button> */}
    </div>
  );
}
