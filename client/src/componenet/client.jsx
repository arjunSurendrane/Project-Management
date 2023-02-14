import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENT } from "../Queries/clientQuery";
import ClientRow from "./clientRow";

export default function Client() {
  const { loading, error, data } = useQuery(GET_CLIENT);
  if (loading) return <div>Loading....</div>;
  if (error) return <div>Something went wrong</div>;
  console.log(data);
  return (
    <div className="grid place-content-center mt-32">
      {!loading && !error && (
        <table className="border-separate border-spacing-2 border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-200">name</th>
              <th className="border border-slate-200">email</th>
              <th className="border border-slate-200">phone</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((data) => {
              console.log({ data });
              return (
                <tr>
                  <ClientRow client={data} />
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
