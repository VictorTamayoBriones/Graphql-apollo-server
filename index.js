import { gql, ApolloServer } from "apollo-server"

const persons = [
    {
        name: 'Midu',
        phone: '034-1234567',
        street: 'calle frontend',
        city: 'Barcelona',
        id: 'sjkasjdhkajshdkjahskda-a2837681273-9098'
    },
    {
        name: 'Miguel',
        phone: '989-1234567',
        street: 'calle Harso',
        city: 'Apizaco',
        id: 'ooioiujsbmnabmdabs-a2837681273-9098'
    },
    {
        name: 'Joe',
        street: 'calle banckend',
        city: 'Murcia',
        id: 'ahdkjsdhiuyiwuiqhsnpwa-a2837681273-9098'
    },
]

const typeDefs = gql`
    type Addres{
        city: String!
        street: String!
    }

    type Person{
        name: String!
        phone: String
        addres: Addres!
        id: ID!
    }

    type Query{
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person!
    }
`

const resolvers = {
    Query:{
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name);
        }
    },
    Person:{
        addres: (root) =>{
            return{
                city: root.city,
                street: root.street
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
});