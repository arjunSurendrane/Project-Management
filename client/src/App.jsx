import Header from "./componenet/header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Client from "./componenet/client";
import "./index.css";
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div>
          <Client />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
