import Client from "../Models/Client.js";
import Project from "../Models/Project.js";
import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

// Create Client Object Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
});

// Create Project Object Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: {
    id: { type: GraphQLID },
    ClientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, arg) {
        return Client.findById(parent.ClientId);
      },
    },
  },
});

// Create RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, arg) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, arg) {
        return Project.findById(arg.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, arg) {
        return Project.find();
      },
    },
  },
});

// Create Mutation Object Type
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add Client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    // Delete Client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    // Add Project
    addProject: {
      type: ProjectType,
      args: {
        ClientId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "ToDo" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "ToDo",
        },
      },
      resolve(parent, args) {
        const project = new Project({
          ClientId: args.ClientId,
          name: args.name,
          description: args.description,
          status: args.status,
        });
        return project.save();
      },
    },
    // Delete Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    // Update Client Name
    updateClinetName: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id,
          { name: args.name },
          { new: true }
        );
      },
    },
  },
});

// Create Graphql Schema
const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default Schema;
