import { useMutation } from "@apollo/client";
import React from "react";
import { DELETE_CLIENT } from "../mutation/clientMutation";
import { GET_CLIENT } from "../Queries/clientQuery";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, { data: deleteClient }) {
      const { client } = cache.readQuery({ query: GET_CLIENT });
      console.log({ client });
      cache.writeQuery({
        query: GET_CLIENT,
        data: { client: client.filter((data) => data.id != deleteClient.id) },
      });
    },
  });
  return (
    <>
      <td className="border border-slate-200">{client.name}</td>
      <td className="border border-slate-200">{client.email}</td>
      <td className="border border-slate-200">{client.phone}</td>
      <td className="border border-slate-200">
        <button onClick={deleteClient}>delete</button>
      </td>
    </>
  );
}
