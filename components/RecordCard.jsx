import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Trash2 } from "react-feather";
import axios from "axios";
import { toast } from "react-toastify";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (date) => {
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutues = "0" + minutes;
  }
  return `${hours}:${minutes}, ${date.getDay()} ${
    months[date.getMonth()]
  }, ${date.getFullYear()}`;
};

const RecordCard = ({
  createdAt,
  temp,
  oxygen,
  taste,
  smell,
  _id,
  canDelete,
}) => {
  const [dateTime, _] = React.useState(new Date(createdAt));
  const queryClient = useQueryClient();
  const mutation = useMutation(() =>
    axios.delete("/api/record/delete", { data: { id: _id.toString() } })
  );

  return (
    <li className="flex flex-col space-y-1">
      <div className="w-full flex items-center justify-between">
        <p className="text-lg text-gray-400 font-medium">
          {formatDate(dateTime)}
        </p>
        {canDelete && (
          <Trash2
            className="text-gray-400 cursor-pointer"
            onClick={() =>
              mutation.mutate(
                { data: { id: _id.toString() } },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries("records");
                    toast.success("Record deleted successfully.");
                  },
                  onError: (e) => {
                    toast.error(e.response.data.message);
                  },
                }
              )
            }
          />
        )}
      </div>
      <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:justify-between w-full p-4 rounded-md border-2 border-gray-200">
        <div className="flex w-full justify-around flex-1">
          <div className="flex flex-1 items-center flex-col space-y-1">
            <h3 className="text-sm text-gray-800 font-medium">Temperature</h3>
            <p
              className={`text-3xl lg:text-3xl ${
                temp > 98.6 ? "text-red-400" : "text-green-400"
              } font-semibold`}
            >
              {temp}
            </p>
          </div>
          <div className="flex flex-col flex-1 items-center space-y-1">
            <h3 className="text-sm text-gray-800 font-medium">SpO2 level</h3>
            <p
              className={`text-3xl lg:text-3xl ${
                oxygen < 96 ? "text-red-400" : "text-green-400"
              } font-semibold`}
            >
              {oxygen}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-around flex-1">
          <div className="flex flex-col flex-1 items-center space-y-1">
            <h3 className="text-sm text-gray-800 font-medium">Smell</h3>
            <p
              className={`text-3xl lg:text-3xl ${
                !smell ? "text-red-400" : "text-green-400"
              } font-semibold`}
            >
              {smell ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex flex-col flex-1 items-center space-y-1">
            <h3 className="text-sm text-gray-800 font-medium">Taste</h3>
            <p
              className={`text-3xl lg:text-3xl ${
                !taste ? "text-red-400" : "text-green-400"
              } font-semibold`}
            >
              {taste ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RecordCard;
