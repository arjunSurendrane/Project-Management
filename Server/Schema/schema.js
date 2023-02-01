import Client from "../Models/Client.js";
import Project from "../Models/Project.js";
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    },

});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: {
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, arg) {
                return Client.findById(parent.clientId)
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, arg) {
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Client.findById(args.id)
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, arg) {
                return Project.findById(arg.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, arg) {
                return Project.find()
            }
        }
    }
})

const Schema = new GraphQLSchema({
    query: RootQuery,

})

export default Schema